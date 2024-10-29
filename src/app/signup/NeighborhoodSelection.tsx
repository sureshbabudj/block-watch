"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
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
import { LoggedInUser } from "@/lib/appStore";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  rules: z.string().min(10),
});

interface NeighborhoodSelectionProps {
  onNext: (userData: any) => void;
  onPrevious: (userData: any) => void;
  userData: LoggedInUser;
}

type BoundaryInput = [number, number];

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

export default function NeighborhoodSelection({
  onNext,
  onPrevious,
  userData,
}: NeighborhoodSelectionProps) {
  const [error, setError] = useState("");
  const [initialCoordinates, setInitialCoordinates] =
    useState<Coordinates | null>(null);
  const [boundingBoxPolygon, setBoundingBoxPolygon] = useState<BoundaryInput[]>(
    []
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
    },
  });

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
        `/api/neighborhoods/polygon?address=${address}`
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
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatBoundaries = (boundaries: BoundaryInput[]): string => {
    return boundaries.map(([lat, lng]) => `${lat}:${lng}`).join(",");
  };

  const onSubmit = async (data: any) => {
    if (userBoundingBoxPolygon.length === 0) {
      setError("Please draw your neighborhood boundaries on the map");
      return;
    }

    const formattedBoundaries = formatBoundaries(userBoundingBoxPolygon);

    try {
      const response = await fetch("/api/neighborhoods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          boundaries: formattedBoundaries,
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
            "An error occurred while creating the neighborhood"
        );
      }
    } catch (err) {
      setError("An error occurred while creating the neighborhood");
    }
  };

  useEffect(() => {
    getNeighborhood(userData.address);
  }, [userData.address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!initialCoordinates) {
    return <div>No initial coordinates</div>;
  }

  if (selectedNeighborhood) {
    return <p>Good news, we found your community based on your address.</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="h-96 mb-4">
          <MapComponent
            initialCoordinates={initialCoordinates}
            boundingBoxPolygon={boundingBoxPolygon}
            userBoundingBoxPolygon={userBoundingBoxPolygon}
            setUserBoundingBoxPolygon={setUserBoundingBoxPolygon}
          />
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
