# Simple Dockerfile for a Next.js (or React) TypeScript app
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .

# Build the app (uncomment if you have a build step)
# RUN npm run build

# Expose port 3000 (Next.js default)
EXPOSE 3000

CMD ["npx", "next", "dev"]