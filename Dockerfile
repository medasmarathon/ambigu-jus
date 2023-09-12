FROM node:20.6.1
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn
COPY . .
EXPOSE 3033
CMD ["yarn", "dev"]
