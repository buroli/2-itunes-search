import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import http from "../helpers/http"

export const DetailsTrack = () => {
    const [song, setSong] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    let { trackId } = useParams();
    const history = useHistory();
    const goBack = () => history.goBack();
;

    const handleResponse = (response) => {
        if(response?.resultCount > 0) {
            setSong(response.results[0]);
        }
    }

    useEffect(() => {
        http(`https://itunes.apple.com/search?term=${trackId}&music=musicTrack&limit=100`, handleResponse)
    }, [trackId])

    useEffect(() => {
        if( Object.keys(song).length ) {
            setIsLoaded(true);
        }
    }, [song])

    return (
        <section className='track-details'>
            <h1>iTunes Music Searcher</h1>

            <div className="panel">
                <button href="#" onClick={goBack}>Go Back</button>
            </div>

            {
                isLoaded 
                ? (<>
                    <div className='panel'>
                        <img src={song?.artworkUrl100} alt={`${song?.artistName} - ${song?.trackName}`}/>
                    </div>

                    <div className='panel'>
                        
                        <span className='meta'>{song?.artistName} - {song?.trackName}</span>

                    </div>
                    <div className='panel'>
                        <audio src={song?.previewUrl} controls></audio>
                    </div>
                </>
                )
                : <h2>Loading track details</h2>
            }
        </section>
    )
}