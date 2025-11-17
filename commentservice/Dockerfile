FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

COPY ./common-library ./common-library
RUN mvn -f ./common-library/pom.xml clean install -DskipTests

COPY ./commentservice ./commentservice
RUN mvn -f ./commentservice/pom.xml clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/commentservice/target/*.jar commentservice.jar

EXPOSE 9007
ENTRYPOINT [ "java", "-jar", "commentservice.jar" ]