package app.reiwa.hackathon.model

import kotlinx.serialization.Serializable

@Serializable
data class RegisterUserRequest(
    val name: String,
    val mail: String
)

@Serializable
data class LoginUserRequest(
    val mail: String
)

@Serializable
data class UpdateUserProfileRequest(
    val bio: String
)
