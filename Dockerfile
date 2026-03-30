FROM node:lts-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY patches/ patches/
RUN npm ci

ARG COMMIT_SHA
ARG COMMIT_DATE
ENV COMMIT_SHA=${COMMIT_SHA}
ENV COMMIT_DATE=${COMMIT_DATE}

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
