@file:UseExperimental(UnstableDefault::class)

package app.reiwa.hackathon.route

import app.reiwa.hackathon.Utf8Json
import app.reiwa.hackathon.model.*
import app.reiwa.hackathon.model.db.*
import app.reiwa.hackathon.sendMail
import com.sendgrid.helpers.mail.objects.Content
import io.ktor.application.ApplicationCall
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import io.ktor.sessions.set
import io.ktor.util.pipeline.PipelineContext
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.*

fun Route.userRoute() {
    route("/user") {
        registerAndLogin()
        userProfile()
    }
}

private fun Route.registerAndLogin() {
    post("/register") {
        val req = context.receive<RegisterUserRequest>()
        // TODO: email validation
        val token: UUID? = transaction {
            if (!User.find { Users.mail eq req.mail }.empty()) {
                return@transaction null
            }

            val user = User.new {
                name = req.name
                mail = req.mail
            }
            val verification = UserEmailVerification.new {
                this.user = user
                type = EmailVerificationType.REGISTER
                expiredAt = LocalDateTime.now(ZoneOffset.UTC).plusHours(1L)
            }
            UserProfile.new {
                this.user = user
            }
            verification.id.value
        }
        if (token == null) {
            context.respond(HttpStatusCode.BadRequest, """{"error":"the mail address has already used."}""")
        } else {
            sendMail("info@2222.reiwa.app", req.mail, "[2222] メールアドレスの確認", Content("text/plain", buildString {
                appendln("${req.name}様")
                appendln("受信したメールアドレスでアカウント登録することを承認する場合、以下のリンクにアクセスしてください。")
                appendln("もし心当たりがない場合はこのメールをそっ閉じしてゴミ箱に入れてください。不正利用の可能性があります。")
                appendln("http://2222.reiwa.app/api/user/verification?token=$token")
            }))
            context.respond(HttpStatusCode.OK)
        }
    }

    post("/login") {
        val req = context.receive<LoginUserRequest>()
        val user = transaction { User.find { Users.mail eq req.mail }.singleOrNull() }
        if (user != null) {
            val token = transaction {
                UserEmailVerification.new {
                    this.user = user
                    type = EmailVerificationType.LOGIN
                    expiredAt = LocalDateTime.now(ZoneOffset.UTC).plusHours(1L)
                }.id.value
            }
            sendMail("info@2222.reiwa.app", req.mail, "[2222] ユーザーログイン", Content("text/plain", buildString {
                appendln("${user.name}様")
                appendln("アカウントへのログイン要求が行われました。ログインを行う場合は以下のリンクにアクセスしてください。")
                appendln("もし心当たりがない場合はこのメールをそっ閉じしてゴミ箱に入れてください。不正ログインの可能性があります。")
                appendln("リンクを踏まなければログインが行われることはありません")
                appendln("http://2222.reiwa.app/api/user/verification?token=$token")
            }))
            context.respond(HttpStatusCode.OK)
        } else {
            context.respondError("Invalid mail address")
        }
    }

    get("/verification") {
        val token = context.parameters["token"]
        if (token == null) {
            context.respondError("token is required")
            return@get
        }
        val entity = transaction { UserEmailVerification.findById(UUID.fromString(token)) }
        if (entity == null || entity.expiredAt < LocalDateTime.now(ZoneOffset.UTC)) {
            context.respondError("wrong or expired token")
            return@get
        }
        val user = transaction {
            entity.user.verified = true
            entity.delete()
            entity.user.asData()
        }
        context.sessions.set(
            UserLoginSession(
                transaction { user.id },
                UUID.fromString(token),
                LocalDateTime.now(ZoneOffset.UTC).plusDays(1)
            ))
        context.respondText(
            ContentType.Application.Utf8Json,
            HttpStatusCode.OK
        ) {
            """ { "id": "${user.id}" }"""
        }
    }
}

@UseExperimental(UnstableDefault::class)
private fun Route.userProfile() {
    route("/profile") {
        get {
            val session = getAndUpdateLoginSession() ?: return@get
            val profile = transaction { UserProfile.find { UserProfiles.user eq session.id }.single().asData() }
            context.respondJson {
                Json.stringify(UserProfileData.serializer(), profile)
            }
        }
        post {
            val req = context.receive<UpdateUserProfileRequest>()
            val session = getAndUpdateLoginSession() ?: return@post
            if (req.bio.length !in 0..300) {
                context.respondError("bio length should in range 0..300")
            }
            val newProfile = transaction {
                val profile = User.findById(session.id)!!.profile.single()
                // update profile
                profile.apply {
                    bio = req.bio
                }
                commit()
                profile.asData()
            }
            context.respondJson {
                Json.stringify(UserProfileData.serializer(), newProfile)
            }
        }
        get("/{useId}") {
            val userId = UUID.fromString(context.parameters["userId"])
            val profile = transaction {
                User.findById(userId)?.profile?.singleOrNull()?.asData()
            }
            if (profile == null) {
                context.respond(HttpStatusCode.NotFound)
                return@get
            }
            context.respondJson {
                Json.stringify(UserProfileData.serializer(), profile)
            }
        }
    }
}


suspend fun ApplicationCall.respondError(message: String) {
    respondJson(HttpStatusCode.BadRequest) {
        """{"error":"$message"}"""
    }
}

/**
 * @return Headerから得られたSession情報。存在しなければnull。
 */
suspend fun PipelineContext<Unit, ApplicationCall>.getAndUpdateLoginSession(): UserLoginSession? {
    val session = context.sessions.get<UserLoginSession>() ?: throw IllegalStateException("No session")
    val now = LocalDateTime.now(ZoneOffset.UTC)
    if (session.expiredAt < now) {
        context.respondError("header ${context.sessions.findName(UserLoginSession::class)} is not set or valid")
        return null
    }
    val newSession = session.copy(expiredAt = now.plusDays(1))
    context.sessions.set(newSession)
    return newSession
}

suspend fun ApplicationCall.respondJson(statusCode: HttpStatusCode = HttpStatusCode.OK, text: suspend () -> String) {
    respondText(ContentType.Application.Utf8Json, statusCode, text)
}
