package app.reiwa.hackathon.model

import kotlinx.serialization.Serializable

@Serializable
data class TeamCreateRequest(
    val name: String,
    val bio: String
)
