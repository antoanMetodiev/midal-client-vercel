'use client'

import Image from "next/image";

import { Song } from "@/types/Song";
import style from "./../SongsPodcasts.module.css";
import { Footer } from "@/components/Footer/Footer";
import { Spinner } from "@/components/Spinner/Spinner";
import { useEffect, useState } from "react";

interface SongsListProps {
    videos: Song[]
    setListeningSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SongsList = ({
    videos,
    setListeningSong,
    setCurrentIndex
}: SongsListProps) => {

    const [loading, setLoading] = useState(videos.length === 0);
    const [showNoResults, setShowNoResults] = useState(false);

    useEffect(() => {
        if (videos.length === 0) {
            setLoading(true);
            // const timer = setTimeout(() => {
            //     setLoading(false);
            //     setShowNoResults(true);
            // }, 10000);

            // return () => clearTimeout(timer);
        } else {
            setLoading(false);
            setShowNoResults(false);
        }
    }, [videos]);


    return (
        <div className={style['songs-list']}>
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div
                        className={style['song-container']}
                        key={video.id}
                        onClick={() => {
                            let index = -1;
                            for (let i = 0; i < videos.length; i++) {
                                if (video.id == videos[i].id) index = i;
                            }

                            setCurrentIndex(index == -1 ? Number(video.id) : index);
                            setListeningSong(video);
                        }}
                    >
                        {/* Song thumbnail */}
                        <div className={style['song-image-wrapp-container']}>
                            <span className={style['song-black-shadow']}></span>
                            <Image
                                className={style['song-image']}
                                src={video.highThumbnailUrl ?? "/fallback.png"} // fallback при липса
                                width={367}
                                height={290}
                                alt={video.title}
                            />
                        </div>

                        <h4 className={style['song-title']}>
                            {video.title.length > 75
                                ? video.title.substring(0, 75) + ".."
                                : video.title}
                        </h4>

                        <h5 className={style['published-at']}>
                            {new Date(video.publishedAt).toLocaleDateString()}
                        </h5>
                    </div>
                ))
            ) : loading ? (
                <Spinner />
            ) : showNoResults ? (
                <h3 className={style['no-results-h3']}>Няма намерени резултати.</h3>
            ) : null}

            {videos.length > 0 && <Footer />}
        </div>
    );
};

export default SongsList;
