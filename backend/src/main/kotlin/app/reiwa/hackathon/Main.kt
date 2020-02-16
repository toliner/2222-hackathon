package app.reiwa.hackathon

import app.reiwa.hackathon.model.SettingFile
import app.reiwa.hackathon.model.UserLoginSession
import app.reiwa.hackathon.model.db.UserEmailVerifications
import app.reiwa.hackathon.model.db.Users
import app.reiwa.hackathon.route.userRoute
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.*
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.route
import io.ktor.serialization.serialization
import io.ktor.server.engine.ShutDownUrl
import io.ktor.sessions.Sessions
import io.ktor.sessions.directorySessionStorage
import io.ktor.sessions.header
import io.ktor.sessions.sessions
import io.ktor.util.KtorExperimentalAPI
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.event.Level
import java.io.File
import java.util.*

@UseExperimental(UnstableDefault::class)
lateinit var globalSetting: SettingFile
    private set

val ContentType.Application.Utf8Json: ContentType
    get() = Json.withParameter("charset", "urf-8")

@UseExperimental(KtorExperimentalAPI::class, UnstableDefault::class)
fun Application.mainModule() {

    val configPath = environment.config.property("app.reiwa.configfile").getString()
    globalSetting = Json.parse(SettingFile.serializer(), File(configPath).readText())

    setupDb()

    install(DefaultHeaders)
    install(CallLogging) {
        level = Level.INFO
    }
    install(ContentNegotiation) {
        serialization()
    }
    install(CORS) {
        method(HttpMethod.Options)
        host("2222.reiwa.app", schemes = listOf("http", "https"))
        allowCredentials = true
        allowNonSimpleContentTypes = true
        exposeHeader("*")
    }
    install(StatusPages) {
        status(HttpStatusCode.NotFound) {
            call.respondText("404", status = HttpStatusCode.NotFound)
        }
        exception<ContentTransformationException> {
            call.respondText(ContentType.Application.Utf8Json, status = HttpStatusCode.BadRequest) { """{"error":"wrong request body"}""" }
        }
    }
    install(Sessions) {
        header<UserLoginSession>("X-2222AccessToken", directorySessionStorage(File(".sessions"))) {
            identity { Base64.getUrlEncoder().encodeToString(UUID.randomUUID().toString().toByteArray()) }
            serializer = SessionSerializerKotlinx(UserLoginSession::class)
        }
    }
    if (globalSetting.shutdownUrl != null) {
        install(ShutDownUrl.ApplicationCallFeature) {
            shutDownUrl = globalSetting.shutdownUrl!!
            exitCodeSupplier = {
                transaction {
                    SchemaUtils.drop(Users, UserEmailVerifications)
                }
                sessions.clear("X-2222AccessToken")
                0
            }
        }
    }
    install(Routing) {
        route("/api") {
            userRoute()
        }
    }
}

private fun setupDb() {
    Database.connect(hikari())
    transaction {
        SchemaUtils.create(Users, UserEmailVerifications)
    }
}

private fun hikari(): HikariDataSource {
    val config = HikariConfig().apply {
        driverClassName = org.mariadb.jdbc.Driver::class.java.canonicalName
        jdbcUrl = globalSetting.dbUrl
        maximumPoolSize = 3
        transactionIsolation = "TRANSACTION_REPEATABLE_READ"
        username = globalSetting.dbUser
        password = globalSetting.dbPassword
        validate()
    }
    return HikariDataSource(config)
}
