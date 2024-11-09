"use client";
import { use } from "react";
import withAuthRedirect from "@/hoc/withAuthRedirect";
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
import { Coordinates, ExtendedNeighborhood, OpenMapData } from "@/types";
import { userAtom } from "@/lib/appStore";
import NeighborhoodView from "./NeighborhoodView";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Neighborhood } from "@prisma/client";
import useAuth from "@/hooks/useAuth";
import { Toast } from "@capacitor/toast";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  rules: z.string().min(10),
});

type BoundaryInput = [number, number];

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

const parseBoundaries = (boundariesString: string): string[][] => {
  return boundariesString.split(",").map((pair) => {
    const [lat, lng] = pair.split(":");
    return [lat, lng];
  });
};

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
  return [southWest, northWest, northEast, southEast, southWest];
};

function NeighborhoodSelectionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { refreshAuth } = useAuth();
  const { update } = use(searchParams);
  const router = useRouter();
  const [user] = useAtom(userAtom);

  if (!user) {
    router.replace("/signin");
    return <></>;
  }

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
    useState<ExtendedNeighborhood | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.address,
      description: "",
      rules: "",
    },
  });

  const getNeighborhood = async (address: string) => {
    try {
      const response = await fetch(
        `/api/neighborhoods/search?address=${address}`
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
          const boundingBoxPolygon = getBoundingbox(boundingbox);
          setBoundingBoxPolygon(boundingBoxPolygon);
        }
        return null;
      }
      const currentLocation = parseBoundaries(data.neighborhood.boundaries)[0];
      const coordinates = {
        lat: parseFloat(currentLocation[0]),
        lon: parseFloat(currentLocation[1]),
      };
      setInitialCoordinates(coordinates);
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

  const addUserToNeighbourhood = async (neighborhood: Neighborhood) => {
    try {
      const formData: any = new FormData();
      formData.append("neighborhoods", neighborhood.id);
      const response = await fetch(`/api/auth/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      await refreshAuth();
      router.replace("/community/profile");
    } catch (err: any) {
      throw new Error(
        err.message || "An error occurred while adding the user to neighborhood"
      );
    }
  };

  const onSubmit = async (data: any) => {
    const inputBoundaries =
      userBoundingBoxPolygon.length > 0
        ? userBoundingBoxPolygon
        : boundingBoxPolygon;
    if (inputBoundaries.length === 0) {
      setError("Please draw your neighborhood boundaries on the map");
      return <></>;
    }

    const formattedBoundaries = formatBoundaries(inputBoundaries);

    try {
      const response = await fetch("/api/neighborhoods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          boundaries: formattedBoundaries,
          userId: user.id,
        }),
      });

      if (response.ok) {
        const { neighborhood } = await response.json();
        await addUserToNeighbourhood(neighborhood);
        router.replace("/community/profile/update");
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
    getNeighborhood(user.address);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!update && selectedNeighborhood) {
    return <NeighborhoodView neighborhood={selectedNeighborhood} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <>
          {!initialCoordinates ? (
            <div>No initial coordinates</div>
          ) : (
            <>
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
                      <Input
                        placeholder="Enter neighborhood name"
                        {...field}
                        className="bg-white text-base"
                      />
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
                      <Textarea
                        className="text-base"
                        placeholder="Describe your neighborhood"
                        {...field}
                      />
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
                      <Textarea
                        className="text-base"
                        placeholder="Enter neighborhood rules"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}

              <Button type="submit" className="">
                Add Neighborhood
              </Button>
            </>
          )}
        </>
      </form>
    </Form>
  );
}

export default withAuthRedirect(NeighborhoodSelectionPage);
