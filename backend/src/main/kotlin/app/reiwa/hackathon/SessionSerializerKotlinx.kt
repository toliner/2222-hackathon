package app.reiwa.hackathon

import io.ktor.sessions.SessionSerializer
import kotlinx.serialization.ImplicitReflectionSerializer
import kotlinx.serialization.UnstableDefault
import kotlinx.serialization.json.Json
import kotlinx.serialization.serializer
import kotlin.reflect.KClass


@UseExperimental(ImplicitReflectionSerializer::class, UnstableDefault::class)
class SessionSerializerKotlinx<T : Any>(type: KClass<T>) : SessionSerializer<T> {
    private val serializer = type.serializer()

    override fun deserialize(text: String): T {
        return Json.parse(serializer, text)
    }

    override fun serialize(session: T): String {
        return Json.stringify(serializer, session)
    }
}

