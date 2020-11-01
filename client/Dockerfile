FROM node:12 AS node-image

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx


COPY --from=node-image /usr/src/app/dist/client/  /usr/share/nginx/html
