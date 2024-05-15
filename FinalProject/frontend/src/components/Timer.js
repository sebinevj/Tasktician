import "./Timer.css";
import {useState, useEffect} from 'react';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import Alert from 'react-bootstrap/Alert';

export default function Timer(props) {

    const {userId, setTimersChanged} = props;

    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const [online, setOnline] = useState(window.navigator.onLine)
    console.log(online)

    let timer;

    useEffect(() => {
        window.addEventListener("online", () => setOnline(true))
        window.addEventListener("offline", () => setOnline(false))
      }, [])

    useEffect(() => {
        if (isRunning) {
          timer = setInterval(() => setTime(time => time + 1), 1000);
        }
        return () => clearInterval(timer);
      }, [isRunning, time]);


    useEffect(() => {

        console.log(endTime);
        console.log(startTime);
        console.log(online);
        
        if ( online && endTime > 0 && startTime > 0) {
            setTimersChanged(t => t + 1);
            
            fetch(`/api/timers/${userId}`, {
                method: 'POST',
                body: JSON.stringify({start_time:startTime.toISOString().slice(0, 19).replace('T', ' '), end_time:endTime.toISOString().slice(0, 19).replace('T', ' ')}),
                headers: {
                    'Content-Type': 'application/json',
                  },
                }).then(timer => {
                  console.log(timer)
          
              }).catch(err => {
                console.log(err);
              })
        }

    }, [startTime, endTime])
    
    //hours
    const hours = Math.floor(time / 3600);

    // Minutes calculation
    const minutes = Math.floor((time / 60)) % 60;

    const seconds = Math.floor((time % 60));


    const playHandler = () => {
        if (time == 0) {
            setStartTime(new Date());
        }
        setRunning(true);
    }

    const pauseHandler = () => {
        setRunning(false);
        console.log("in stop", isRunning, time, seconds, minutes)
    }

    const stopHandler = () => {
        setEndTime(new Date());
        clearInterval(timer);
        setRunning(false);
        setTime(0);
    }

    return (
        <div className="container">
            <div className="timer-container">
                <h1>{hours<10? "0"+hours: hours}:{minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+seconds: seconds}</h1>
            </div>
            {isRunning == false && <IconButton onClick={playHandler}>
                <PlayArrowIcon />
            </IconButton>}
            {isRunning == true && <IconButton onClick={pauseHandler}>
                <PauseIcon />
            </IconButton>}
            <IconButton onClick={stopHandler}>
                <StopIcon />
            </IconButton>
            {!online && 
            <div id="alert">
                Timers will not be saved unless you are online. 
            </div>}
            
        </div>
    )


}