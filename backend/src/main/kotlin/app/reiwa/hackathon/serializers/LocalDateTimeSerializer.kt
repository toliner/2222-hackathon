package app.reiwa.hackathon.serializers

import kotlinx.serialization.*
import kotlinx.serialization.internal.StringDescriptor
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Serializer(forClass = LocalDateTime::class)
object LocalDateTimeSerializer : KSerializer<LocalDateTime> {
    override val descriptor: SerialDescriptor = StringDescriptor.withName("LocalDateTimeSerializer")

    override fun deserialize(decoder: Decoder): LocalDateTime {
        return LocalDateTime.from(DateTimeFormatter.ISO_LOCAL_DATE_TIME.parse(decoder.decodeString()))
    }

    override fun serialize(encoder: Encoder, obj: LocalDateTime) {
        encoder.encodeString(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(obj))
    }
}