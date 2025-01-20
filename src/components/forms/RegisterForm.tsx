import { fetchApi, FetchOptions } from "@/lib/api";
import { useEffect, useState } from "react";

export default function RegisterForm() {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };




    const options: FetchOptions = {
        method: "POST",
        body: signupData,
    }

    const fetchSignup = async () => {
        try {
            fetchApi('register', options)
        }
        catch (error) {
            console.error("Error register", error);
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simule une requête API
        console.log("Form data submitted:", signupData);

        // Réinitialise le formulaire après soumission
        setSignupData({
            name: "",
            email: "",
            password: "",
        });

        fetchSignup();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-midnightBlue">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Créer un compte
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nom complet
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={signupData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
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
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    );
}
