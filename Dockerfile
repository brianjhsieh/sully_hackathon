# Use the official Node.js 20 image as the base
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Install Playwright browsers (already present in base image, but ensure up-to-date)
RUN npx playwright install --with-deps

# Set environment variables for Playwright
ENV CI=true

# Default command: run all Playwright tests
CMD ["npx", "playwright", "test"]
