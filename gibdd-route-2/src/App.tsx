import { useMemo, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import PointForm from "./components/PointForm";
import TrainingMode from "./components/TrainingMode";
import { getStoredPoints, setStoredPoints } from "./storage/pointsStorage";
import type { RoutePoint, RoutePointType } from "./types";

export default function App() {
  const [points, setPoints] = useState<RoutePoint[]>(getStoredPoints);
  const [selectedPoint, setSelectedPoint] = useState<RoutePoint | null>(null);
  const [editingPoint, setEditingPoint] = useState<RoutePoint | null>(null);
  const [draftLocation, setDraftLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedType, setSelectedType] = useState<RoutePointType | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | "all">("all");
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  const filteredPoints = useMemo(() => {
    return points.filter((point) => {
      const typeMatches = selectedType === "all" || point.type === selectedType;
      const difficultyMatches = selectedDifficulty === "all" || point.difficulty === selectedDifficulty;

      return typeMatches && difficultyMatches;
    });
  }, [points, selectedType, selectedDifficulty]);

  const savePoints = (newPoints: RoutePoint[]) => {
    setPoints(newPoints);
    setStoredPoints(newPoints);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setDraftLocation({ lat, lng });
    setEditingPoint(null);
  };

  const handleSavePoint = (point: RoutePoint) => {
    const exists = points.some((item) => item.id === point.id);

    const newPoints = exists
      ? points.map((item) => (item.id === point.id ? point : item))
      : [...points, point];

    savePoints(newPoints);
    setDraftLocation(null);
    setEditingPoint(null);
    setSelectedPoint(point);
  };

  const handleDeletePoint = (id: string) => {
    const confirmed = confirm("Удалить точку?");

    if (!confirmed) {
      return;
    }

    savePoints(points.filter((point) => point.id !== id));

    if (selectedPoint?.id === id) {
      setSelectedPoint(null);
    }

    if (editingPoint?.id === id) {
      setEditingPoint(null);
    }
  };

  const handleSelectPoint = (point: RoutePoint) => {
    setSelectedPoint(point);
  };

  const handleEditPoint = (point: RoutePoint) => {
    setEditingPoint(point);
    setDraftLocation(null);
    setSelectedPoint(point);
  };

  const closeForm = () => {
    setEditingPoint(null);
    setDraftLocation(null);
  };

  return (
    <div className="app">
      <Sidebar
        points={filteredPoints}
        selectedType={selectedType}
        selectedDifficulty={selectedDifficulty}
        onTypeChange={setSelectedType}
        onDifficultyChange={setSelectedDifficulty}
        onSelectPoint={handleSelectPoint}
        onEditPoint={handleEditPoint}
        onDeletePoint={handleDeletePoint}
        onStartTraining={() => setIsTrainingOpen(true)}
      />

      <main className="main">
        <MapView
          points={filteredPoints}
          selectedPoint={selectedPoint}
          draftLocation={draftLocation}
          onMapClick={handleMapClick}
          onEditPoint={handleEditPoint}
        />

        {(draftLocation || editingPoint) && (
          <div className="form-drawer">
            <PointForm
              point={editingPoint}
              draftLocation={draftLocation}
              onSave={handleSavePoint}
              onCancel={closeForm}
            />
          </div>
        )}
      </main>

      {isTrainingOpen && filteredPoints.length > 0 && (
        <TrainingMode
          points={filteredPoints}
          onClose={() => setIsTrainingOpen(false)}
          onSelectPoint={handleSelectPoint}
        />
      )}
    </div>
  );
}