import React, { useState } from "react"

export default function Hero() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section className="h-screen bg-deepNavy flex">
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="text-3xl uppercase font-bold">Hero</h1>
                </div>
            </section>
        </>
    );
}