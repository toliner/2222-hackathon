package app.reiwa.hackathon.route

import app.reiwa.hackathon.model.TeamCreateRequest
import app.reiwa.hackathon.model.TeamInviteRequest
import app.reiwa.hackathon.model.TeamJoinRequest
import app.reiwa.hackathon.model.TeamLeaveRequest
import app.reiwa.hackathon.model.db.*
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route
import io.ktor.util.pipeline.PipelineContext
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

fun Route.teamRoute() {
    route("/team") {
        get("/") {
            getTeam()
        }
        post("/create") {
            createTeam()
        }
        post("/invite") {
            inviteMember()
        }
        post("/leave") {
            leaveTeam()
        }
        post("/join") {
            joinTeam()
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

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.inviteMember() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<TeamInviteRequest>()
    val (team, user) = transaction {
        val team = Team.findById(request.team)
        val user = User.findById(request.user)
        // team, user共にnullableなのでtoは死ぬ
        Pair(team, user)
    }
    if (team == null) {
        context.respondError("Invalid team id")
        return
    }
    if (user == null) {
        context.respondError("Invalid user id")
        return
    }
    val requesterRole = transaction {
        val requester = TeamMember.find {
            (TeamMembers.user eq User.findById(session.id)!!.id) and (TeamMembers.team eq team.id)
        }
        requester.singleOrNull()?.role
    }
    if (requesterRole != MemberRole.LEADER) {
        context.respondError("Inviter must be team leader")
    }
    // TODO: 重複招待の検知
    transaction {
        TeamMember.new {
            this.team = team
            this.user = user
        }
    }
    context.respond(HttpStatusCode.OK)
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.leaveTeam() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<TeamLeaveRequest>()
    transaction {
        val user = User.findById(session.id)!!
        TeamMember.find {
            (TeamMembers.user eq user.id) and (TeamMembers.team eq request.team)
        }.forEach {
            it.delete()
        }
    }
    context.respond(HttpStatusCode.OK)
}

@UseExperimental(UnstableDefault::class)
private suspend fun PipelineContext<Unit, ApplicationCall>.joinTeam() {
    val session = getAndUpdateLoginSession() ?: return
    val request = context.receive<TeamJoinRequest>()
    val team = transaction {
        Team.findById(request.team)
    }
    if (team == null) {
        context.respondError("Invalid team id")
        return
    }
    transaction {
        val user = User.findById(session.id)!!
        TeamMember.new {
            this.team = team
            this.user = user
            this.role = MemberRole.MEMBER
        }
    }
    context.respond(HttpStatusCode.OK)
}
