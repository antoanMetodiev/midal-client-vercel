"use client"

import style from "./SongsPodcasts.module.css";

import backImage from "@/public/images/background.jpg";
import searchButton from "@/public/images/search-button.png";
import planetImg from "@/public/images/planet.png";
import Image from "next/image";

import FavouritePlaylists from "./FavouritePlaylists/FavouritePlaylists";
import SongsList from "./SongsList/SongsList";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { useEffect, useRef, useState } from "react";
import { SongActions } from "@/actions/song-actions";
import { Song } from "@/types/Song";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const SongsPodcasts = () => {
    const [searchText, setSearchText] = useState("");
    const [videos, setVideos] = useState<Song[]>([])
    const [listeningSong, setListeningSong] = useState<Song | undefined>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const formRef = useRef<HTMLFormElement | null>(null);

    const fetchSongsByTitle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("songTitle") as string;
        setSearchText(title);
        console.log(title);

        try {
            const videos = await SongActions.findByTitle(title)
            console.log(videos);
            setVideos(videos);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        if (searchText != "") return; 

        const fetchSongs = async () => {
            try {
                setVideos((await SongActions.getRandom50()));
            } catch (err) {
                console.error(err);
            };
        };

        fetchSongs();
    }, [searchText]);

    return (
        <>
            <article className={style['songs-podcasts-container']}>
                <span className={style['black-shadow']}></span>
                <Image
                    className={style['back-image']}
                    src={backImage}
                    alt="backImage-monkey"
                />

                <article className={style['content-and-searchEngine-container']}>
                    <div>
                        <section
                            className={style['options-container']}
                        >
                            <h3>Songs</h3>
                            <h3>Profiles</h3>
                            <h3>Acount</h3>
                            <Link href="/order-songs" rel="noopener noreferrer" className={style['order-link']}>
                                Order
                            </Link>

                            <Image
                                src={planetImg}
                                alt="show"
                                className={style['more-options-img']}
                            />

                            <Link href="https://www.linkedin.com/in/antoan-metodiev-875518303" target="_blank" rel="noopener noreferrer" className={style['linkedin-icon']}>
                                <FaLinkedin size={33} />
                            </Link>
                        </section>

                        <span className={style['white-border-radius-wrapper-container']}></span>
                        <form
                            ref={formRef}
                            onSubmit={fetchSongsByTitle}
                            className={style['search-form']}
                        >
                            <input
                                className={style['search-engine']}
                                type="text"
                                placeholder="Търси.."
                                name="songTitle"
                            />

                            <Image
                                className={style['search-button']}
                                onClick={() => {
                                    formRef.current?.requestSubmit();
                                }}
                                src={searchButton}
                                alt="searchButton"
                                width={24}
                                height={24}
                            />
                        </form>
                    </div>

                    <SongsList
                        videos={videos}
                        setListeningSong={setListeningSong}
                        setCurrentIndex={setCurrentIndex}
                    />

                    {listeningSong && (
                        <AudioPlayer
                            videos={videos}
                            listeningSong={listeningSong}
                            setListeningSong={setListeningSong}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                        />
                    )}
                </article>

                <FavouritePlaylists listeningSong={listeningSong} />
            </article>
        </>
    );
}

export default SongsPodcasts;