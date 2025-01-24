"use client";
import Modal from "@/components/ui/InfoModal";
import { fetchApi } from "@/lib/api";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import "./wait.css";


export default function WinScreen({ team_time, treasure_position, team }) {

    return (
        <div className="h-screen flex flex-col justify-center items-center uppercase text-xl font-bold tracking-[0.5rem]">
            <p>You Win</p>

        </div>
    );
}