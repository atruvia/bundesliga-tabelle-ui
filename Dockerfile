# Build stage
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# # Test stage
# FROM build AS test
# COPY --from=build /app .
# RUN apt-get update && apt-get install -y chromium
# ENV CHROME_BIN=/usr/bin/chromium
# COPY docker/cypress.json ./
# RUN groupadd -r cypress && useradd -r -g cypress cypress && chown -R cypress:cypress /app
# USER cypress
# RUN npm run test

# Run stage
FROM nginx:1.21.3-alpine AS run
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

