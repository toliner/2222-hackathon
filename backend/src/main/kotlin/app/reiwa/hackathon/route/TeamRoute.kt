package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.TeamCreateRequest
import app.reiwa.hackathon.model.db.*
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.util.pipeline.PipelineContext
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

fun Route.teamRoute() {
    route("/team") {
        post("/create") {
            createTeam()
        }
        get("/") {
            getTeam()
        }
    }
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.createTeam() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<TeamCreateRequest>()
    val team = transaction {
        if (Team.find { Teams.name eq request.name }.singleOrNull() != null) {
            null
        } else {
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
    }
    if (team == null) {
        context.respondError("The team name is already used")
    } else {
        context.respondJson {
            Json.stringify(TeamData.serializer(), team)
        }
    }
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.getTeam() {
    val team = transaction {
        when {
            "id" in context.parameters -> Team.findById(UUID.fromString(context.parameters["id"]))
            "name" in context.parameters -> Team.find { Teams.name eq context.parameters["name"]!! }.singleOrNull()
            else -> null
        }?.asData()
    }
    if (team == null) {
        context.respondError("No such team", HttpStatusCode.NotFound)
    } else {
        context.respondJson { Json.stringify(TeamData.serializer(), team) }
    }
}
