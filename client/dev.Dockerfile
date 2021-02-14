FROM node:12.16.3-buster

COPY ["package.json", "package-lock.json", "/client/"]

WORKDIR /client

RUN npm install

COPY [".", "/client/"]

EXPOSE 3000

CMD ["npm", "start"]