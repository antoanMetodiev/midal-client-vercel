"use client";

import style from "./SearchEngine.module.css";
import searchInputIcon from "@/public/images/search-input.png";
import { fetchArtistsFromApi } from "@/actions/artist-actions";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SearchEngineProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setMessageText: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchEngine = ({
    setIsLoading,
    setMessageText
}: SearchEngineProps) => {
    const [inputValue, setInputValue] = useState("");
    const [canSend, setCanSend] = useState(true);
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const TIMER_DURATION = 10; // секунди

    // Зареждане от localStorage при mount
    useEffect(() => {
        const blockedUntil = localStorage.getItem("blockedUntil");
        if (blockedUntil) {
            const remaining = Math.ceil((parseInt(blockedUntil, 10) - Date.now()) / 1000);
            if (remaining > 0) startTimer(remaining);
        }
    }, []);

    const startTimer = (seconds: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        setTimer(seconds);
        setCanSend(false);

        intervalRef.current = window.setInterval(() => {
            setTimer(prev => {
                const next = prev - 1;
                if (next <= 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setCanSend(true);
                    localStorage.removeItem("blockedUntil");
                    return 0;
                }
                return next;
            });
        }, 1000);
    };

    const fetchArtists = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
        event.preventDefault();
        if (!inputValue.trim() || !canSend) return;

        setIsLoading(true);
        try {
            await fetchArtistsFromApi(inputValue);
            setMessageText("ЗАПОЧНА ДОБАВЯНЕ НА РЕЗУЛТАТИ!");

            // Записваме в localStorage кога таймерът трябва да свърши
            const unblockTime = Date.now() + TIMER_DURATION * 1000;
            localStorage.setItem("blockedUntil", unblockTime.toString());

            startTimer(TIMER_DURATION);
        } catch (err) {
            setMessageText("ВЪЗНИКНА ПРОБЛЕМ НА СЪРВЪРА, МОЛЯ ОПИТАЙТЕ ПАК ПО-КЪСНО!");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style['search-container']}>
            {!canSend && (
                <div className={style["timer"]}>
                    {timer}s
                </div>
            )}

            <form onSubmit={fetchArtists}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={style['search-engine']}
                    name="searchEngine"
                    type="text"
                    disabled={!canSend}
                />
                <button hidden></button>
            </form>

            <Image
                onClick={fetchArtists}
                className={style['searchInputIcon']}
                src={searchInputIcon}
                alt="searchInputIcon"
            />
        </div>
    );
};