import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { OrganizerModel, OrganizerZodSchema } from "@/models/Organizer";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

