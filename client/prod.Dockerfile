# stage1 - build react app first
FROM node:12.16.3-buster as build

COPY ["package*.json", "/client/"]

WORKDIR /client

RUN npm install --silent

COPY ["./", "/client/"]

RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine

COPY --from=build /client/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]