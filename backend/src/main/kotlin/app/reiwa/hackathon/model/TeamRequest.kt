@file:UseSerializers(UUIDSerializer::class)
package app.reiwa.hackathon.model

import app.reiwa.hackathon.serializers.UUIDSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import java.util.*

@Serializable
data class TeamCreateRequest(
    val name: String,
    val bio: String
)

@Serializable
data class TeamInviteRequest(
    val team: UUID,
    val user: UUID
)

@Serializable
data class TeamLeaveRequest(
    val team: UUID
)
