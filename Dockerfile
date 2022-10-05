FROM node:14

WORKDIR /app
COPY package.json /app
COPY . /app

CMD /bin/bash -c 'npm install; npm run dev'


