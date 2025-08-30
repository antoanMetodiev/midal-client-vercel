'use client'

import style from "./CarouselPlaylist.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import allCardsData from "@/utils/overview-carousel-cards-data";
import Card from "./structure/Card";

const CarouselPlaylist = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <article className={style['carousel-Playlist-container']}>
            <div className={style['card-list']}>
                <Slider {...settings}>
                    {allCardsData.map(card => <Card key={card.text} data={card} />)}
                </Slider>
            </div>
        </article>
    );
};

export default CarouselPlaylist;