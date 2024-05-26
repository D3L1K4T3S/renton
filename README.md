# Запуск backend
docker-compose build
docker-compose up

# Запуск recognize(бот)
docker build -t bot .
docker run -it -p 8989:8989 --rm bot

# Запуск фронтенда
npm install
npm run dev

# ton
Написаны смарт-контракты и задеплоены в тестовую сеть