import {
    Link
  } from "react-router-dom";
  
export const Table = ({data}) => {
    return (
        <table className='table'>
            <tbody>
            {
                data.map(song => (
                    <tr key={song?.trackId}>
                        <td><img src={song?.artworkUrl60} loading='lazy' alt={`${song?.artistName} - ${song?.trackName}`} /></td>
                        <td>{song?.artistName}</td>
                        <td>{song?.trackName}</td>
                        <td className='table__details'><Link to={`/${song?.trackId}`}>Details</Link></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}