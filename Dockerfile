FROM node:14 as builder

WORKDIR /medmoderna-front

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN vite build

FROM nginx:stable-alpine

COPY --from=builder /medmoderna-front/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 8080
CMD ["nginx", "-g", "daemon off;"]
