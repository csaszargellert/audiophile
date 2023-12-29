FROM node:21 AS builder

WORKDIR /home/node/app

COPY --chown=node:node ./client/package*.json ./

RUN npm install

COPY --chown=node:node ./client ./

RUN npm run build

FROM nginx:alpine

COPY --from=builder /home/node/app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]