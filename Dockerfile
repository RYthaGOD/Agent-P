# --- SOVEREIGN PREDICTION AGENT DOCKERFILE ---

FROM node:20-slim

# Install system dependencies for better-sqlite3 and git
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (ignoring scripts initially to avoid build loops)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set environment variables from .env during runtime
ENV NODE_ENV=production

# The agent entry point
ENTRYPOINT ["pnpm", "run", "dev", "--"]
CMD ["--run"]
