"use client";

import { useState } from "react";
import styles from "./OrderSong.module.css";
import axios from "axios";

export default function OrderSong() {
    const [song, setSong] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!song.trim()) return;

        setLoading(true);
        setMessage("");
        
        try {
            axios.post(`http://localhost:1000/songs/create/${song}`);

            setTimeout(() => {
                setMessage("✅ Песента беше поръчана успешно и започна добавяне на резултати!");
            }, 2000);

        } catch (err) {
            setMessage("⚠️ Сървърът не отговаря.");
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Поръчай песен</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Въведи песен..."
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
