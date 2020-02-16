@file:UseSerializers(UUIDSerializer::class, LocalDateTimeSerializer::class)

package app.reiwa.hackathon.model

import app.reiwa.hackathon.serializers.LocalDateTimeSerializer
import app.reiwa.hackathon.serializers.UUIDSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import java.time.LocalDateTime
import java.util.*

@Serializable
data class UserLoginSession(
    val id: UUID,
    val token: UUID,
    val expiredAt: LocalDateTime
)