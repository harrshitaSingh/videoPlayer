FROM mhart/alpine-node:latest

WORKDIR /custom-video-player

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]