FROM node:12.16.3-buster

COPY ["package*.json", "/api/"]

WORKDIR /api

RUN npm install

COPY [".", "/api/"]

CMD ["npm", "start"]