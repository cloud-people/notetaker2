# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn deploy
CMD ["node", "api/dist/index.js"]
EXPOSE 3000
