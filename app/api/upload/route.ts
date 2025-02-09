import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Generate a unique file name
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // Save the file locally
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);

    // Return the full URL
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
