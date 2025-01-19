"use client";


import Hero from "@/components/layout/landing/Hero"
import Contact from "@/components/layout/landing/Contact"
import Content from "@/components/layout/Content"

import BlogMenu from "@/components/layout/blog/BlogMenu";




export default function LandingPage() {

    return (
        <>
            <div className="w-full text-white">

                <Content />
                <BlogMenu />
         



            </div >
        </>
    );
}
