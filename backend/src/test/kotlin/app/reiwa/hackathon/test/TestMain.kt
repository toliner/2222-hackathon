package app.reiwa.hackathon.test

import app.reiwa.hackathon.sendMail
import com.sendgrid.helpers.mail.objects.Content
import org.junit.Test

class TestMain {
    @Test
    fun helloWorld() {
        println("Hello, Test !")
    }

    @Test
    fun testMail() {
        sendMail("test@2222.reiwa.app", "test+2222@toliner.dev", "Test", Content("text/plain", "test mail"))
    }
}