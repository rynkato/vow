# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
#RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
#RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]