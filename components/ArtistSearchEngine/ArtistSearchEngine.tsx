"use client";

import { useState, useEffect } from "react";
import style from "./ArtistSearchEngine.module.css";
import { findByTitle, getArtists } from "@/actions/artist-actions";
import { Artist } from "@/types/Artist";

interface ArtistSearchEngineProps {
    artists: Artist[];
    setArtists: React.Dispatch<React.SetStateAction<Artist[] | []>>;
}

const ArtistSearchEngine = ({
    artists,
    setArtists,
}: ArtistSearchEngineProps) => {
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await findByTitle(query);
                console.log(response);
                console.log(response.length > 0);
                if (response.length) setArtists(response);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            };
        };

        if (query.trim()) {
            fetchData();
        } else {
            const findAll = async () => await setArtists(await getArtists());
            findAll();
        };

    }, [query]);

    return (
        <div className={style["search-container"]}>
            <input
                type="text"
                placeholder="Search artists..."
                className={style["search-input"]}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <div className={style["loading"]}>Loading...</div>}

            {/* {artists.length > 0 && (
                <div className={style["results-container"]}>
                    {artists.map((artist) => (
                        <div key={artist.id || artist.mb_id} className={style["artist-card"]}>
                            {artist.thumbnails?.[0] ? (
                                <img src={artist.thumbnails[0]} alt={artist.name} className={style["artist-thumb"]} />
                            ) : (
                                <div className={style["artist-thumb-placeholder"]} />
                            )}
                            <span className={style["artist-name"]}>{artist.name}</span>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default ArtistSearchEngine;
