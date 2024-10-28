import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { isPointInPolygon } from "geolib";
import { Neighborhood } from "@prisma/client";
import { Coordinates, OpenMapData } from "@/types";

const ADDRESS_INPUT = "ADDRESS_INPUT";
const URI = `https://nominatim.openstreetmap.org/search?q=${ADDRESS_INPUT}&format=json&addressdetails=1`;

export const checkNeighborhood = (
  coordinates: Coordinates,
  neighborhoods: Neighborhood[],
): Neighborhood | null => {
  for (const neighborhood of neighborhoods) {
    const boundaries: Coordinates[] = [];
    neighborhood.boundaries.split(",").forEach((coord) => {
      const [lat, lon] = coord.split(":");
      boundaries.push({ lat: Number(lat), lon: Number(lon) });
    });
    if (isPointInPolygon(coordinates, boundaries)) {
      return neighborhood;
    }
  }
  return null;
};

export const getCoordinates = async (address: string): Promise<OpenMapData> => {
  const response = await fetch(
    URI.replace(ADDRESS_INPUT, encodeURIComponent(address)),
  );
  const data = (await response.json()) as OpenMapData[];
  if (data.length > 0) {
    const place = data.find((place) => place.class === "place");
    const { lat, lon } = place ?? data[0];
    return place ?? data[0];
  }
  throw new Error("Address not found");
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 },
      );
    }

    const place = await getCoordinates(address);
    const coordinates = {
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    };

    const neighborhoods = await prisma.neighborhood.findMany();

    const neighborhood = checkNeighborhood(coordinates, neighborhoods);

    if (neighborhood) {
      return NextResponse.json({ neighborhood }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No neighborhood found", place },
        { status: 200 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-static";
