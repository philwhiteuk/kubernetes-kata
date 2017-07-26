FROM node:6.0

CMD node /usr/src/app/index.js
WORKDIR /

RUN mkdir -p /usr/src/app 
COPY ./instructions.txt /instructions.txt
ADD . /usr/src/app
