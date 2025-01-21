"use client";


import Hero from "@/components/layout/landing/Hero"
import Contact from "@/components/layout/landing/Contact"
import Content from "@/components/layout/Content"
import { useState } from "react"



export default function LandingPage() {
    return (
        <>
            <div className="w-full text-white bg-background">

                <Hero />
                <Content />
                <Contact />


            </div >
        </>
    );
}
