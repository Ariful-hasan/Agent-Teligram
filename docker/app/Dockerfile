# Use a stable, lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Expose the application port
EXPOSE 4444

# Run the server
CMD ["node", "src/server.js"]
