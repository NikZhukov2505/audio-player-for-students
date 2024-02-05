import React, { useContext } from 'react';
import s from './Track.module.scss'
import { IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';
import { AudioContext } from '../../Context/AudioContext';
import cn from 'classnames'


const Track = (track) => {
    const { id, preview, title, artists, duration } = track
    const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext)

    const isCurrentTrack = currentTrack.id === id

    const formattedDuration = secondsToMMSS(duration)


    return (
        <div className={cn(s.track, isCurrentTrack && s.playing)}>
            <IconButton
                onClick={() => handleToggleAudio(track)}>
                {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <img className={s.preview} src={preview} alt={title} />
            <div className={s.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{formattedDuration}</p>
        </div>
    );
};

export default Track;