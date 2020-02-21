@file:UseSerializers(UUIDSerializer::class, LocalDateTimeSerializer::class, ZonedDateTimeSerializer::class)

package app.reiwa.hackathon.model

import app.reiwa.hackathon.model.db.GameType
import app.reiwa.hackathon.serializers.LocalDateTimeSerializer
import app.reiwa.hackathon.serializers.UUIDSerializer
import app.reiwa.hackathon.serializers.ZonedDateTimeSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import java.time.ZonedDateTime

@Serializable
data class CompetitionCreateRequest(
    @SerialName("game_type")
    val gameType: GameType,
    @SerialName("start_date")
    val startDate: ZonedDateTime,
    val title: String,
    val description: String
)