package app.reiwa.hackathon.serializers

import kotlinx.serialization.*
import kotlinx.serialization.internal.StringDescriptor
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

@Serializer(forClass = ZonedDateTime::class)
object ZonedDateTimeSerializer : KSerializer<ZonedDateTime> {
    override val descriptor: SerialDescriptor = StringDescriptor.withName("ZonedDateTimeSerializer")

    override fun deserialize(decoder: Decoder): ZonedDateTime {
        return ZonedDateTime.parse(decoder.decodeString(), DateTimeFormatter.ISO_DATE_TIME)
    }

    override fun serialize(encoder: Encoder, obj: ZonedDateTime) {
        encoder.encodeString(obj.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME))
    }
}