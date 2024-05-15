
import "./Profile.css";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function ProfileTab() {

const navigate = useNavigate()


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [currentUser, setCurrentUser] = useState(-1);


  fetch('/api/users/current').then(res => res.json()).then(user => {
    setCurrentUser(user.id);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setUsername(user.username);

  }).catch(err => {
    console.log(err)
  });

  function logoutHandler() {
    fetch('/api/users/logout').then(res => res.json()).then(() => {
        console.log("logout")
        navigate("/");
    });
  }

  return (
    <div className="prof">
        <h3>Hello, {firstName} {lastName}</h3>
        <div className="info">Email: {email}</div>
        <div className="info">Username: {username}</div>
        <Button variant="light" id="logout" onClick={logoutHandler}>Logout</Button>
    </div>
    );
}