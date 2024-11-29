# Use the official Node.js image as the base
FROM node:18 AS base

# Set the working directory
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install pnpm via the official installation script
RUN npm install -g pnpm@9.14.2 \
  && pnpm install

# Specify the command to run your application
CMD ["pnpm", "run", "start"]
