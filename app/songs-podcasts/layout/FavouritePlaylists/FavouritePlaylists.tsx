"use client";

import style from "./FavouritePlaylists.module.css";

import siteLogo from "@/public/images/midal-logo.jpg";
import { Song } from "@/types/Song";
import Image from "next/image";

import gramophoneImage from "@/public/images/record-1.png";

interface FavouritePlaylistsProps {
    listeningSong: Song | undefined;
}

const FavouritePlaylists = ({
    listeningSong,
}: FavouritePlaylistsProps) => {



    return (
        <aside className={style['fav-playlist-container']}>
            <div className={style['title-logo-container']}>
                <span className={style['another-black-shadow']}></span>
                <Image
                    className={style['site-logo']}
                    src={siteLogo}
                    alt="siteLogo"
                />
                <h1>MIDAL</h1>
            </div>

            {listeningSong && (
                <section className={style['listening-song-container']}>
                    <Image
                        className={style['listening-song-image']}
                        src={listeningSong.highThumbnailUrl ? listeningSong.highThumbnailUrl : "#"}
                        width={200}
                        height={200}
                        alt="listening-song-image"
                    />

                    <h3 className={style['listening-song-title']}>
                        {listeningSong.title.length > 75
                            ? listeningSong.title.substring(0, 75) + ".."
                            : listeningSong.title}
                    </h3>

                    <div className={style['music-notes']}>
                        <span>♪</span>
                        <span>♪</span>
                        <span>♬</span>
                        <span>♬</span>
                        <span>♫</span>
                        <span>♫</span>
                    </div>
                </section>
            )}


        </aside>
    );
};

export default FavouritePlaylists;