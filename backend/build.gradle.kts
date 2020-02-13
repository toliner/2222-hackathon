plugins {
    kotlin("jvm") version "1.3.61"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    jcenter()
    maven(url = "https://jitpack.io")
}

dependencies {
    implementation(kotlin("stdlib-jdk8"))
    testImplementation(kotlin("test-junit"))

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.6.0")

    implementation(ktorServerCore())
    implementation(ktorJackson())

    implementation(jacksonDataFormatXml())

    implementation(jacksonEnumerated())
    implementation(jacksonTextual())
    implementation(jacksonNumerical())
    implementation(jacksonPolymorphic())
    jacksonImmutableAst()

    implementation(konform())
    implementation(exposed())
    implementation(hikariCp())
    guava()
}

tasks {
    compileKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }

    test {
        useJUnitPlatform()
    }
}