FROM python:3.9-slim

# Установка зависимостей
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . /app

# Запуск бота
CMD ["python", "main.py"]

