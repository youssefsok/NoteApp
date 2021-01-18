FROM node:12-alpine
LABEL Author Youssef Sokkah <sokkah.youssef97@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
RUN ls -l
RUN ls -l ./dist
EXPOSE 3000

CMD [ "npm", "start" ]
