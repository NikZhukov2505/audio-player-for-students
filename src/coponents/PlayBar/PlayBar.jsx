import React, { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../../Context/AudioContext';
import s from './PlayBar.module.scss'
import { IconButton, Slider } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';


const TimeControls = () => {
    const { audio, currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext)

    const { duration } = currentTrack

    const [currentTime, setCurrentTime] = useState(0)

    // Корректное пройденное время
    const formattedCurrentTime = secondsToMMSS(currentTime)

    // Движение слайдера
    const sliderCurrentTime = Math.round((currentTime / duration) * 100)

    // Функция для перемотки
    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration)
        setCurrentTime(time)
        audio.currentTime = time
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider
                value={sliderCurrentTime}
                onChange={handleChangeCurrentTime}
                step={1}
                min={0}
                max={100} />
        </>
    )
}

const PlayBar = () => {
    const { audio, currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext)
    // const [currentTime, setCurrentTime] = useState(0)
    const { title, artists, preview, duration } = currentTrack

    const formattedDuration = secondsToMMSS(duration)
    // // Корректное пройденное время
    // const formattedCurrentTime = secondsToMMSS(currentTime)

    // // Движение слайдера
    // const sliderCurrentTime = Math.round((currentTime / duration) * 100)

    // // Функция для перемотки
    // const handleChangeCurrentTime = (_, value) => {
    //     const time = Math.round((value / duration) * 100)
    //     setCurrentTime(time)
    //     audio.currentTime = time
    // }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentTime(audio.currentTime)
    //     }, 1000)

    //     return () => clearInterval(timer)
    // }, [])
    // 

    return (
        <>
            {
                Object.keys(currentTrack).length > 0 &&
                <div className={s.playbar}>
                    <img className={s.preview} src={preview} alt={title} />
                    <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <div className={s.credits}>
                        <h4>{title}</h4>
                        <p>{artists}</p>
                    </div>
                    <div className={s.slider}>
                        {/* <p>{formattedCurrentTime}</p>
                        <Slider
                            value={sliderCurrentTime}
                            onChange={handleChangeCurrentTime}
                            step={1}
                            min={0}
                            max={100} /> */}
                        {/* Для оптимизации переносим в отдельную компоненту */}
                        <TimeControls />
                        <p>{formattedDuration}</p>
                    </div>
                </div>
            }
        </>
    );
};

export default PlayBar;