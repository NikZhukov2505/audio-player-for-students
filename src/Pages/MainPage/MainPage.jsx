import React, { useState } from 'react';
import trackList from '../../assets/trackList'
import s from './MainPage.module.scss'
import Track from '../../coponents/Track/Track';
import { Input } from '@mui/material';

// const runSearch = (query) => {
//     if (!query) {
//         return trackList
//     }

//     const lowerCaseQuery = query.toLowerCase()

//     return trackList.filter(track =>
//         track.title.toLowerCase().includes(lowerCaseQuery) ||
//         track.artists.toLowerCase().includes(lowerCaseQuery)
//     )
// }

const MainPage = () => {
    const [tracks, setTracks] = useState(trackList)

    const handleChange = (e) => {
        // console.log(e.target.value);
        // console.log(runSearch(e.target.value));
        // setTracks(runSearch(e.target.value))
        const name = e.target.value
        if (!name) {
            return setTracks(trackList)
        }

        const lowerCaseName = name.toLowerCase()
        return setTracks(tracks.filter(track =>
            track.title.toLowerCase().includes(lowerCaseName) ||
            track.artists.toLowerCase().includes(lowerCaseName)
        ))


    }



    return (
        <div className={s.search}>
            <Input className={s.input}
                placeholder='Поиск треков'
                onChange={handleChange}
            />
            <div className={s.list}>
                {
                    tracks.map(track => <Track key={track.id} {...track} />)
                }
            </div>
        </div>
    );
};

export default MainPage;