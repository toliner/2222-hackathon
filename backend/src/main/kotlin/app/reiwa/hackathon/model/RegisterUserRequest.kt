package app.reiwa.hackathon.model

import kotlinx.serialization.Serializable

@Serializable
data class RegisterUserRequest(
        val name: String,
        val mail: String
)