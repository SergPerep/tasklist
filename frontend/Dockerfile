# ==================================
# STAGE #1: Generate the React build
# ==================================

FROM node:22-alpine3.20 AS build

WORKDIR /client

COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm -g install pnpm
RUN pnpm install --prod

# Set ENV before the React build is generated. 
# Environment variables become embedded 
# as constants during the React build process, 
# making it troublesome to change them later.
ENV REACT_APP_API_URL=http://localhost:5000

RUN pnpm run build

# ==================================
# STAGE #2: Serve the React build
# ==================================

FROM nginx:1.26.2-alpine3.20 AS prod

COPY --from=build ./client/build ./usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]