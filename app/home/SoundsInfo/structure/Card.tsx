import style from "./../SoundsInfo.module.css";
import type { SoundInfo } from "@/utils/sounds-info-data";

interface CardProps {
    data: SoundInfo;
}

const Card = ({
    data,
}: CardProps) => {

    return (
        <div className={style['card-container']}>
            <div className={style['titles-container']}>
                <h2>{data.level}</h2>
                <h6
                    className={style[data.level === 'Max' ? 'max' : data.level === 'High' ? 'high' : 'low']}
                >{data.level.toUpperCase()}</h6>
                <h3>{data.upTo}</h3>
            </div>

            <span className={style['text']}>{data.text}</span>
        </div>
    );
};

export default Card;