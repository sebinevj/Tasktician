import "./Note.css";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TimersTab from '../components/Timers.js'
import TabContent from 'react-bootstrap/TabContent'
import ProgressTab from "../components/Progress.js";
import TodoTab from "../components/Todo.js";
import ProfileTab from "../components/Profile.js";


export default function Note({setDroppedItem, setIsDraggingFromNote, timersChanged}) {
  const [key, setKey] = useState('todo');

  return (
    <div className="note">
        <Tabs
        id="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="tabs"
        >
        <Tab eventKey="todo" title="To-Do Items" id="todo">
            <TodoTab  setDroppedItem={setDroppedItem} setIsDraggingFromNote={setIsDraggingFromNote}/>
        </Tab>
        <Tab eventKey="progress" title="Weekly Progress" id="progress">
            <ProgressTab/>
        </Tab>
        <Tab eventKey="timers" title="Timers" id="timers">
            <TimersTab timersChanged={timersChanged}/>
        </Tab>
        <Tab eventKey="profile" title="Profile" id="profile">
            <ProfileTab/>
        </Tab>
        </Tabs>
    </div>
  );
}

