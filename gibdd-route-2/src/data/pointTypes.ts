import type { RoutePointType } from "../types";

export const pointTypes: { value: RoutePointType; label: string }[] = [
  { value: "intersection_regulated", label: "Регулируемый перекрёсток" },
  { value: "intersection_unregulated", label: "Нерегулируемый перекрёсток" },
  { value: "equal_roads", label: "Равнозначные дороги" },
  { value: "priority_road", label: "Неравнозначные дороги" },
  { value: "roundabout", label: "Кольцо" },
  { value: "pedestrian_crossing", label: "Пешеходный переход" },
  { value: "bus_stop", label: "Остановка маршрутного ТС" },
  { value: "yard_exit", label: "Прилегающая территория / двор" },
  { value: "lane_change", label: "Перестроение" },
  { value: "left_turn", label: "Левый поворот" },
  { value: "right_turn", label: "Правый поворот" },
  { value: "u_turn", label: "Разворот" },
  { value: "limited_space_u_turn", label: "Разворот в ограниченном пространстве" },
  { value: "hill_start", label: "Остановка и начало движения на подъёме" },
  { value: "parking_parallel", label: "Параллельная парковка" },
  { value: "parking_90", label: "Парковка 90 градусов" },
  { value: "speed_control", label: "Скорость" },
  { value: "braking_stop", label: "Торможение / остановка" },
  { value: "danger_zone", label: "Опасное место" },
  { value: "custom", label: "Другое" },
];

export const getPointTypeLabel = (type: RoutePointType) => {
  return pointTypes.find((item) => item.value === type)?.label ?? "Другое";
};