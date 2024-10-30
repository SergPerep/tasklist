# STAGE #1: Generate the React build
FROM node:20.18-alpine3.19 AS build

WORKDIR /server

# Copy src folder to container workdir
COPY ./src ./src

# Copy configs to container workdir
COPY package.json pnpm-lock.yaml ./tsconfig.json ./

# Install dependencies and compile js from ts
RUN npm -g install pnpm
RUN pnpm install

RUN pnpm run build

# STAGE #2: Serve the React build
FROM node:20.18-alpine3.19 AS prod

WORKDIR /server
COPY --from=build ./server/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN npm -g install pnpm
RUN pnpm install --prod

EXPOSE 5000

CMD ["pnpm", "run", "start"]