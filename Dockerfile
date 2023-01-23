FROM node:14
COPY . /kwiaciarniaclient
WORKDIR /kwiaciarniaclient

RUN npm install --silent && npm i --silent @angular/cli

EXPOSE 4200

CMD npm run-script ng serve
