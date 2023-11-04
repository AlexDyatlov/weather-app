## Weather app


### <a name="start"></a> 🛠️ Запуск проекта в ide:

1. Скопировать файл `.env.example` и вставить в корень проекта, переименовать в `.env`.
2. Получить API-ключ OpenWeatherMap и добавить в `.env` собственный ключ `VITE_API_KEY=e7704bc895b4a8d2dfd4a29d404285b6`.
3. Команды:
  + `yarn` - установит все зависимости.
  + `yarn start` - запускает приложение в режиме разработки.
  + `yarn build` - собирает файлы проекта в один каталог.
  + `yarn lint` - запускает ESLint для проверки ts,tsx файлов.
  + `yarn format` - запускает Prettier для форматирования ts,tsx файлов.

### <a name="docker"></a> 🐳 Развертывание проекта в Docker:

1. Выполнить пункт 1,2 с «Запуск проекта в ide».
2. Запуск сборки в dev режиме:
  + `docker compose build`
  + `docker compose run --rm node yarn`
  + `docker compose up`
3. Запуск ESLint:
  + `docker compose run --rm node yarn lint`
3. Запуск Prettier:
  + `docker compose run --rm node yarn format`