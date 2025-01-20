import dbConnect from '@/lib/dbConnect';
import { Organizer } from '@/models/Organizer';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'


// GET: Récupérer tous les organisateurs
export async function GET() {
  try {
    await dbConnect();
    const organizers = await Organizer.find(); // Récupère tous les documents
    return NextResponse.json(organizers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch organizers' }, { status: 500 });
  }
}

// POST: Ajouter un nouvel organisateur
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    body.password = hashedPassword;


    const newOrganizer = await Organizer.create(body);
    return NextResponse.json({ message: "Registered well !" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create organizer' }, { status: 500 });
  }
}
