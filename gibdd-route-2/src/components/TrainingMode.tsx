import { useState, type MouseEvent } from "react";
import type { RoutePoint } from "../types";
import { getPointTypeLabel } from "../data/pointTypes";

type Props = {
  points: RoutePoint[];
  onClose: () => void;
  onSelectPoint: (point: RoutePoint) => void;
};

export default function TrainingMode({ points, onClose, onSelectPoint }: Props) {
  const [index, setIndex] = useState(0);

  const point = points[index];

  const prev = () => {
    setIndex((current) => Math.max(current - 1, 0));
  };

  const next = () => {
    setIndex((current) => Math.min(current + 1, points.length - 1));
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleShowOnMap = () => {
    onSelectPoint(point);
    onClose();
  };

  return (
    <div className="training-overlay" onClick={handleOverlayClick}>
      <div className="training-card" onClick={handleCardClick}>
        <div className="training-header">
          <div>
            <div className="training-counter">
              Точка {index + 1} из {points.length}
            </div>
            <div className="training-title">{point.title}</div>
          </div>

          <button className="secondary-button" onClick={onClose}>
            Закрыть
          </button>
        </div>

        <div className="training-body">
          <div className="info-row">
            <b>Тип:</b>
            <span>{getPointTypeLabel(point.type)}</span>
          </div>

          <div className="info-row">
            <b>Сложность:</b>
            <span>{point.difficulty}/5</span>
          </div>

          <div className="info-block">
            <b>Правильное выполнение</b>
            <p>{point.correctAction || "Не заполнено"}</p>

            {(point.correctActionImages ?? []).length > 0 && (
              <div className="image-grid large">
                {point.correctActionImages.map((image) => (
                  <img src={image} key={image} />
                ))}
              </div>
            )}
          </div>

          <div className="info-block">
            <b>Типичные ошибки</b>
            <p>{point.commonMistakes || "Не заполнено"}</p>
          </div>

          <div className="info-block">
            <b>Описание</b>
            <p>{point.description || "Не заполнено"}</p>

            {(point.descriptionImages ?? []).length > 0 && (
              <div className="image-grid large">
                {point.descriptionImages.map((image) => (
                  <img src={image} key={image} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="training-actions">
          <button className="secondary-button" disabled={index === 0} onClick={prev}>
            Назад
          </button>
          <button onClick={handleShowOnMap}>Показать на карте</button>
          <button className="secondary-button" disabled={index === points.length - 1} onClick={next}>
            Дальше
          </button>
        </div>
      </div>
    </div>
  );
}