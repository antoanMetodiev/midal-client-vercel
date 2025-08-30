"use client";

import { useState } from "react";
import { SearchEngine } from "./SearchEngine/SearchEngine";
import style from "./OrderEngine.module.css";

export const OrderEngine = () => {
    const [messageText, setMessageText] = useState(
        "Напишете името на изпълнител, който искате да бъде добавен!"
    );

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h1 className={style.title}>Order Artists</h1>

                <div className={style.searchWrapper}>
                    <SearchEngine
                        setMessageText={setMessageText}
                        setIsLoading={() => {}}
                    />
                </div>

                <h3 className={style.messageText}>{messageText}</h3>
            </div>
        </div>
    );
};