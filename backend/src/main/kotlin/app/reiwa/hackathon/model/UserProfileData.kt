@file:UseSerializers(UUIDSerializer::class)

package app.reiwa.hackathon.model

import app.reiwa.hackathon.serializers.UUIDSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import java.util.*

@Serializable
data class UserProfileData(
    val id: UUID,
    val name: String,
    val bio: String
)