"use client";


import Hero from "@/components/layout/landing/Hero"
import Contact from "@/components/layout/landing/Contact"
import Content from "@/components/layout/Content"
import { useState } from "react"
import LoginForm from "../forms/LoginForm";



export default function LoginPage() {
    return (
        <>
            <div className="w-full text-white">


                <LoginForm />

                <Content />



            </div >
        </>
    );
}
