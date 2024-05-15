
import "./Progress.css";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import ProgressBar from 'react-bootstrap/ProgressBar'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Alert from 'react-bootstrap/Alert';


export default function ProgressTab() {

  const navigate = useNavigate()

  const [goals, setGoals] = useState([]);
  const [points, setPoints] = useState(0);
  const [studyGoal, setStudyGoal] = useState(0);
  const [studied, setHoursStudied] = useState(0);
  const [goalsChanged, setGoalsChanged] = useState(0)
  const [currentUser, setCurrentUser] = useState(-1);
  const [checked, setChecked] = useState([0]);
  const [addComponent, setAddComponent] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [online, setOnline] = useState(window.navigator.onLine)

  fetch('/api/users/current').then(res => res.json()).then(user => {
    if (user.error) {
      navigate('/');
    }
    setCurrentUser(user.id);
  }).catch(err => {
    console.log(err)
  })

  useEffect(() => {
    window.addEventListener("online", () => setOnline(true))
    window.addEventListener("offline", () => setOnline(false))
  }, [])

  useEffect(() => {

    if (currentUser != -1) {
      fetch(`/api/progress/${currentUser}`)
        .then(res => res.json())
        .then(function(data){
            console.log("progress data is..", data);
            if (data.error) {
              console.log(data.error)
            }
            else {
              setGoals(data.goals);
              setPoints(data.points);
              setHoursStudied(data.hours_studied);
              setStudyGoal(data.study_goal);
            }
        });
      }
  },[currentUser, goalsChanged]);

  useEffect(() => {
    if (online) {
      fetch(`/api/progress/${currentUser}`, {
        method: 'PUT',
        body: JSON.stringify({studied: studied, studyGoal: studyGoal, points: points}),
        headers: {
            'Content-Type': 'application/json',
          },
        }).then((data) => {
          console.log("NEW PROGRESS", data)
      }).catch(err => {
        console.log(err);
      })
    }
  }, [studied, studyGoal, points])

  let now = 1;
  if (studied != 0 && studyGoal != 0) {
    now = Math.floor((studied/studyGoal) * 100);
  }

  const closeHandler = (index, goalid) => () => {
    if (!online) {
      alert("Go online to remove progress goals.")
    }
    else {
      fetch(`/api/progress/goals/${goalid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
        }).then(goal => {
          console.log(goal)
          setGoalsChanged(goal => goal - 1)
  
      }).catch(err => {
        console.log(err);
      })
    }
  }

  const addHandler = () => {
    if (!online) {
      alert("Go online to add progress goals.")
    }
    else {
      console.log(addComponent);
      setAddComponent(!addComponent);
      setInputVal("");
    }
  }

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const addToList = (input) => () => {
    console.log(input)

    fetch(`/api/progress/goals/${currentUser}`, {
      method: 'POST',
      body: JSON.stringify({text: input}),
      headers: {
          'Content-Type': 'application/json',
        },
      }).then(goal_id => {
        console.log(goal_id);
        setGoalsChanged(goal => goal + 1);
    }).catch(err => {
      console.log(err);
    })
    setAddComponent(false);
  }

  const incrementStudy = () => {
    setHoursStudied(stud => stud + 1)
  }
 
  const decrementStudy = () => {
    setHoursStudied(stud => stud - 1)
  }

  const incrementGoal = () => {
    setStudyGoal(stud => stud + 1)
  }
 
  const decrementGoal = () => {
    setStudyGoal(stud => stud - 1)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("New checked", newChecked);
    setChecked(newChecked);
  };


  return (
    <div className="prog">
        <h3>Weekly Progress</h3>
        {goals.length == 0 && 
          <div className="noGoals">
            <h4> You do not have any goals set yet! </h4>
          </div>
        }
        {goals.length > 0 && <List>
            {Object.entries(goals).map((goal) => {
              const labelId = `checkbox-list-label-${goal[0]}}`;
              return (
                <ListItem
                    key={goal[0]}
                    secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={closeHandler(goal[0], goal[1].goal_id)}>
                        <CloseIcon />
                    </IconButton>
                    }
                    disablePadding
                >
                    <ListItemIcon>
                        <Checkbox
                        onChange={handleToggle(goal[0])}
                        edge="start"
                        checked={checked.indexOf(goal[0]) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                        <ListItemText id={labelId} primary={goal[1].text} />
                </ListItem>
                );
        })}
        </List>}
        <IconButton aria-label="add" onClick={addHandler}>
          <AddIcon />
        </IconButton>
        {addComponent &&  
        <List>
            <ListItem
                key="this"
                secondaryAction={
                <IconButton aria-label="comments" onClick={addToList(inputVal)}>
                    <AddIcon />
                </IconButton>
                }
                disablePadding
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Create goal"
                    maxRows={2}
                    onChange={onChange}
                    value={inputVal}
                />
            </ListItem>
        </List>}
        <ProgressBar now={now} label={`${now}%`} />
        <div className="hoursStudied">
          <div className="info">Study Goal: {studyGoal}</div>
          <IconButton aria-label="comments" onClick={incrementGoal} className="iconButton"><AddIcon className="icon"/></IconButton>
          <IconButton aria-label="comments" onClick={decrementGoal} className="iconButton"><RemoveIcon className="icon"/></IconButton>
        </div>
        <div className="hoursStudied">
          <div className="info">Hours Studied: {studied}</div>
          <IconButton aria-label="comments" onClick={incrementStudy} className="iconButton"><AddIcon className="icon"/></IconButton>
          <IconButton aria-label="comments" onClick={decrementStudy} className="iconButton"><RemoveIcon className="icon"/></IconButton>
        </div>
        {!online && 
        <div id="alert">
          Progress changes will not be saved unless you are online.
        </div>}
    </div>
    );
}