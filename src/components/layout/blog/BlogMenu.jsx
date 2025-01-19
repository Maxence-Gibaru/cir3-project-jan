import React, { useEffect, useState } from "react"
import { fetchApi } from "@/lib/api";
import BoxCard from "@/components/ui/BoxCard";


export default function BlogMenu() {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetchApi("comments");
                setComments(response.message);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        };

        fetchComments();
    }, []);
    return (
        <>
            <section className="h-screen bg-boldBlue flex text-white">
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="text-3xl uppercase font-bold">BlogMenu</h1>

                    <div className="overflow-auto">
                        {comments.slice(0, 5).map((comment, index) => (
                            <BoxCard key={index} content={comment} />
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}