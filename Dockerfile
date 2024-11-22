FROM node:20.15.1

WORKDIR /app

COPY *.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]