import org.gradle.api.artifacts.Dependency
import org.gradle.api.artifacts.ExternalModuleDependency
import org.gradle.kotlin.dsl.DependencyHandlerScope
import org.gradle.kotlin.dsl.closureOf
import org.gradle.kotlin.dsl.exclude

// Ktor
fun ktorServerCore() = "io.ktor:ktor-server-core:$ktor_version"

fun ktorJackson() = "io.ktor:ktor-jackson:$ktor_version"
fun ktorClientCore() = "io.ktor:ktor-client-core-jvm:$ktor_version"
fun ktorClientJsonSupport() = "io.ktor:ktor-client-json-jvm:$ktor_version"


// Jackson
fun jacksonDataBinding() = "com.fasterxml.jackson.core:jackson-databind:$jackson_version"

fun jacksonKotlinModule() = "com.fasterxml.jackson.module:jackson-module-kotlin:$jackson_version"
fun jacksonDataFormatXml() = "com.fasterxml.jackson.dataformat:jackson-dataformat-xml:$jackson_version"

fun jacksonEnumerated() = "io.github.justincase-jp.jackson-kotlin-commons:enumerated:$jackson_kotlin_commons_version"
fun jacksonTextual() = "io.github.justincase-jp.jackson-kotlin-commons:textual:$jackson_kotlin_commons_version"
fun jacksonNumerical() = "io.github.justincase-jp.jackson-kotlin-commons:numerical:$jackson_kotlin_commons_version"
fun jacksonPolymorphic() = "io.github.justincase-jp.jackson-kotlin-commons:polymorphic:$jackson_kotlin_commons_version"

fun jacksonTextualInterface() =
        "io.github.justincase-jp.jackson-kotlin-commons:textual-interface:$jackson_kotlin_commons_version"

fun jacksonNumericalInterface() =
        "io.github.justincase-jp.jackson-kotlin-commons:numerical-interface:$jackson_kotlin_commons_version"

fun jacksonPolymorphicInterface() =
        "io.github.justincase-jp.jackson-kotlin-commons:polymorphic-interface:$jackson_kotlin_commons_version"

fun DependencyHandlerScope.jacksonImmutableAst(): Dependency =
        "io.github.portfoligno:jackson-immutable-ast:1.1.2".let { notation ->
            dependencies.create(notation, closureOf<ExternalModuleDependency> {
                isTransitive = false

                "runtimeOnly"(notation)
                guava()
                exclude("com.google.guava", "guava")
            })
        }


// Konform
fun konform() = "io.github.justincase-jp.konform:konform:f58265b"

// Database
fun exposed() = "org.jetbrains.exposed:exposed:0.14.1"

fun hikariCp() = "com.zaxxer:HikariCP:3.3.0"

// Guava
fun DependencyHandlerScope.guava(): Dependency =
        dependencies.create("com.google.guava:guava:28.0-jre", closureOf<ExternalModuleDependency> {
            exclude("com.google.code.findbugs", "jsr305")
            exclude("org.checkerframework", "checker-qual")
            exclude("com.google.errorprone", "error_prone_annotations")
            exclude("com.google.j2objc", "j2objc-annotations")
            exclude("org.codehaus.mojo", "animal-sniffer-annotations")
        })
