import { useState } from 'react';

const Description = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mb-10 max-w-[700px]">
      <div className="grid gap-3 text-sm font-normal" data-testid="test-text-initial">
        <p>
          Приложение строит прогноз с&nbsp;точностью до&nbsp;дома и&nbsp;показывает осадки
          в&nbsp;реальном времени.
        </p>
        <div>
          <p>
            В основе приложения — онлайн сервис{' '}
            <span className="inline-block font-semibold">OpenWeatherMap</span>, который
            предоставляет API для доступа к&nbsp;данным о&nbsp;текущей погоде, прогнозам.
          </p>
          <p>
            Также подключен <span className="inline-block font-semibold">Geocoding API</span>,
            который преобразует указанное название местоположения в&nbsp;точные географические
            координаты.
          </p>
        </div>
      </div>
      {!showMore ? (
        <button
          className="font-xs ml-auto block font-normal text-[#0ea5e9]"
          type="button"
          data-testid="test-btn-showmore"
          onClick={() => setShowMore(!showMore)}
        >
          еще
        </button>
      ) : (
        <div className="mt-5 text-sm font-normal" data-testid="test-text-showmore">
          <p>
            — Определение местоположения пользователя и&nbsp;отображение актуальной погоды
            в&nbsp;этом районе.
          </p>
          <p>
            — Прогноз на&nbsp;сегодня, на&nbsp;завтра или на&nbsp;целую неделю для всего города или
            конкретного адреса.
          </p>
          <p>
            — Гибкий поиск, выводит список городов с&nbsp;совпадающим названием. Позволяет получить
            прогноз для нужного города.
          </p>
        </div>
      )}
    </div>
  );
};

export default Description;
