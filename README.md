## Приложение Weather-app — прогноз погоды

### Обзор:
+ [Запуск проекта в ide](#start);
+ [Развертывание проекта в Docker](#docker);
+ [Результат](#result);
+ [Изображение проекта](#image);

### <a name="start"></a> 🛠️ Запуск проекта в ide:

1. Скопировать файл `.env.example` и вставить в корень проекта, переименовать в `.env`.
2. Получить API-ключ OpenWeatherMap и добавить в `.env` собственный ключ `VITE_API_KEY=key`.
3. Команды:
  + `yarn` - установит все зависимости.
  + `yarn start` - запускает приложение в режиме разработки.
  + `yarn build` - собирает файлы проекта в один каталог.
  + `yarn lint` - запускает ESLint для проверки ts,tsx файлов.
  + `yarn format` - запускает Prettier для форматирования ts,tsx файлов.
  + `yarn test` - запускает Jest для тестирования JavaScript.

### <a name="docker"></a> 🐳 Развертывание проекта в Docker:

1. Выполнить пункт 1,2 с «Запуск проекта в ide».
2. Запуск сборки в dev режиме:
  + `docker compose build`
  + `docker compose run --rm node yarn`
  + `docker compose up`
3. `docker compose run --rm node yarn lint` — Запуск ESLint.
4. `docker compose run --rm node yarn format` — Запуск Prettier.
5. `docker compose run --rm node yarn test` — Запуск Jest.

### <a name="result"></a> 🎉 Результат:
  + Стилистика ✅
  + Получение данных о текущей погоде с `OpenWeatherMap API` ✅
  + Получение местоположения пользователя с `Geolocation API`, хук useGeoLocation ✅
  + `Поиск по городам` с отображением текущей погоды в выбранном городе ✅
  + Просмотр прогноза погоды на неделю вперед ✅
  + Кастомный хук `useDebounce` ✅
  + TypeScript ✅
  + Дополнительно:
    + Unit-тесты, Snapshot-тесты (Jest) ✅
    + Приложение развернуто в `Docker` ✅
    + Компонент `alert` со статусом об успешном или не успешном определении местоположения ✅
    + `Доступность` (управление сайтом с помощью клавиатуры, клавиша tab) ✅
    + ESlint, Prettier ✅
    + Структура папок и файлов ✅
    + Адаптив ✅


### <a name="image"></a> 🖼️ Изображение
<p align="center">
  <img src="https://github.com/AlexDyatlov/weather-app/blob/main/public/interface.png">
</p>