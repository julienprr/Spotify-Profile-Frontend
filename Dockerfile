# Étape de build
FROM node:20-alpine AS builder
WORKDIR /app

ARG BUILD_MODE=production
ENV BUILD_MODE=${BUILD_MODE}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --mode=${BUILD_MODE}

# Étape finale avec Nginx
FROM nginx:1.25-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
