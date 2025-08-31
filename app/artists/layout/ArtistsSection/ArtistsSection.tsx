"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./ArtistsSection.module.css";
import upBackround from "@/public/images/artists-section-up-background.jpg";
import ArtistsList from "../../../../components/ArtistsList/ArtistsList";
import { Artist } from "@/types/Artist";
import { getArtists } from "@/actions/artist-actions";
import ArtistSearchEngine from "@/components/ArtistSearchEngine/ArtistSearchEngine";

const ArtistsSection = () => {
    const [artists, setArtists] = useState<Artist[] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArtists();
                setArtists(data);
            } catch (err) {
                console.error("Error fetching artists:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={style["artists-section-main-container"]}>
            <div className={style['up-backround-image-wrapper']}>
                
                <ArtistSearchEngine artists={artists} setArtists={setArtists} />

                <span className={style['up-backround-image-shadow']}></span>
                <Image
                    className={style["up-backround-image"]}
                    src={upBackround}
                    alt="up-background"
                />
            </div>

            {/* {loading && <p>Loading artists...</p>} */}
            
            {artists && <ArtistsList artists={artists} />}
        </section>
    );
};

export default ArtistsSection;
