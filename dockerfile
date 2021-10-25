FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE ${APP_PORT}

CMD ["yarn","dev"]
