# Use an official OpenJDK runtime as the base image
FROM adoptopenjdk:18
# Set the working directory in the container
WORKDIR /app

# Copy the packaged Spring Boot JAR file to the working directory
COPY target/WeConnect.jar .

# Expose the container's port (adjust if needed)
EXPOSE 8080

# Define the command to run the application when the container starts
CMD ["java", "-jar", "WeConnect.jar"]
