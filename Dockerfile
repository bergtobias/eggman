# ---- Build Stage ----
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  # Copy only necessary files for installation
  COPY package*.json ./
  RUN npm install
  
  # Copy all source files and build the project
  COPY . .
  RUN npm run build
  
  # ---- Run Stage ----
  FROM node:20-alpine AS runner
  
  WORKDIR /app
  
  # Copy only necessary built files and dependencies from builder
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/package.json ./

  RUN npm run register

  CMD ["npm", "run", "start"]
  