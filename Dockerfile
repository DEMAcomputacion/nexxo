FROM node:22.14-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm ci --include=dev

COPY . .

RUN npm run build --workspace=client
RUN npm run db:generate --workspace=server

EXPOSE 3001

CMD ["npm", "run", "start", "--workspace=server"]
