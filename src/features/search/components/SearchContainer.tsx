"use client";
import { SearchInput } from "./SearchInput";
import { useState, useEffect } from "react";
import { ReleaseCard } from "@/features/releases/components/ReleaseCard";
import { ReleaseType } from "@/features/releases/releases.types";
import { POPULAR_RELEASES_MOCK } from "../search.mock";



export function SearchContainer() {
    const [q, setQ] = useState("");
    const [releases, setReleases] = useState<ReleaseType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    //functions
    function handleSearch(q: string, signal: AbortSignal) {
        fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal })
            .then(res => res.json())
            .then(data => {
                setReleases(data);
            })
            .catch(err => {
                console.error(err)
            })
    }

    function handleOpen() {
        setIsOpen(true);
    };

    function handleClose() {
        console.log("handleClose");
        // setIsOpen(false);
    };

    //effects
    useEffect(() => {
        const trimmed = q.trim();

        if (trimmed.length < 2) {
            setReleases([]);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(() => {
            handleSearch(trimmed, controller.signal);
        }, 220);

        //cleanup function
        return () => {
            clearTimeout(timer); 
            controller.abort();
        };
    }, [q]);

    return (
        <div>
            <SearchInput onChange={setQ} value={q} onFocus={handleOpen} />
            {/* <SearchFilters /> */}

            {isOpen && (
                (q.trim().length > 0 ? releases : POPULAR_RELEASES_MOCK).map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                ))
            )}
        </div>
    );
}