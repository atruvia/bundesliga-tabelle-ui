# Build stage
FROM node:22 AS build
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
FROM nginx:1.28.0-alpine3.21 AS run
COPY --from=build /app/dist/bundesliga-tabelle-ui/browser/ /usr/share/nginx/html/
COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]

