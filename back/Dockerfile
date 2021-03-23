FROM openjdk:15
VOLUME tmp
ADD build/libs/lagalt-0.0.1-SNAPSHOT.jar lagalt.jar
ENTRYPOINT ["java", "-jar", "/lagalt.jar"]