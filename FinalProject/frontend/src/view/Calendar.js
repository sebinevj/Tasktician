import "./Calendar.css";
import {useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Day from "../components/Day";

export default function Calendar({currentUser, setDroppedItem, droppedItem, isDraggingFromNote, setIsDraggingFromNote}) {

  const dateRendered = useRef(false);


  const [days, setDays] = useState([
   
    {"date": 11, "day": "monday"},
    {"date": 12, "day": "tuesday"},
    {"date": 13, "day": "wednesday"},
    {"date": 14, "day": "thursday"},
    {"date": 15, "day": "friday"},
    {"date": 16, "day": "saturday"},
    {"date": 17, "day": "sunday"}
  ]);

  useEffect(()=>{
    updateDays(new Date());
    
  },[])

  

  const updateDays = (startDate) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const newDays = Array.from({ length: 7 }, (_, index) => {
      const futureDate = new Date(startDate);
      futureDate.setDate(startDate.getDate() + index); // Set the date to start date + index
      return {
        date: futureDate.getDate(), // Get the date of the month for the future date
        day: daysOfWeek[futureDate.getDay()] // Get the day name
      };
    });

    setDays(newDays);
  };



  function nextWeekHandler(){
    // Get current date
    const startDate = new Date(); 
    // Set it to the first date in the days array
    startDate.setDate(days[0].date); 
    // Move the date 7 days forward
    startDate.setDate(startDate.getDate() + 7); 
  
    updateDays(startDate);
  }


  return (

    <div className="calendar">

    
    {days.map((dayInfo, index) => (
      <Day key={index} index={index} date={dayInfo.date} 
      day={dayInfo.day} setDroppedItem={setDroppedItem} 
      droppedItem={droppedItem} isDraggingFromNote={isDraggingFromNote} 
      setIsDraggingFromNote={setIsDraggingFromNote}
      nextWeekHandler={nextWeekHandler}
      />
    ))}

  </div>
  );
  
}