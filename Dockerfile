
# Base image with Node.js LTS
FROM node:18

# Build-time secrets
ARG OPENAI_KEY
ARG REDDIT_SECRET
ARG REDDIT_CLIENT_ID
ARG TURSO_CONNECTION_URL
ARG TURSO_AUTH_TOKEN

# Make them available in the app environment
ENV OPENAI_KEY=${OPENAI_KEY}
ENV REDDIT_SECRET=${REDDIT_SECRET}
ENV REDDIT_CLIENT_ID=${REDDIT_CLIENT_ID}
ENV TURSO_CONNECTION_URL=${TURSO_CONNECTION_URL}
ENV TURSO_AUTH_TOKEN=${TURSO_AUTH_TOKEN}

# Set working directory in container
WORKDIR /app

# Copy only package files first (for caching layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the default Next.js port
EXPOSE 8080

# Run the app in production mode
CMD ["npm", "start"]
