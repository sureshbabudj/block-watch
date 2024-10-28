import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// Create a new neighborhood
export async function POST(request: Request) {
  try {
    const {
      name,
      boundaries,
      description = "test", // TODO: make it optional
      rules = "test", // TODO: create rules as separate table and source/create the rules from there
    } = await request.json();

    // Validation (example)
    if (!name || !boundaries || !description || !rules) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const data = await prisma.neighborhood.create({
      data: {
        name,
        boundaries,
        description,
        rules,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Get all neighborhoods
export async function GET() {
  try {
    const data = await prisma.neighborhood.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Update a neighborhood
export async function PUT(request: Request) {
  try {
    const { id, name, boundaries, description, rules } = await request.json();

    // Validation (example)
    if (!id || !name || !boundaries || !description || !rules) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const data = await prisma.neighborhood.update({
      where: { id },
      data: {
        name,
        boundaries,
        description,
        rules,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Delete a neighborhood
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Validation (example)
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await prisma.neighborhood.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Neighborhood deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-static";
