FROM node:12-alpine
LABEL Author Youssef Sokkah <sokkah.youssef97@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
