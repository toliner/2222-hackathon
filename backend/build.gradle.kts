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
}