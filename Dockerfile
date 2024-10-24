# Stage 1: Build the React app
FROM node:18 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код приложения в рабочую директорию
COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_STRIPE_PUBLIC_KEY
ARG REACT_APP_YANDEX_API_KEY

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STRIPE_PUBLIC_KEY=$REACT_APP_STRIPE_PUBLIC_KEY
ENV REACT_APP_YANDEX_API_KEY=$REACT_APP_YANDEX_API_KEY

# Собираем production-версию приложения
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Копируем собранные файлы React в папку, которую обслуживает Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Указываем, на каком порту контейнер будет работать
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
