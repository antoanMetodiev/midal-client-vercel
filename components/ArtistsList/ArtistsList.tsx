import { Artist } from "@/types/Artist";
import style from "./ArtistsList.module.css";

import ArtistCard from "../ArtistCard/ArtistCard";

interface ArtistsListProps {
    artists: Artist[];
};

const ArtistsList = ({
    artists,
}: ArtistsListProps) => {


    return (
        <div className={style['artists-list-container']}>
            {artists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );
};

export default ArtistsList;