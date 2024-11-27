# Use official Node.js image
FROM node:20.15.1-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]