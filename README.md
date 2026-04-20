# FA Group Website

Сайт компании FA Group для деплоя на Railway.

## Файлы

- `index.html` — главная страница
- `style.css` — стили
- `script.js` — JavaScript (счётчики, форма, модалки)

## Настройка Telegram

1. Открой `script.js`
2. Замени в начале файла:
```js
const TG_TOKEN   = "СЮДА_ВСТАВЬ_ТОКЕН_БОТА";
const TG_CHAT_ID = "СЮДА_ВСТАВЬ_CHAT_ID";
```

Как получить токен — через @BotFather в Telegram.
Как получить Chat ID — написать @userinfobot.

## Деплой на Railway

1. Залей папку на GitHub
2. Зайди на railway.app → New Project → Deploy from GitHub
3. Railway автоматически поднимет сайт через nginx (см. railway.json)
