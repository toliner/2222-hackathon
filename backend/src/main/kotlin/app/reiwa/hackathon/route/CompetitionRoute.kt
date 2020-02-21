package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.CompetitionCreateRequest
import app.reiwa.hackathon.model.db.Competition
import app.reiwa.hackathon.model.db.CompetitionData
import app.reiwa.hackathon.model.db.User
import io.ktor.application.ApplicationCall
import io.ktor.request.receive
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.util.pipeline.PipelineContext
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.competitionRoute() {
    route("/competition") {
        post("/create") {
            createCompetition()
        }
    }
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.createCompetition() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<CompetitionCreateRequest>()
    if (request.title.length !in 0..60) {
        context.respondError("Title length must be in range 0..60")
        return
    }
    if (request.description.length !in 0..1000) {
        context.respondError("Description length must be in range 0..1000")
        return
    }
    // テストのため無効化
    /*
    if (request.startDate < ZonedDateTime.now().plusHours(8)) {
        context.respondError("StartDate must be 8 hours later from now.")
        return
    }
     */
    val competition = transaction {
        Competition.new {
            this.owner = User.findById(session.id)!!
            this.title = request.title
            this.gameType = request.gameType
            this.description = request.description
            this.startDate = request.startDate.toLocalDateTime()
        }.asData()
    }
    context.respondJson {
        Json.stringify(CompetitionData.serializer(), competition)
    }
}