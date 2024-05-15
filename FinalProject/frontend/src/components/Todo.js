
import "./Todo.css";
import {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


export default function TodoTab({setDroppedItem,setIsDraggingFromNote}) {
  
  const [todos, setTodos] = useState([]);
  const [todosChanged, setTodosChanged] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [addComponent, setAddComponent] = useState(false);
  const [checked, setChecked] = useState([0]);
  const [currentUser, setCurrentUser] = useState(-1);

  const [online, setOnline] = useState(window.navigator.onLine)

  fetch('/api/users/current').then(res => res.json()).then(user => {
    setCurrentUser(user.id);
  }).catch(err => {
    console.log(err);
  })

  useEffect(() => {
    window.addEventListener("online", () => setOnline(true))
    window.addEventListener("offline", () => setOnline(false))
  }, [])

  useEffect(() => {
    if (currentUser != -1) {
      fetch(`/api/todo/${currentUser}`)
      .then(res => res.json())
      .then(function(data){
          console.log("todo data is..", data);
          if (data.error) {
            console.log("error")
          }
          else {
            setTodos(data);
          }
      });
  
    }
  }, [todosChanged, currentUser])

  const closeHandler = (index, todoid) => () => {
    if (!online) {
      alert("Go online to remove todos.")
    }
    else {
      fetch(`/api/todo/${todoid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
        }).then(todo => {
          console.log(todo)
          setTodosChanged(todo => todo - 1)

      }).catch(err => {
        console.log(err);
      })

    }
  };

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const onDragged = (todoText) =>{
    setDroppedItem(todoText);
    setIsDraggingFromNote(true);
    console.log("todo list being dragged", todoText);
  }


  const addToList = (input) => () => {
    console.log(input)

    fetch(`/api/todo/${currentUser}`, {
      method: 'POST',
      body: JSON.stringify({text: input}),
      headers: {
          'Content-Type': 'application/json',
        },
      }).then(todo_id => {
        console.log(todo_id)
        setTodosChanged(todo => todo + 1);
    }).catch(err => {
      console.log(err);
    })
    setAddComponent(false);
  }

  const addHandler = () => {
    if (!online) {
      alert("Go online to add todos.")
    }
    else {
      console.log(addComponent);
      setAddComponent(!addComponent);
      setInputVal("");
    }
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


const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let monthString = "";

switch (month) {
    case 1:
        monthString = "Janurary"
        break;
    case 2:
        monthString = "Feburary"
        break;
    case 3:
        monthString = "March"
        break;
    case 4:
        monthString = "April"
        break;
    case 5:
        monthString = "May"
        break;
    case 6:
        monthString = "June"
        break;
    case 7:
        monthString = "July"
        break;
    case 8:
        monthString = "August"
        break;
    case 9:
        monthString = "September"
        break;
    case 10:
        monthString = "October"
        break;
    case 11:
        monthString = "November"
        break;
    case 12:
        monthString = "December"
        break;
}

  return (
    <div className="todo">
        <h3>To-do for {monthString} {day}, {year}:</h3>
        {todos.length == 0 && 
          <div className="noTodos">
            <h4> You do not have any todos set yet! </h4>
          </div>
        }
        {todos.length > 0 && <List>
            {Object.entries(todos).map((todo) => {
                const labelId = `checkbox-list-label-${todo[0]}}`;
    
                return (
                <div className="listItem_wrapper" draggable="true" onDrag={()=>onDragged(todo[1].todo_text)}>
                <ListItem
                    key={todo[0]}
                    secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={closeHandler(todo[0], todo[1].todo_id)}>
                        <CloseIcon />
                    </IconButton>
                    }
                    disablePadding
                >
                    <ListItemIcon>
                        <Checkbox
                        onChange={handleToggle(todo[0])}
                        edge="start"
                        checked={checked.indexOf(todo[0]) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                        <ListItemText id={labelId} primary={todo[1].todo_text} />
                </ListItem>
                </div>
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
                    label="New to-do"
                    maxRows={2}
                    onChange={onChange}
                    value={inputVal}
                />
            </ListItem>
        </List>}
    </div>
    );
}