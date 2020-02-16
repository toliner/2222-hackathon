package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.LoginUserRequest
import app.reiwa.hackathon.model.RegisterUserRequest
import app.reiwa.hackathon.model.UserLoginSession
import app.reiwa.hackathon.model.db.EmailVerificationType
import app.reiwa.hackathon.model.db.User
import app.reiwa.hackathon.model.db.UserEmailVerification
import app.reiwa.hackathon.model.db.Users
import app.reiwa.hackathon.sendMail
import com.sendgrid.helpers.mail.objects.Content
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import io.ktor.sessions.set
import io.ktor.util.pipeline.PipelineContext
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.*

fun Route.userRoute() {
    route("/user") {
        registerUser()
    }
}

private fun Route.registerUser() {
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
                appendln("もし心当たりがない場合はこのメールをそっ閉じしてゴミ箱に入れてください。不正利用の可能性があります。")
                appendln("http://2222.reiwa.app/api/user/verification?token=$token")
            }))
            context.respond(HttpStatusCode.OK)
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
        transaction {
            entity.user.verified = true
            entity.delete()
        }
        context.sessions.set(
            UserLoginSession(
                transaction { entity.user.id.value },
                UUID.fromString(token),
                LocalDateTime.now(ZoneOffset.UTC).plusDays(1)
            ))
        context.respond(HttpStatusCode.OK)
    }
}

suspend fun ApplicationCall.respondError(message: String) {
    respond(HttpStatusCode.BadRequest, """{"error":"$message"}""")
}

fun PipelineContext<Unit, ApplicationCall>.updateLoginSession() {
    val session = context.sessions.get<UserLoginSession>() ?: throw IllegalStateException("No session")
    context.sessions.set(session.copy(expiredAt = LocalDateTime.now(ZoneOffset.UTC).plusDays(1)))
}
