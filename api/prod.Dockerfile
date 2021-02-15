FROM node:12.16.3-buster

COPY ["package*.json", "/api/"]

WORKDIR /api

RUN npm install

COPY [".", "/api/"]

EXPOSE 80

CMD ["npm", "start"]