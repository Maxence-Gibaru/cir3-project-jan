"use client";

import Image from "next/image";
import { Button, Avatar, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import BlogPage from "@/components/pages/BlogPage"
import { useEffect, useState } from "react"
import { fetchApi } from "@/lib/api";



/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; */


export default function HomePage() {
    const [output, setOutput] = useState("");
    const [prompt, setPrompt] = useState("");


    const options = {
        method: "POST",
        body: prompt
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetchApi('generate', options)

        const data = await response.output
        setOutput(data);
    };



    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center mx-20">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Entrez votre prompt"
                        />
                        <button type="submit">Générer</button>
                    </form>
                    <div>
                        <h2>Résultat :</h2>
                        <p>{output}</p>
                    </div>
                </div>
            </div>

        </>
    );
}
