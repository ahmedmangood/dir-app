import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Choice from "../../../models/Choice";
import { choiceSchema } from "../../../lib/validation";
import { z } from "zod";

// GET all choices
export async function GET() {
  await dbConnect();
  const choices = await Choice.find();
  return NextResponse.json(choices);
}

// POST a new choice
export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  try {
    // Validate the input
    const validatedData = choiceSchema.parse(body);

    const choice = new Choice(validatedData);
    await choice.save();

    return NextResponse.json(choice, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT (update) an existing choice
export async function PUT(request: Request) {
  await dbConnect();
  const body = await request.json();

  try {
    // Validate the input
    const validatedData = choiceSchema.parse(body);

    const updatedChoice = await Choice.findByIdAndUpdate(
      validatedData._id,
      {
        name: validatedData.name,
        steps: validatedData.steps,
        image: validatedData.image,
      },
      { new: true }
    );

    if (!updatedChoice) {
      return NextResponse.json(
        { error: "لم يتم العثور على الإختيار" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedChoice);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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
