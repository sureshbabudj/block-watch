"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Coordinates, OpenMapData } from "@/types";
import { Neighborhood } from "@prisma/client";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/appStore";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  rules: z.string().min(10),
});

interface NeighborhoodSelectionProps {
  onNext: (userData: any) => void;
  onPrevious: (userData: any) => void;
  userData: any;
}

type BoundaryInput = [number, number];

export default function NeighborhoodSelection({
  onNext,
  onPrevious,
  userData,
}: NeighborhoodSelectionProps) {
  const [user] = useAtom(userAtom);
  const [boundaries, setBoundaries] = useState(null);
  const [error, setError] = useState("");
  const [initialCoordinates, setInitialCoordinates] =
    useState<Coordinates | null>(null);
  const [boundingBoxPolygon, setBoundingBoxPolygon] = useState<BoundaryInput[]>(
    [],
  );
  const [userBoundingBoxPolygon, setUserBoundingBoxPolygon] = useState<
    BoundaryInput[]
  >([]);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Neighborhood | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      rules: "",
      boundaries: "",
    },
  });

  useEffect(() => {
    user && getNeighborhood(user.address);
  }, [user]);

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

  const getBoundingbox = (boundingBox: OpenMapData["boundingbox"]) => {
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
  };

  const getNeighborhood = async (address: string) => {
    try {
      const response = await fetch(
        `/api/neighborhoods/polygon?address=${address}`,
      );
      const data = await response.json();
      if (!data.neighborhood) {
        if (data.place) {
          const { lat, lon, boundingbox } = data.place as OpenMapData;
          const coordinates = {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
          };
          setInitialCoordinates(coordinates);
          getBoundingbox(boundingbox);
        }
        return null;
      }
      setSelectedNeighborhood(data.neighborhood);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    if (!boundaries) {
      setError("Please draw your neighborhood boundaries on the map");
      return;
    }

    try {
      const response = await fetch("/api/neighborhoods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          boundaries: JSON.stringify(boundaries),
          userId: userData.id,
        }),
      });

      if (response.ok) {
        const neighborhoodData = await response.json();
        onNext({ ...userData, neighborhood: neighborhoodData });
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            "An error occurred while creating the neighborhood",
        );
      }
    } catch (err) {
      setError("An error occurred while creating the neighborhood");
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleMapClick = (e: any) => {
    const { boundaries } = form.getValues();

    form.setValue(
      "boundaries",
      `${form.getValues("boundaries")}:${e.latlng.lat},${e.latlng.lng}}`,
    );
  };

  if (loading) {
    return "loading";
  }

  if (!initialCoordinates) {
    return "No initial coordinates";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="h-64 mb-4">
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
            {/* {form.getValues("boundaries").length > 0 && (
              <Polygon positions={form.getValues("boundaries") as} />
            )} */}
            {boundingBoxPolygon.length > 0 && (
              <Polygon positions={boundingBoxPolygon} />
            )}
            <MapEvents />
          </MapContainer>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neighborhood Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter neighborhood name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your neighborhood" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter neighborhood rules" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
