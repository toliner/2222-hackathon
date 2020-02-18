package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.TeamCreateRequest
import app.reiwa.hackathon.model.db.*
import io.ktor.application.ApplicationCall
import io.ktor.request.receive
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.util.pipeline.PipelineContext
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.teamRoute() {
    route("/team") {
        post("/create") {
            createTeam()
        }
    }
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.createTeam() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<TeamCreateRequest>()
    val team = transaction {
        val teamRaw = Team.new {
            name = request.name
            bio = request.bio
        }
        TeamMember.new {
            user = User.findById(session.id)!!
            team = teamRaw
            role = MemberRole.LEADER
        }
        commit()
        teamRaw.asData()
    }
    context.respondJson {
        Json.stringify(TeamData.serializer(), team)
    }
}