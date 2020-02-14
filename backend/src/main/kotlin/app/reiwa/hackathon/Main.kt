package app.reiwa.hackathon

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
import io.ktor.util.KtorExperimentalAPI
import org.slf4j.event.Level

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
