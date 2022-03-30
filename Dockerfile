FROM node:14-buster-slim
WORKDIR /code
COPY . .
RUN npm install