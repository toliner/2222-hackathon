package app.reiwa.hackathon

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.Response
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Content
import com.sendgrid.helpers.mail.objects.Email
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("SendGrid Client")

fun sendMail(from: String, to: String, subject: String, content: Content) {
    val mail = Mail(Email(from), subject, Email(to), content)

    val sg = SendGrid(globalSetting.sendGridApiKey)
    val request = Request()
    request.method = Method.POST
    request.endpoint = "mail/send"
    request.body = mail.build()
    val response: Response = sg.api(request)

    logger.debug("${response.statusCode}")
    logger.debug(response.body)
    logger.debug(response.headers.toList().joinToString { "${it.first}=${it.second}" })
}