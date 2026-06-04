import { route2Coordinates } from "../data/route2";

type OsrmRouteResponse = {
  routes: {
    geometry: {
      coordinates: [number, number][];
    };
  }[];
};

export const getRoadRoute = async (): Promise<[number, number][]> => {
  const coordinates = route2Coordinates
    .map(([lat, lng]) => `${lng},${lat}`)
    .join(";");

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
  );

  if (!response.ok) {
    return route2Coordinates;
  }

  const data = (await response.json()) as OsrmRouteResponse;

  const roadCoordinates = data.routes[0]?.geometry.coordinates;

  if (!roadCoordinates) {
    return route2Coordinates;
  }

  return roadCoordinates.map(([lng, lat]) => [lat, lng]);
};