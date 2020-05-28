FROM node
WORKDIR /epubb
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=0 /epubb/build /usr/share/nginx/html
