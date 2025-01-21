// authOptions.js
import dbConnect from "@/lib/dbConnect";
import { OrganizerModel } from "@/models/Organizer";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";


type user = {
    email: string,
    password: string

}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await dbConnect();
                    const { email, password } = credentials;

                    const user = await OrganizerModel.findOne({ email });

                    if (user && password) {
                        const isValidPassword = await bcrypt.compare(password, user.password);
                        if (isValidPassword) {
                            return { id: user._id.toString(), email: user.email };
                        }
                    }
                    return null;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },

        }),
        CredentialsProvider({
            id: "guest-credentials",
            name: "Guest",
            credentials: {},
            async authorize() {
                // Create a guest user with a unique identifier
                const guestUser = {
                    id: "guest_" + Math.random().toString(36).substring(2, 15),
                    name: "Guest",
                    role: "guest",
                };
                return guestUser;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
};
