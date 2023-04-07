# pull official base image
FROM node:alpine as build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV GENERATE_SOURCEMAP=false
ENV CI=false

RUN apk update && apk upgrade --no-cache && \
		apk add --no-cache curl vim

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./ ./

RUN npm install 
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN sed -i '/location \/ {$/a try_files \$uri \/index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
