import os

# Привязка к адресу и порту
bind = os.getenv("GUNICORN_BIND", "0.0.0.0:8000")

# Количество воркеров (рекомендуется 2-4 рабочих процесса на ядро CPU)
workers = int(os.getenv("GUNICORN_WORKERS", 1))

# Таймаут (в секундах): сервер завершает работу воркера, если он зависнет
timeout = int(os.getenv("GUNICORN_TIMEOUT", 60))

# Уровень логирования
loglevel = os.getenv("GUNICORN_LOGLEVEL", "info")
