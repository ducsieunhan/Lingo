FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

COPY ./common-library ./common-library
RUN mvn -f ./common-library/pom.xml clean install -DskipTests

COPY ./chatbot ./chatbot
RUN mvn -f ./chatbot/pom.xml clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/chatbot/target/*.jar chatbot.jar

EXPOSE 9006
ENTRYPOINT [ "java", "-jar", "chatbot.jar" ]