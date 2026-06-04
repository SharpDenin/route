import type { RoutePoint } from "../types";

const STORAGE_KEY = "gibdd-route-2-points";

export const getStoredPoints = (): RoutePoint[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as RoutePoint[];
  } catch {
    return [];
  }
};

export const setStoredPoints = (points: RoutePoint[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
};