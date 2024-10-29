# STAGE #1: Produce a build
FROM node:22-alpine3.20 AS build

WORKDIR /client

# Copy files
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY ./src ./src
COPY ./public ./public

# Install packages
RUN npm -g install pnpm
RUN pnpm install --prod

# Set env before the buid
# It will not be possible to change them after the build is done
ENV REACT_APP_API_URL=http://localhost:5000

# Build
RUN pnpm run build

# STAGE #2: Set up server
FROM nginx:1.26.2-alpine3.20 AS prod

COPY --from=build ./client/build ./usr/share/nginx/html

EXPOSE 80

# Serve build
CMD ["nginx", "-g", "daemon off;"]