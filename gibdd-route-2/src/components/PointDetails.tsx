import type { RoutePoint } from "../types";
import { getPointTypeLabel } from "../data/pointTypes";

type Props = {
  point: RoutePoint;
  onClose: () => void;
  onEdit: (point: RoutePoint) => void;
  onDelete: (id: string) => void;
};

export default function PointDetails({ point, onClose, onEdit, onDelete }: Props) {
  return (
    <div className="details-drawer">
      <div className="details-header">
        <div>
          <div className="details-label">Просмотр точки</div>
          <div className="details-title">{point.title}</div>
        </div>

        <button className="secondary-button" onClick={onClose}>
          Закрыть
        </button>
      </div>

      <div className="details-section">
        <div className="info-row">
          <b>Тип:</b>
          <span>{getPointTypeLabel(point.type)}</span>
        </div>

        <div className="info-row">
          <b>Сложность:</b>
          <span>{point.difficulty}/5</span>
        </div>

        <div className="info-row">
          <b>Координаты:</b>
          <span>
            {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
          </span>
        </div>
      </div>

      <div className="details-section">
        <div className="details-section-title">Правильное выполнение</div>
        <p className="details-text">{point.correctAction || "Не заполнено"}</p>

        {(point.correctActionImages ?? []).length > 0 && (
          <div className="image-grid large">
            {point.correctActionImages.map((image) => (
              <img src={image} key={image} />
            ))}
          </div>
        )}
      </div>

      <div className="details-section">
        <div className="details-section-title">Типичные ошибки</div>
        <p className="details-text">{point.commonMistakes || "Не заполнено"}</p>
      </div>

      <div className="details-section">
        <div className="details-section-title">Описание</div>
        <p className="details-text">{point.description || "Не заполнено"}</p>

        {(point.descriptionImages ?? []).length > 0 && (
          <div className="image-grid large">
            {point.descriptionImages.map((image) => (
              <img src={image} key={image} />
            ))}
          </div>
        )}
      </div>

      <div className="details-actions">
        <button className="secondary-button" onClick={() => onEdit(point)}>
          Изменить
        </button>

        <button className="danger-button" onClick={() => onDelete(point.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}