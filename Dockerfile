# Pull in the official lightweight version of Node 12.
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Install production dependencies.
RUN npm install

# Copy local codebase into the container image
COPY . .

# Start the api server
CMD [ "node", "server.js" ]