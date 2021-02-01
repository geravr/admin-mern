FROM node:12.16.3-buster

COPY ["package.json", "package-lock.json", "/api/"]

WORKDIR /api

RUN npm install

COPY [".", "/api/"]

EXPOSE 4000

CMD ["npm", "run", "dev"]