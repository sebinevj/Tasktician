import "./Timers.css";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';


export default function TimersTab(props) {

    const {timersChanged} = props;

    const [timers, setTimers] = useState([]);
    const [currentUser, setCurrentUser] = useState(-1)

    fetch('/api/users/current').then(res => res.json()).then(user => {
        setCurrentUser(user.id);
    }).catch(err => {
        console.log(err)
    })

    useEffect(() => {
        if (currentUser != -1) {    
        fetch(`/api/timers/${currentUser}`)
            .then(res => res.json())
            .then(function(data){
                console.log("timer data is..", data);
                if (data.error) {
                    console.log("error")
                }
                else {
                    setTimers(data.timers);
                }
            });
        }
    },[currentUser, timersChanged]);

    let timerList = [];

    if (timers.length > 0) {
        timers.forEach((timer, index) => {
            // Convert timer start and end times into Date objects.
            const startTime = new Date(timer.start_time);
            const endTime = new Date(timer.end_time);

            // Get the timer duration in milliseconds.
            const durationMs = endTime - startTime;

            // Calculate hours, minutes, and seconds
            const hours = Math.floor(durationMs / 3600000);
            const minutes = Math.floor((durationMs % 3600000) / 60000);
            const seconds = Math.floor((durationMs % 60000) / 1000);
        
            // Format the duration as HH:MM:SS.
            const duration = `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            timerList.push(
                <ListGroup.Item key={index}>
                    <div className="timer">
                        <div className="duration">Duration: {duration}</div>
                        <div className="span">Started: {startTime.toLocaleString('en-US', { timeZone: 'UTC' })}</div>
                        <div className="span">Ended: {endTime.toLocaleString('en-US', { timeZone: 'UTC' })}</div>
                    </div>
                </ListGroup.Item>
            );
        });
    }
    else {
        timerList.push(
            <ListGroup.Item key={0}>
                {"No timers set"}
            </ListGroup.Item>
        );

    }


    return (
        <div className="timers">
            <h3>Recent Timers</h3>
            <ListGroup as="ol" variant="flush" className="active-timers">
                {timerList}
            </ListGroup>
        </div>
        );
}