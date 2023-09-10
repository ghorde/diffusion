FROM node:20-alpine

WORKDIR /app

COPY ../../app/package.json .
COPY ../../app/yarn.lock .

CMD yarn; npx prisma db push; npx prisma generate; npx prisma studio & yarn dev