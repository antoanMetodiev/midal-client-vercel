import style from "./Body.module.css";
import playlistImage from "@/public/images/playlist.png";

import Image from "next/image";

const Body = () => {

    return (
        <article className={style['wrapper']}>
            <aside className={style['aside-content-container']}>
                <h3 className={style['h3-motivation']}>Listen to your favorite songs completely <span className={style['without-advertisements']}>AD-FREE</span>.</h3>
               <p>See in <span className={style['without-advertisements']}>REAL TIME</span> what your friends are listening to and join them with the best sound!</p>
            </aside>

            <div className={style['image-container']}>
                <Image src={playlistImage} alt="songs-image" />
            </div>
        </article>
    );
}

export default Body;