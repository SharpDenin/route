import { useEffect, useState, type FormEvent } from "react";
import type { RoutePoint, RoutePointType } from "../types";
import { pointTypes } from "../data/pointTypes";

type Props = {
  point: RoutePoint | null;
  draftLocation: { lat: number; lng: number } | null;
  onSave: (point: RoutePoint) => void;
  onCancel: () => void;
};

export default function PointForm({ point, draftLocation, onSave, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<RoutePointType>("custom");
  const [correctAction, setCorrectAction] = useState("");
  const [commonMistakes, setCommonMistakes] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(3);

  useEffect(() => {
    if (point) {
      setTitle(point.title);
      setType(point.type);
      setCorrectAction(point.correctAction);
      setCommonMistakes(point.commonMistakes);
      setDescription(point.description);
      setDifficulty(point.difficulty);
      return;
    }

    setTitle("");
    setType("custom");
    setCorrectAction("");
    setCommonMistakes("");
    setDescription("");
    setDifficulty(3);
  }, [point, draftLocation]);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const location = point ?? draftLocation;

    if (!location) {
      return;
    }

    onSave({
      id: point?.id ?? crypto.randomUUID(),
      lat: location.lat,
      lng: location.lng,
      title: title.trim() || "Без названия",
      type,
      correctAction,
      commonMistakes,
      description,
      difficulty,
      createdAt: point?.createdAt ?? new Date().toISOString(),
    });
  };

  return (
    <form className="point-form" onSubmit={submit}>
      <div className="form-title">{point ? "Редактировать точку" : "Добавить точку"}</div>

      <label>
        Название
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>

      <label>
        Тип манёвра
        <select value={type} onChange={(event) => setType(event.target.value as RoutePointType)}>
          {pointTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Правильное выполнение
        <textarea value={correctAction} onChange={(event) => setCorrectAction(event.target.value)} />
      </label>

      <label>
        Типичные ошибки
        <textarea value={commonMistakes} onChange={(event) => setCommonMistakes(event.target.value)} />
      </label>

      <label>
        Описание
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>

      <label>
        Сложность
        <select value={difficulty} onChange={(event) => setDifficulty(Number(event.target.value) as 1 | 2 | 3 | 4 | 5)}>
          <option value={1}>1 — легко</option>
          <option value={2}>2</option>
          <option value={3}>3 — средне</option>
          <option value={4}>4</option>
          <option value={5}>5 — сложно</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  );
}