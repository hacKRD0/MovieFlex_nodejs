FROM node

WORKDIR /app/authentication-service

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]