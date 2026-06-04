export type RoutePointType =
  | "intersection_regulated"
  | "intersection_unregulated"
  | "equal_roads"
  | "priority_road"
  | "roundabout"
  | "pedestrian_crossing"
  | "bus_stop"
  | "yard_exit"
  | "lane_change"
  | "left_turn"
  | "right_turn"
  | "u_turn"
  | "limited_space_u_turn"
  | "hill_start"
  | "parking_parallel"
  | "parking_90"
  | "speed_control"
  | "braking_stop"
  | "danger_zone"
  | "custom";

export type RoutePoint = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: RoutePointType;
  correctAction: string;
  correctActionImages: string[];
  commonMistakes: string;
  description: string;
  descriptionImages: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
};