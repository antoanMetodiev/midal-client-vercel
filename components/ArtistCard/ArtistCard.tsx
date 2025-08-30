"use client";

import style from "./ArtistCard.module.css";
import { Artist } from "@/types/Artist";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArtistCardProps {
    artist: Artist;
};

const ArtistCard = ({
    artist,
}: ArtistCardProps) => {
    const router = useRouter();


    return (
        <div
            onClick={() => router.push(`/artists/${artist.id}`)}
            className={style['artist-card-container']}
        >
            <div className={style['arist-image-wrapper']}>
                <span className={style['arist-image-shadow']}></span>
                <Image
                    className={style['arist-image']}
                    src={artist.thumbnails ? artist.thumbnails[0] : ""}
                    alt="artist-image"
                    width={200}
                    height={200}
                />
            </div>

            <h3 className={style['artist-name']}>{artist.name}</h3>
        </div>
    );
};

export default ArtistCard;