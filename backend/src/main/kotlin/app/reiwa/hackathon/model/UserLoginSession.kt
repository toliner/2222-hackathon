@file:UseSerializers(UUIDSerializer::class)

package app.reiwa.hackathon.model

import app.reiwa.hackathon.UUIDSerializer
import kotlinx.serialization.UseSerializers
import java.time.LocalDateTime
import java.util.*

data class UserLoginSession(
    val id: UUID,
    val token: UUID,
    val expiredAt: LocalDateTime
)