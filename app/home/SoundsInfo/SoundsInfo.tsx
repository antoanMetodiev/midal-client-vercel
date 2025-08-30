import style from "./SoundsInfo.module.css";
import backImage from "@/public/images/monkey.png";

import soundsInfoData from "@/utils/sounds-info-data";
import Card from "./structure/Card";
import Image from "next/image";

const SoundsInfo = () => {


    return (
        <article className={style['sounds-info-container']}>
            <span className={style['black-shadow']} />
            <Image
                className={style['backImage']}
                src={backImage}
                alt="backImage"
            />

            <h2 className={style['sounds-info-container_title']}>Powerful Sound For Any Purpose.</h2>

            <div className={style['content']}>
                {soundsInfoData.map(soundInfo => <Card key={soundInfo.text} data={soundInfo} />)}
            </div>
        </article>
    );
};

export default SoundsInfo;