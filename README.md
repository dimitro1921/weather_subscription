# Weather API Application

## Опис

Цей сервіс дозволяє користувачам підписуватись на оновлення погоди у вибраному місті. Дані беруться з [OpenWeatherMap API](https://openweathermap.org/api), а підтвердження підписки та відписка — через email-посилання.

## Запуск локально

1. Створи `.env` файл з наступними змінними:
   - API_KEY
   - DB_*
   - MAIL_USER / MAIL_PASS (Mailtrap)

2. Запусти в терміналі:
```bash
docker compose up --build
```
