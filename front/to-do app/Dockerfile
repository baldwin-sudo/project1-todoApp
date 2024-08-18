FROM node:20.16.0

WORKDIR /app

COPY  .  .

RUN npm install

RUN npm install vite react-redux axios

RUN npm run build


EXPOSE 5173


CMD ["npm","run","dev","--host"]

