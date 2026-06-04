import type { RoutePoint, RoutePointType } from "../types";
import { getPointTypeLabel, pointTypes } from "../data/pointTypes";

type Props = {
  points: RoutePoint[];
  selectedType: RoutePointType | "all";
  selectedDifficulty: number | "all";
  onTypeChange: (type: RoutePointType | "all") => void;
  onDifficultyChange: (difficulty: number | "all") => void;
  onSelectPoint: (point: RoutePoint) => void;
  onEditPoint: (point: RoutePoint) => void;
  onDeletePoint: (id: string) => void;
  onStartTraining: () => void;
};

export default function Sidebar({
  points,
  selectedType,
  selectedDifficulty,
  onTypeChange,
  onDifficultyChange,
  onSelectPoint,
  onEditPoint,
  onDeletePoint,
  onStartTraining,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="app-title">Экзамен ГИБДД — маршрут 2</div>

      <div className="panel">
        <div className="panel-title">Фильтры</div>

        <label>
          Тип
          <select value={selectedType} onChange={(event) => onTypeChange(event.target.value as RoutePointType | "all")}>
            <option value="all">Все</option>
            {pointTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Сложность
          <select
            value={selectedDifficulty}
            onChange={(event) => onDifficultyChange(event.target.value === "all" ? "all" : Number(event.target.value))}
          >
            <option value="all">Любая</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>

        <button disabled={points.length === 0} onClick={onStartTraining}>
          Режим повторения
        </button>
      </div>

      <div className="panel points-panel">
        <div className="panel-title">Точки маршрута: {points.length}</div>

        {points.length === 0 && (
          <div className="empty-text">
            Кликни по карте, чтобы добавить первую сложную точку.
          </div>
        )}

        <div className="points-list">
          {points.map((point) => (
            <div className="point-item" key={point.id}>
              <button className="point-main" onClick={() => onSelectPoint(point)}>
                <span className="point-title">{point.title}</span>
                <span className="point-meta">{getPointTypeLabel(point.type)}</span>
                <span className="point-meta">Сложность: {point.difficulty}/5</span>
              </button>

              <div className="point-actions">
                <button className="small-button" onClick={() => onEditPoint(point)}>
                  Изменить
                </button>
                <button className="small-button danger" onClick={() => onDeletePoint(point.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}