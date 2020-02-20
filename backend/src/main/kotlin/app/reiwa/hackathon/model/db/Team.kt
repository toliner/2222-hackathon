package app.reiwa.hackathon.model.db

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import java.util.*

object Teams : UUIDTable() {
    val name = varchar("name", 30).uniqueIndex()
    val bio = varchar("bio", 500).default("")
}

object TeamMembers : UUIDTable() {
    val team = reference("team", Teams)
    val user = reference("user", Users)
    val role = enumeration("role", MemberRole::class).default(MemberRole.MEMBER)
}

class Team(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<Team>(Teams)

    var name by Teams.name
    var bio by Teams.bio
    val members by TeamMember referrersOn TeamMembers.team

    fun asData(): TeamData = TeamData(
        name,
        bio,
        members.map { it.asData() }
    )
}

class TeamMember(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<TeamMember>(TeamMembers)

    var team by Team referencedOn TeamMembers.team
    var user by User referencedOn TeamMembers.user
    var role by TeamMembers.role

    fun asData(): TeamMemberData = TeamMemberData(
        user.asData(),
        role
    )
}

@Serializable
data class TeamData(
    val name: String,
    val bio: String,
    val members: List<TeamMemberData>
)

@Serializable
data class TeamMemberData(
    val user: UserData,
    val role: MemberRole
)

@Serializable
enum class MemberRole {
    MEMBER,
    SUB_LEADER,
    LEADER,
    MANAGER,
    COACH
}