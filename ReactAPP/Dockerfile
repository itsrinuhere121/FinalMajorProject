# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the container's port (adjust if needed)
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]