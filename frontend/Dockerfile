FROM node:18 AS base

WORKDIR /app

COPY . .

RUN apt-get -y install pnpm=9.14.2 \
  && pnpm install

CMD ["pnpm", "run", "start"]
