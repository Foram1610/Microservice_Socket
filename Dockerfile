
FROM 281918433408.dkr.ecr.us-east-1.amazonaws.com/node:14

# Create app directory
WORKDIR /usr/src/app

#Install app dependecies
#A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
#Bundle app source
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]

