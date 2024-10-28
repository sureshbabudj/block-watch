"use client";
import React, { useState } from "react";
import UserForm, { ExtendedUserInput } from "../components/UserForm";
import NeighborhoodForm, {
  NeighborhoodInput,
} from "../components/NeighborhoodForm";
import { Coordinates, OpenMapData } from "@/types";
import { Neighborhood } from "@prisma/client";

const OnBoaringFlow: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Neighborhood | null>(null);
  const [initialCoordinates, setInitialCoordinates] =
    useState<Coordinates | null>(null);
  const [boundingBox, setboundingBox] = useState<
    OpenMapData["boundingbox"] | null
  >(null);

  const getNeighborhood = async (
    address: string,
  ): Promise<Neighborhood | null> => {
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
          setboundingBox(boundingbox);
        }
        return null;
      }
      setSelectedNeighborhood(data.neighborhood);
      return data.neighborhood;
    } catch (error: any) {
      return null;
    }
  };

  const handleUserSubmit = async (userData: ExtendedUserInput) => {
    try {
      const neighborhood = await getNeighborhood(userData.address);
      if (!neighborhood) {
        setSelectedNeighborhood(null);
      } else {
        // Add user to the existing neighborhood
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            neighborhoodId: neighborhood.id,
          }),
        });
        console.log("User created successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNeighborhoodSubmit = async (
    neighborhoodData: NeighborhoodInput,
  ) => {
    try {
      const response = await fetch("/api/neighborhoods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(neighborhoodData),
      });
      const newNeighborhood = await response.json();
      setSelectedNeighborhood(newNeighborhood.id);
      console.log("Neighborhood created successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <UserForm onSubmit={handleUserSubmit} />
      {!selectedNeighborhood && initialCoordinates && boundingBox && (
        <>
          <h1>Create Neighborhood</h1>
          <NeighborhoodForm
            onSubmit={handleNeighborhoodSubmit}
            initialCoordinates={initialCoordinates}
            boundingBox={boundingBox}
          />
        </>
      )}
    </div>
  );
};

export default OnBoaringFlow;
