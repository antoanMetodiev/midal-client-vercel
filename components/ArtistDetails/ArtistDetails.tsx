"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Artist } from "@/types/Artist";
import style from "./ArtistDetails.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getById } from "@/actions/artist-actions";

import Slider from "react-slick";

interface ArtistDetailsProps {
    id: string;
}

const ArtistDetails = ({ id }: ArtistDetailsProps) => {
    const [artist, setArtist] = useState<Artist | null>(null);

    useEffect(() => {
        const fetchArtist = async () => {
            setArtist(await getById(id));
        };
        fetchArtist();
    }, [id]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 4,
        arrows: true,
    };

    return (
        <section className={style["artist-details"]}>
            {artist && (
                <>
                    {/* Background */}
                    <div className={style["artist-background"]}>
                        <Image
                            src={artist.backgrounds ? artist.backgrounds[0] : "#"}
                            alt={artist.name}
                            fill
                            priority
                            className={style["artist-bg-image"]}
                        />
                        <div className={style["artist-bg-overlay"]} />
                    </div>

                    {/* Main content */}
                    <div className={style["artist-content"]}>
                        <div className={style["artist-avatar-wrapper"]}>
                            <Image
                                src={artist.thumbnails ? artist.thumbnails[0] : "#"}
                                alt={artist.name}
                                width={200}
                                height={200}
                                className={style["artist-avatar"]}
                            />
                        </div>

                        <div className={style["artist-info"]}>
                            <h1 className={style["artist-name"]}>{artist.name}</h1>
                            <div className={style["artist-meta"]}>
                                {artist.country && <span>🌍 {artist.country}</span>}
                                {artist.year_formed && <span>🎵 Since {artist.year_formed}</span>}
                                {artist.gender && <span>👤 {artist.gender}</span>}
                            </div>
                            {artist.summary && (
                                <p className={style["artist-summary"]}>
                                    {artist.summary.length > 500 ? artist.summary.substring(0, 500) + ".." : artist.summary}
                                </p>
                            )}

                            <div className={style["artist-actions"]}>
                                <button className={style["btn-play"]}>▶ Play</button>
                                <button className={style["btn-follow"]}>+ Follow</button>
                            </div>
                        </div>
                    </div>

                    {/* Gallery carousel */}
                    {artist.thumbnails && artist.thumbnails.length > 1 && (
                        <div className={style["artist-gallery"]}>
                            <Slider {...sliderSettings}>
                                {artist.thumbnails.map((thumb, i) => (
                                    <div key={i}>
                                        <Image
                                            src={thumb}
                                            alt={`${artist.name} ${i}`}
                                            width={120}
                                            height={120}
                                            className={style["gallery-thumb"]}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}

                    {/* Footer meta */}
                    <div className={style["artist-footer"]}>
                        <span>MBID: {artist.mb_id}</span>
                        {artist.lastUpdated && (
                            <span>
                                Last Updated: {new Date(artist.lastUpdated).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default ArtistDetails;
