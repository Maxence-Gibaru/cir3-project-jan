"use client"
import { fetchApi, FetchOptions } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });


    const { data: session } = useSession();

    if (session) {
        console.log("session : ", session);
    }

    const router = useRouter();

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };


    const handleLogin = async () => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
                callbackUrl: "/",
            });
            router.push(result.url);
            /*  if (result?.error) {
                 setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
             } else {
                 router.push("/");
             } */
            /*  const response = await fetchApi('auth/signin', options)
             console.log("Login :" + response);
 
             if (response.loggedIn) {
                 console.log('Connexion réussie !');
                 router.push("/")
                 // Effectuer des actions supplémentaires en cas de succès
             } else {
 
                 console.log('Échec de la connexion.');
                 // Gérer les cas d'échec de connexion
             } */

        }
        catch (error) {
            console.error("Error register", error);
        }
    }





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simule une requête API
        console.log("Form data submitted:", loginData);

        // Réinitialise le formulaire après soumission
        setLoginData({
            email: "",
            password: "",
        });



        handleLogin();


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <button onClick={() => {
                signOut({ redirect: false, callbackUrl: '/' })
            }}>Logout</button>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Connectez vous à votre compte
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="exemple@email.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <p className="mb-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-gray-700 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        S'inscrire

                    </button>
                </form>
            </div>
        </div >
    );
}
