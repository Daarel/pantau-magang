# Gunakan base image Node.js
FROM node:18-alpine AS builder

# Tentukan working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file project
COPY . .

# Build aplikasi Next.js
RUN npm run build

# ------------------------
# Tahap production
# ------------------------
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV ke production
ENV NODE_ENV=production

# Copy hasil build dari tahap builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (default Next.js di 3000)
EXPOSE 3000

# Jalankan Next.js
CMD ["npm", "start"]

# Setelah COPY . .
COPY .env.local .env.local

