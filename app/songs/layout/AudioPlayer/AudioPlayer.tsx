"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./AudioPlayer.module.css";
import Image from "next/image";
import playIcon from "@/public/images/play.png";
import pauseIcon from "@/public/images/pause.png";
import leftIcon from "@/public/images/right.png";
import rightIcon from "@/public/images/right.png";
import { Song } from "@/types/Song";

interface AudioPlayerProps {
    videos: Song[];
    listeningSong?: Song;
    setListeningSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
    currentIndex: number
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    videos,
    listeningSong,
    setListeningSong,
    currentIndex,
    setCurrentIndex
}) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const ytPlayerRef = useRef<YT.Player | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);

    // Когато подадеш listeningSong отвън, намираме индекса му в масива
    useEffect(() => {
        if (listeningSong) {
            const idx = videos.findIndex((v) => v.id === listeningSong.id);
            if (idx !== -1) setCurrentIndex(idx);
        }
    }, [listeningSong, videos]);

    // Зареждаме YouTube player
    useEffect(() => {
        debugger;
        if (typeof window === "undefined") return;

        const loadPlayer = () => {
            if (!playerRef.current || !videos[currentIndex]?.videoId) return;

            setListeningSong(videos[currentIndex]);
            ytPlayerRef.current = new window.YT.Player(playerRef.current, {
                videoId: videos[currentIndex].videoId,
                height: "0",
                width: "0",
                playerVars: { autoplay: 1, controls: 0, cc_load_policy: 0 },
                events: {
                    onReady: (event) => {
                        event.target.setVolume(volume);
                        setDuration(event.target.getDuration());
                        setIsPlaying(true);
                    },
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            handleNext(); // автоматично следваща песен
                        }
                    },
                },
            });
        };

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            (window as any).onYouTubeIframeAPIReady = loadPlayer;
        } else {
            loadPlayer();
        }

        return () => ytPlayerRef.current?.destroy();

    }, [currentIndex, listeningSong]);

    // Play / Pause
    const togglePlay = () => {
        if (!ytPlayerRef.current) return;
        const state = ytPlayerRef.current.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            ytPlayerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
        }
    };

    // Volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(e.target.value);
        setVolume(newVol);
        ytPlayerRef.current?.setVolume(newVol);
    };

    // Seek
    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        setSeek(time);
        ytPlayerRef.current?.seekTo(time, true);
    };

    // Следваща песен
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    // Предишна песен
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    // Обновяване на seek/duration
    useEffect(() => {
        const interval = setInterval(() => {
            if (ytPlayerRef.current && isPlaying) {
                setSeek(ytPlayerRef.current.getCurrentTime());
                setDuration(ytPlayerRef.current.getDuration());
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className={style.miniPlayer}>
            <div ref={playerRef}></div>

            <div className={style.info}>
                <div className={style.controls}>
                    <Image
                        src={leftIcon}
                        alt="prev"
                        className={style['left-icon']}
                        onClick={handlePrev}
                    />
                    <Image
                        src={isPlaying ? pauseIcon : playIcon}
                        alt="play"
                        className={style.icon}
                        onClick={togglePlay}
                    />
                    <Image
                        src={rightIcon}
                        alt="next"
                        className={style.icon}
                        onClick={handleNext}
                    />
                </div>

                <div className={style.sliders}>
                    <span className={style.time}>
                        {Math.floor(seek / 60)}:{("0" + Math.floor(seek % 60)).slice(-2)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={seek}
                        onChange={handleSeekChange}
                        className={style.seek}
                        style={
                            { "--seek-percent": `${(seek / duration) * 100}%` } as React.CSSProperties
                        }
                    />
                    <span className={style.time}>
                        {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={handleVolumeChange}
                        className={style.volume}
                        style={{ "--volume-percent": `${volume}%` } as React.CSSProperties}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
