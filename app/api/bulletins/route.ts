import { NextResponse } from "next/server";
import connectDB from "../../add-bulletin/lib/mongodb";
import Bulletin from "../../add-bulletin/models/BulletinModel";

export async function GET() {
  await connectDB();

  const bulletins = await Bulletin.find().sort({
    createdAt: -1,
  });

  return NextResponse.json(bulletins);
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  const bulletin = await Bulletin.create({
    title: body.title,
    category: body.category,
    description: body.description,
    date: body.date,
  });

  return NextResponse.json(bulletin, { status: 201 });
}

export async function DELETE(request: Request) {
  await connectDB();

  const { id } = await request.json();

  await Bulletin.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Bulletin Deleted Successfully",
  });
}
export async function PUT(request: Request) {
  await connectDB();

  const body = await request.json();

  const updatedBulletin = await Bulletin.findByIdAndUpdate(
    body.id,
    {
      title: body.title,
      category: body.category,
      description: body.description,
      date: body.date,
    },
    { new: true }
  );

  return NextResponse.json(updatedBulletin);
}