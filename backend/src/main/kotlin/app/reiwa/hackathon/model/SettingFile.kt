package app.reiwa.hackathon.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SettingFile(
        @SerialName("sendgrid-api-key")
        val sendGridApiKey: String,
        @SerialName("shutdown-url")
        val shutdownUrl: String? = null
)