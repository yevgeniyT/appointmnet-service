#1 Set the base image
FROM node:18.16.1

#2 Set the working directory in the Docker image
WORKDIR /app

#3 Copy package.json and package-lock.json into the image
COPY package*.json ./

#4 Install dependencies in the image
RUN npm install

#5 Copy the rest of your app's source code into the image
COPY . .

#7 Build the TypeScript files into JavaScript
RUN npm run build

#8 Expose the port the app runs on
EXPOSE 8060

#9 Define the command to run your app
CMD [ "node", "dist/server.js" ]
