FROM node:18.17 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18.17 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build:production

FROM node:18.17 as runner
WORKDIR /app
ENV NODE_ENV production
# Если у вас есть пользовательский файл next.config.js, раскомментируйте следующую строку.
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
