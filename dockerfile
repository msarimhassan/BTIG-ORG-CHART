FROM node:16.16.0

WORKDIR /app

COPY yarn.lock package.json ./

RUN --mount=type=cache,id=yarn,mode=0777,target=/usr/local/share/.cache/yarn \
    yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","start"]
