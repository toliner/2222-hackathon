package app.reiwa.hackathon.model

import app.reiwa.hackathon.model.db.UserData
import kotlinx.serialization.Serializable

@Serializable
data class UserLoginResponse(
    val token: String,
    val user: UserData
)