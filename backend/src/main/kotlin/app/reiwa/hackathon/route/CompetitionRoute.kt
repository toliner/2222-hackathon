package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.CompetitionCreateRequest
import app.reiwa.hackathon.model.CompetitionJoinRequest
import app.reiwa.hackathon.model.db.*
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
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
        post("/join") {
            joinCompetition()
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

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.joinCompetition() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<CompetitionJoinRequest>()
    val team = transaction {
        Team.findById(request.team)?.asData()
    }
    if (team == null) {
        context.respondError("Invalid team id")
        return
    }
    if (team.members.singleOrNull { it.user.id == session.id }?.role == MemberRole.LEADER) {
        context.respondError("Requester must be a leader of the team")
        return
    }
    val competition = transaction {
        Competition.findById(request.competition)
    }
    if (competition == null) {
        context.respondError("Invalid competition id")
        return
    }
    transaction {
        CompetitionMember.new {
            this.competition = competition
            this.member = Team.findById(request.team)!!
        }
    }
    context.respond(HttpStatusCode.OK)
}
