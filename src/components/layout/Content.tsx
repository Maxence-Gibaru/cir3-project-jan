import React, { useState } from "react"

export default function Content() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section className="h-screen bg-vibrantPlum flex">
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="text-3xl uppercase font-bold">Content</h1>
                </div>
            </section>
        </>
    );
}