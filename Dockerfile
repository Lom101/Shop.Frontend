# Используем официальный образ Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:stable-alpine

# Копируем билд приложения в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем файл конфигурации nginx (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Экспонируем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
