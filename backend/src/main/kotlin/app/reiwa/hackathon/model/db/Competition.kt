@file:UseSerializers(UUIDSerializer::class, LocalDateTimeSerializer::class)

package app.reiwa.hackathon.model.db

import app.reiwa.hackathon.serializers.LocalDateTimeSerializer
import app.reiwa.hackathon.serializers.UUIDSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.`java-time`.datetime
import java.time.LocalDateTime
import java.util.*

object Competitions : UUIDTable() {
    val owner = reference("owner", Users)
    val gameType = enumeration("gameType", GameType::class)
    val startDate = datetime("start")
    val title = varchar("title", 60)
    val description = varchar("description", 1000)
}

object CompetitionMembers : UUIDTable() {
    val competition = reference("competition", Competitions)
    val member = reference("member", Teams)
}

class Competition(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<Competition>(Competitions)

    var owner by User referencedOn Competitions.owner
    var gameType by Competitions.gameType
    var startDate by Competitions.startDate
    var title by Competitions.title
    var description by Competitions.description

    val members by CompetitionMember referrersOn CompetitionMembers.competition

    fun asData(): CompetitionData = CompetitionData(
        id.value,
        owner.id.value,
        gameType, startDate, title, description
    )
}

class CompetitionMember(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<CompetitionMember>(CompetitionMembers)

    var competition by Competition referencedOn CompetitionMembers.competition
    var member by Team referencedOn CompetitionMembers.member
}

@Serializable
data class CompetitionData(
    val id: UUID,
    val owner: UUID,
    @SerialName("game_type")
    val gameType: GameType,
    @SerialName("start_date")
    val startDate: LocalDateTime,
    val title: String,
    val description: String
)

@Serializable
enum class GameType {
    RAINBOW_SIX,
    FORNITE,
    PUYOPUYO_TETRIS,
    SPLATOON
}
