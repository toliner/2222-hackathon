@file:UseSerializers(UUIDSerializer::class)
package app.reiwa.hackathon.model.db

import app.reiwa.hackathon.UUIDSerializer
import kotlinx.serialization.ContextualSerialization
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.`java-time`.datetime
import java.util.*

object Users : UUIDTable(columnName = "id") {
    val name = varchar("name", 20)
    val mail = varchar("mail", 100).uniqueIndex()
    val verified = bool("verified").default(false)
}

class User(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<User>(Users)

    var name by Users.name
    var mail by Users.mail
    var verified by Users.verified

    fun asData(): UserData = UserData(id.value, name, mail)
}

@Serializable
data class UserData(
    @ContextualSerialization
    val id: UUID,
    val name: String,
    val mail: String
)

object UserEmailVerifications : UUIDTable() {
    val user = reference("user", Users)
    val expiredAt = datetime("expired-at")
    val type = enumeration("type", EmailVerificationType::class)
}

class UserEmailVerification(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<UserEmailVerification>(UserEmailVerifications)

    var user by User referencedOn UserEmailVerifications.user
    var expiredAt by UserEmailVerifications.expiredAt
    var type by UserEmailVerifications.type
}

enum class EmailVerificationType {
    REGISTER,
    LOGIN
}