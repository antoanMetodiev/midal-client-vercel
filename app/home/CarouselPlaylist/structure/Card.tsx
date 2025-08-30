import Image, { StaticImageData } from "next/image";
import style from "./Card.module.css";

interface CardProps {
    data: {
        image: StaticImageData,
        title: string,
        text: string,
    },

};

const Card = ({
    data,

}: CardProps) => {



    return (
        <div className={style['card']}>
            <Image
                className={style['carousel-image']}
                src={data.image}
                alt="carousel-image"
            />

            <section className={style['card-content']}>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
            </section>
        </div>
    );
};

export default Card;