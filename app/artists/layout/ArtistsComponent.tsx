import style from "./ArtistsComponent.module.css";

import Image from "next/image";
import background from "@/public/images/artists-background.jpg";

import ArtistsSection from "./ArtistsSection/ArtistsSection";
import Link from "next/link";

const ArtistsComponent = () => {

    return (
        <article className={style['artists-main-container']}>
            <span className={style['background-shadow']}></span>
            <Image
                className={style['background-image']}
                src={background}
                alt="background"
            />

            <ArtistsSection />

            <Link
                className={style['order-button-link']}
                href={"/artists/order"}
            >
                Order
            </Link>

            <h2 className={style['last-20-artists']}>LAST 20 ARTISTS</h2>
        </article>
    );
};

export default ArtistsComponent;