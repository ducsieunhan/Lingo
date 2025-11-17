FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

COPY ./common-library ./common-library
RUN mvn -f ./common-library/pom.xml clean install -DskipTests


COPY ./notificationservice ./notificationservice
RUN mvn -f ./notificationservice/pom.xml clean package -DskipTests


FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/notficationservice/target/*.jar notificationservice.jar

EXPOSE 9005
ENTRYPOINT ["java", "-jar", "notificationservice.jar"]