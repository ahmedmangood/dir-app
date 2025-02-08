import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Choice from "../../../models/Choice";

// GET all choices
export async function GET() {
  await dbConnect();
  const choices = await Choice.find();
  return NextResponse.json(choices);
}

// POST a new choice with directions
export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const { name, steps } = body;

  if (!name || !Array.isArray(steps)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const choice = new Choice({ name, steps });
  await choice.save();

  return NextResponse.json(choice, { status: 201 });
}

// PUT (update) an existing choice
export async function PUT(request: Request) {
  await dbConnect();
  const body = await request.json();

  const { _id, name, steps } = body;

  if (!_id || !name || !Array.isArray(steps)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updatedChoice = await Choice.findByIdAndUpdate(
    _id,
    { name, steps },
    { new: true }
  );

  if (!updatedChoice) {
    return NextResponse.json({ error: "Choice not found" }, { status: 404 });
  }

  return NextResponse.json(updatedChoice);
}

// DELETE a choice
export async function DELETE(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const deletedChoice = await Choice.findByIdAndDelete(id);

  if (!deletedChoice) {
    return NextResponse.json({ error: "Choice not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Choice deleted successfully" });
}
