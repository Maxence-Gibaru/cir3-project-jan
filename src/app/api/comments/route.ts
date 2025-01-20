import dbConnect from '@/lib/dbConnect';
import { Organizer, OrganizerObject } from '@/models/Organizer';
import { NextRequest, NextResponse } from 'next/server';

// GET: Récupérer tous les organisateurs
export async function GET() {
  try {
    await dbConnect();
    const organizers: OrganizerObject[] = await Organizer.find(); // Récupère tous les documents
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
    const body: String = await req.json();
    const newOrganizer = await Organizer.create(body);
    return NextResponse.json(newOrganizer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create organizer' }, { status: 500 });
  }
}
