#use a node js 
FROM node:23 AS build-stage

#set working directory
WORKDIR /app/frontend

#copy package.json and package-lock.json
COPY frontend/package*.json ./
#install dependencies
RUN npm install

#copy source code
COPY frontend/ .
#build the application
RUN npm run build

#Wokdir for backend
WORKDIR /app/backend
#copy package.json and package-lock.json
COPY backend/package*.json ./
#install dependencies
RUN npm install
#copy source code
COPY backend/ .
#stage 2: set up the nginx server for the frontend and node server for backend
FROM nginx:alpine AS production-stage
COPY nginx.conf /etc/nginx/config.d/default.conf

#copy build frontend files to nginx html directory
COPY --from=build-stage /app/frontend/build /usr/share/nginx/html

#copy backend files to the app directory
COPY --from=build-stage /app/backend /app/backend   
RUN apk add --no-cache nodejs npm

#expose necessary ports
EXPOSE 80 5000

#start both nginx and node server
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]
