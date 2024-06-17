FROM node:latest

WORKDIR /backed-challenge

COPY . . 

RUN rm -rf node_modules

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000