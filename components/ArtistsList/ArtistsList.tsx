import { Artist } from "@/types/Artist";
import style from "./ArtistsList.module.css";

import ArtistCard from "../ArtistCard/ArtistCard";
import { Spinner } from "../Spinner/Spinner";

interface ArtistsListProps {
    artists: Artist[];
};

const ArtistsList = ({
    artists,
}: ArtistsListProps) => {


    return (
        <div className={style['artists-list-container']}>
            {artists.length > 0 ? artists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
            )) : (
                <Spinner />
            )}
        </div>
    );
};

export default ArtistsList;