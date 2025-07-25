FROM node:22.17

WORKDIR /app

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy all source files (including tsconfig.json and src/)
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript code
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]