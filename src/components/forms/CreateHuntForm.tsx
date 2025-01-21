"use client"
import { fetchApi } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CreateHuntForm() {
    const { data } = useSession();
    const user_id = data?.user?.id;



    const [huntData, setHuntData] = useState({
        max_guests: 5,
        max_teams: 4,
        user_id: user_id || ""
    });

    /* console.log(typeof (user_id)) */


    useEffect(() => {
        if (user_id) {
            setHuntData((prevState) => ({
                ...prevState,
                user_id,
            }));
        }
    }, [user_id]);

    useEffect(() => {
        console.log("huntData", huntData)
    }, [huntData])

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHuntData({ ...huntData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simule une requête API
        await fetchApi("hunt", {
            method: "POST",
            body: huntData,
        }).then(() => {
            alert("Chasse au trésor créée avec succès !");
        }).catch((errorMessage: string) => {
            setError(errorMessage);
        });

        // Réinitialise le formulaire après soumission
        setHuntData({
            max_guests: 5,
            max_teams: 4,
            user_id
        });
    };

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Créer une chasse au trésor
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="max_guests"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre maximum d&apos;invités par équipe
                        </label>
                        <input
                            type="number"
                            name="max_guests"
                            id="max_guests"
                            value={huntData.max_guests}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nombre maximum d'invités"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="max_teams"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre maximum d&apos;équipes
                        </label>
                        <input
                            type="number"
                            name="max_teams"
                            id="max_teams"
                            value={huntData.max_teams}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nombre maximum d'équipes"
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
                        S&apos;inscrire
                    </button>
                </form>
            </div>
        </div>
    );
}
