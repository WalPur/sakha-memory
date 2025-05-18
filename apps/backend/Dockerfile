FROM python:3.12

# Отключение создания .pyc файлов и буферизации логов
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Обновление списка пакетов и установка необходимых библиотек
RUN apt-get update -y && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

# Копирование requirements.txt и обновление pip, setuptools, wheel
COPY requirements.txt /code/
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Копирование исходного кода
COPY ../.. /code/
