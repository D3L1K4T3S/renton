# Use BellSoft Liberica JDK as a base image
FROM bellsoft/liberica-runtime-container:jdk-all-17.0.7-glibc as jdk

# Use Gradle image for building the application
FROM gradle:8.5.0 as builder

# Set environment variables
ENV JAVA_HOME /build/jdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Set the working directory
WORKDIR /build

# Copy JDK from the base image and project files into the builder
COPY --from=jdk /usr/lib/jvm/liberica17-lite $JAVA_HOME
COPY build.gradle settings.gradle ./
COPY src src

# Build the application and extract the layers
RUN --mount=type=cache,target=/root/.gradle/caches \
    gradle clean bootJar && \
    java -Djarmode=layertools \
    -jar build/libs/backend-1.0-SNAPSHOT.jar \
    extract --destination ./extracted

# Use BellSoft Liberica OpenJRE for the runtime image
FROM bellsoft/liberica-openjre-alpine:17.0.7

# Set maintainer label
LABEL maintainer="ren"

ARG ACTIVE_PROFILE

# Set build path environment variable
ENV BUILD_PATH=build/

# Create a group and myUser
RUN addgroup -g 10001 cbias \
  && adduser -D -u 10001 -G cbias admin
USER cbias:admin

# Set the working directory
WORKDIR /opt/workspace-runtime

# Copy the extracted layers from the builder
COPY --from=builder $BUILD_PATH/extracted/spring-boot-loader/ ./
COPY --from=builder $BUILD_PATH/extracted/dependencies/ ./
COPY --from=builder $BUILD_PATH/extracted/snapshot-dependencies/ ./
COPY --from=builder $BUILD_PATH/extracted/application/ ./

# Set the entrypoint
ENTRYPOINT java -Dspring.profiles.active=dev org.springframework.boot.loader.launch.JarLauncher