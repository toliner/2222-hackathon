package app.reiwa.hackathon

import app.reiwa.hackathon.model.SettingFile
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.serialization.serialization
import io.ktor.server.engine.ShutDownUrl
import io.ktor.util.KtorExperimentalAPI
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.slf4j.event.Level

@UseExperimental(UnstableDefault::class)
val globalSetting: SettingFile = Json.parse(SettingFile.serializer(), ClassLoader.getSystemResource("settings.json").readText())

@UseExperimental(KtorExperimentalAPI::class)
fun Application.mainModule() {
    install(DefaultHeaders)
    install(CallLogging) {
        level = Level.INFO
    }
    install(ContentNegotiation) {
        serialization()
    }
    install(StatusPages) {
        status(HttpStatusCode.NotFound) {
            call.respondText("404", status = HttpStatusCode.NotFound)
        }
    }
    if (globalSetting.shutdownUrl != null) {
        install(ShutDownUrl.ApplicationCallFeature) {
            shutDownUrl = globalSetting.shutdownUrl
        }
    }
    install(Routing) {
        get("/") {
            call.respondText("Hello, World!")
        }
        get("/aa") {
            call.respondText("aa")
        }
        get("/snippets") {
            call.respond(mapOf("OK" to true))
        }
    }
}
