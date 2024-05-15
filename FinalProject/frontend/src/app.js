
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Note from './view/Note'
import Calendar from './view/Calendar';
import Timer from './components/Timer';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function App() {

  console.log("APP!!!!!");

  if (window.navigator.onLine) {
    console.log("online")
  }
  else {
    console.log("offline")
  }

  const [droppedItem,setDroppedItem] = useState();

  //state reference for dragging
  const [isDraggingFromNote, setIsDraggingFromNote] = useState(false);
  const [timersChanged, setTimersChanged] = useState(0);

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(-1);


  fetch('/api/users/current').then(res => res.json()).then(user => {
    console.log("App Current user", user)
    if (user.error) {
      navigate('/');
    }
    else {
      setCurrentUser(user.id);
    }
  });

  if (currentUser == -1 ) {
    navigate('/');
  }

  return (
    <div className="App">
      <Note setDroppedItem={setDroppedItem} setIsDraggingFromNote={setIsDraggingFromNote} timersChanged={timersChanged}/>
      <div className='sideWrapper'>
        <div className="side">
          <div>
            <Timer userId={currentUser} setTimersChanged={setTimersChanged}/>
          </div>
          <Calendar setDroppedItem={setDroppedItem} droppedItem={droppedItem} isDraggingFromNote={isDraggingFromNote} setIsDraggingFromNote={setIsDraggingFromNote}/>
        </div>
      </div>

    </div>
  );
}

export default App;
