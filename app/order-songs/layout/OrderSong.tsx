"use client";

import { useState } from "react";
import styles from "./OrderSong.module.css";
import { SongActions } from "@/actions/song-actions";

export default function OrderSong() {
    const [song, setSong] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Ако въведете името на изпълнител, в базата данни ще се запазят различни негови песни!");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!song.trim()) return;

        setLoading(true);
        setMessage("");

        try {
            const isCreated = await SongActions.createSongsFromApi(song);
            if (isCreated) {
                setTimeout(() => {
                    setMessage("✅ Песента беше поръчана успешно и започна добавяне на резултати!");
                }, 1000);
            } else {
                setMessage("⚠️ Сървърът не отговаря.");
            }

        } catch (err) {
            setMessage("⚠️ Сървърът не отговаря.");
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Въведете изпълнител или песен!</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Въведете.."
                        value={song}
                        onChange={(e) => setSong(e.target.value)}
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.button}
                    >
                        {loading ? "..." : "🔍"}
                    </button>
                </form>

                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
}
