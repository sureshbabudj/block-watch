import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import { OpenMapData } from "@/types";

interface NeighborhoodFormProps {
  onSubmit: (data: NeighborhoodInput) => void;
  initialCoordinates: { lat: number; lon: number };
  boundingBox: OpenMapData["boundingbox"];
}

type BoundaryInput = [number, number];

export interface NeighborhoodInput {
  name: string;
  boundaries: BoundaryInput[];
  description: string;
  rules: string;
}

const NeighborhoodForm: React.FC<NeighborhoodFormProps> = ({
  onSubmit,
  initialCoordinates,
  boundingBox,
}) => {
  const [boundingBoxPolygon, setBoundingBoxPolygon] = useState<BoundaryInput[]>(
    [],
  );
  const [formData, setFormData] = useState<NeighborhoodInput>({
    name: "",
    boundaries: [],
    description: "",
    rules: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMapClick = (e: any) => {
    setFormData({
      ...formData,
      boundaries: [...formData.boundaries, [e.latlng.lat, e.latlng.lng]],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    // Cleanup function to remove the map instance on component unmount
    return () => {
      const mapContainer = document.getElementById("map") as HTMLElement & {
        _leaflet_id: any;
      };
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }
    };
  }, []);

  useEffect(() => {
    const southWest: BoundaryInput = [
      parseFloat(boundingBox[0]),
      parseFloat(boundingBox[2]),
    ];
    const northWest: BoundaryInput = [
      parseFloat(boundingBox[1]),
      parseFloat(boundingBox[2]),
    ];
    const northEast: BoundaryInput = [
      parseFloat(boundingBox[1]),
      parseFloat(boundingBox[3]),
    ];
    const southEast: BoundaryInput = [
      parseFloat(boundingBox[0]),
      parseFloat(boundingBox[3]),
    ];
    setBoundingBoxPolygon([
      southWest,
      northWest,
      northEast,
      southEast,
      southWest,
    ]);
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Neighborhood Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <textarea
        name="rules"
        value={formData.rules}
        onChange={handleChange}
        placeholder="Rules"
      ></textarea>
      <MapContainer
        id="map"
        center={[initialCoordinates.lat, initialCoordinates.lon]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {formData.boundaries.length > 0 && (
          <Polygon positions={formData.boundaries} />
        )}
        {!formData.boundaries.length && boundingBoxPolygon.length > 0 && (
          <Polygon positions={boundingBoxPolygon} />
        )}
        <MapEvents />
      </MapContainer>
      <button type="submit">Create Neighborhood</button>
    </form>
  );
};

export default NeighborhoodForm;
