# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Create .env file if it doesn't exist
RUN if [ ! -f .env ]; then \
    echo "PORT=3001" > .env && \
    echo "NODE_ENV=production" >> .env && \
    echo "DB_USER=postgres" >> .env && \
    echo "DB_HOST=postgres" >> .env && \
    echo "DB_NAME=skillchain" >> .env && \
    echo "DB_PASSWORD=postgres" >> .env && \
    echo "DB_PORT=5432" >> .env && \
    echo "CORS_ORIGIN=*" >> .env; \
    fi

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "src/server.js"]
