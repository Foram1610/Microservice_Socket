FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

ENV NODE_ENV=production

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
