FROM node:alpine AS base
ARG NODE_ENV
WORKDIR /app
FROM base AS dependencies
COPY package*.json ./
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g node-gyp
RUN npm install
FROM base AS release
WORKDIR /app
COPY --from=dependencies /app ./
COPY . .
CMD ["npm", "run", "start:prod"]
