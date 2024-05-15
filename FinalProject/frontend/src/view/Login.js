import "./Login.css";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [online, setOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => setOnline(true));
        window.addEventListener('offline', () => setOnline(false));
    }, []);

    // Access the root element to applly style just for login.html  
    useEffect(() => {
    
        const rootElement = document.getElementById('root');
    
        rootElement.classList.add('justify-content-center');
    
        // clean up by removing the class when the component unmounts
        return () => {
            rootElement.classList.remove('justify-content-center');
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!online) {
            alert('Go online to login to Tasktician.');
            return;
        }

        if (username == "") {
            setErrorMessage("Username is required")
        }
        if (password == "") {
            setErrorMessage("Password is required")
        }
        if (username !== "" && password !== "") {

            fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then((data) => {
                //log in success
                console.log("Login", data)

                if (data.error) {
                    setErrorMessage(data.error);
                }
                else {
                    navigateHome();
                }

            }).catch((err) => {
                setErrorMessage(err);
                console.log(errorMessage);
            })
        }

    }

    /*
    const validateEmail = (email) => {
        const reg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return reg.test(email.toLowerCase());
    }
    */

    const onUsernameHandler = (event) => {
        const currUser = event.currentTarget.value;
        setUsername(currUser);
    }

    const onPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;
        setPassword(currPassword);
    }

    function naviateToRegister(){
        if (!online) {
            alert('Go online to register to Tasktician.');
            return;
        }
        navigate('/register');
    }
     function navigateHome(){
        navigate('/home');
    }


    return(
        <div className='background'>
            <div className='logincontainer'>
            <div className='title'> log in </div>
            <form onSubmit={handleSubmit}>
                <div className='innerContainer'>
                    <label>Enter your username </label>
                    <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    placeholder="Enter username"
                    onChange={onUsernameHandler}
                    />
                    {/* emailMsg !== "" && <div className={isEmailValid ? 'validMessage':'invalidMessage'}  > {emailMsg} </div>*/}
                </div>

                <div className='innerContainer'>
                    <label htmlFor="password">Enter your password </label>
                    <input 
                    type="password" 
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={onPasswordHandler}
                    />
                </div>
                {errorMessage && <div className='invalidMessage'>{errorMessage}</div>}
            <input type="submit" />
            </form>
            <div className='lastContainer'>
                <div className='alreadyHave'>Don't have an account?</div>
                <button onClick={naviateToRegister} className='reviewbbutton'>Sign up</button>
                {/*<button onClick={navigateHome} className='homeButton'>Continue as guest</button>*/}
            </div>

            </div>
        </div>
    );
}