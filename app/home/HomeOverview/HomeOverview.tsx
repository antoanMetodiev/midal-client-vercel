import style from "./HomeOverview.module.css";
import Body from "./structure/Body/Body";
import Header from "./structure/Header/Header";

const HomeOverview = () => {


    return (
        <div className={style['overview-container']}>
            <span className={style['black-shadow']} />
            <video
                className={style['backVideo']}
                autoPlay
                loop
                muted
                src="/videos/audio-grid.mp4"
            />

            <Header />
            <Body />
        </div>
    );
};

export default HomeOverview;