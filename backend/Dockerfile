FROM node:18-alpine as base

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/requirements.txt ./backend/

# Install Node.js dependencies
RUN npm ci --only=production

# Install Python for backend processing
RUN apk add --no-cache python3 py3-pip postgresql-client

# Install Python dependencies
RUN pip3 install -r backend/requirements.txt

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Create uploads directory
RUN mkdir -p backend/uploads backend/ml/models

# Expose port
EXPOSE 8080

# Start command
CMD ["npm", "start"]