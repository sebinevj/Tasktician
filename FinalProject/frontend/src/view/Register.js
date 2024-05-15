import {useState, useEffect} from 'react';
import './Register.css';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";


export default function Register(){

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [firstNameMsg, setFirstNameMsg] = useState("")

    const [lastName, setLastName] = useState("");
    const [lastNameMsg, setLastNameMsg] = useState("")

    const [userName, setUserName] = useState("");
    const [userNameMsg, setUserNameMsg] = useState("")

    const [password, setPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("")

    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState("")

    const [errorMessage, setErrorMessage] = useState(false);

    const [online, setOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => setOnline(true));
        window.addEventListener('offline', () => setOnline(false));
    }, []);

    useEffect(() => {
    
        const rootElement = document.getElementById('root');
    
        rootElement.classList.add('justify-content-center');
        rootElement.style.overflow = "visible";
    
        // clean up by removing the class when the component unmounts
        return () => {
            rootElement.classList.remove('justify-content-center');
            rootElement.style.overflow = "hidden";
        };
    }, []);


    //for date picker 
    const [dateValue, setDateValue] = useState(dayjs('2022-04-17'));

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!online) {
            alert('You must be online to register to Tasktician.');
            return;
        }

        if (userName == "") {
            setUserNameMsg("Username is required")
        }
        if (password == "") {
            setPasswordMsg("Password is required")
        }
        if (email == "") {
            setEmailMsg("Email is required")
        }
        if (firstName == "") {
            setFirstNameMsg("First name is required")
        }
        if (lastName == "") {
            setLastNameMsg("Last name is required")
        }
        

        //if all the input is valid call the server
        if(isUserNameValid !== null && isPasswordValid !== null && isPasswordConfirmValid() && isEmailValid){
            console.log("ready to send to the server");

            fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({userName: userName, password: password, email: email, firstName: firstName, lastName: lastName}),
            headers: {
              'Content-Type': 'application/json',
            },
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);

                if (data.error) {
                    console.log("error")
                    setErrorMessage(data.error.message);
                }
                else {
                    console.log("User created");
                    navigateToLogin();

                }


            }).catch(err => {
                console.log(err)
                setErrorMessage(err);
            })

        }
    }

    const validateUserName = (username) => {
        return username
          .toLowerCase()
          .match(/^[|a-z|A-Z|0-9|].{1,8}$/)
    }

    const validateEmail = (email) => {
        const reg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return reg.test(email.toLowerCase());
    }

    const validatePwd = (password) => {
        return password
          .toLowerCase()
          .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{1,25}$/);
    }


    const isUserNameValid = validateUserName(userName);
    const isPasswordValid = validatePwd(password);
    const isEmailValid = validateEmail(email);


    //returns true when confirmPassword is valid and password, confirmPassword matches 
    function isPasswordConfirmValid (){
        return (validatePwd(confirmPassword)!== null && password === confirmPassword);
    } 

   
    const onUserNameHandler = (event) => {
        const currNickname = event.currentTarget.value;
    
        setUserName(currNickname);

        if(currNickname == ""){
            setUserNameMsg("");
        }else{
            if (!validateUserName(currNickname)) {
                setUserNameMsg("Please submit user name that is longer than 1 character and less than 9 characters")
            } else if(validateUserName(currNickname)){
                setUserNameMsg("Correct user name format");
            }
        }
    };


    const onEmailHandler = (event) => {
        const currEmail = event.currentTarget.value;

        setEmail(currEmail);

        if(currEmail == ""){
            setEmailMsg("");
        }else{
            if (!validateEmail(currEmail)) {
                setEmailMsg("Please submit valid email format")
            } else if(validateEmail(currEmail)){
                setEmailMsg("Correct email format");
            }
        }
    }

    const onPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;

        setPassword(currPassword);

        if(currPassword === ""){
            setPasswordMsg("");
        }else{
            if (!validatePwd(currPassword)) {
                setPasswordMsg("Password must contain letter, number, and special character")
            } else if(validatePwd(currPassword)){
                setPasswordMsg("Correct password format");
            }
        }

    }

    const onConfirmPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;

        setConfirmPassword(currPassword);

        if(currPassword == ""){
            setConfirmPasswordMsg("");
        }else{
            if (password !== currPassword) {
                setConfirmPasswordMsg("Passwords do not match")
            } else if(validatePwd(currPassword)){
                setConfirmPasswordMsg("Password matches");
            }
        }

    }

    const onFirstNameHandler = (event) => {
        const currName = event.currentTarget.value;
        setFirstName(currName);

    }

    const onLastNameHandler = (event) => {
        const currName = event.currentTarget.value;
        setLastName(currName)
    }


    function navigateToLogin(){
        navigate('/');
    }

    return(
        <div className='background'>
        <div className='registercontainer'>
        <div className='title'> sign up </div>
        {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>

            <div className='innerContainer'>
                <label>Enter your first name </label>
                <input 
                type="text" 
                name="firstName"
                placeholder='Enter first name' 
                value={firstName} 
                onChange={onFirstNameHandler}
                />
                { firstNameMsg !== "" && <div className='invalidMessage' > {firstNameMsg} </div>}

            </div>

            <div className='innerContainer'>
                <label>Enter your last name </label>
                <input 
                type="text" 
                name="lastName"
                placeholder='Enter last name' 
                value={lastName} 
                onChange={onLastNameHandler}
                />
                { lastNameMsg !== "" && <div className='invalidMessage' > {lastNameMsg} </div>}

            </div>

            <div className='innerContainer'>
                <label>Enter your email </label>
                <input 
                type="text" 
                name="email"
                placeholder='Enter email' 
                value={email} 
                onChange={onEmailHandler}
                />
                { emailMsg !== "" && <div className={isEmailValid ? 'validMessage':'invalidMessage'}  > {emailMsg} </div>}
            </div>

            <div className='innerContainer'>
                <label htmlFor="username">Enter your username </label>
                <input 
                    type="text" 
                    id="username"
                    placeholder='Enter username'
                    value={userName}
                    onChange={onUserNameHandler}
                />
                { userNameMsg !== "" && <div className={isUserNameValid ? 'validMessage':'invalidMessage'}  > {userNameMsg} </div>}
            </div>
            
            <div className='innerContainer'>
                <label htmlFor="password">Enter your password </label>
                <input 
                type="password" 
                id="password"
                placeholder='Enter password'
                value={password}
                onChange={onPasswordHandler}
                />
                { passwordMsg !== "" && <div className={isPasswordValid ? 'validMessage':'invalidMessage'}  > {passwordMsg} </div>}
            </div>

            <div className='innerContainer'>
                <label className='confirmPasswordLabel'>Confirm your password </label>
                <input 
                type="password" 
                name="confirmPassword" 
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
                />
                { confirmPasswordMsg !== "" && <div className={isPasswordConfirmValid() ? 'validMessage':'invalidMessage'}  > {confirmPasswordMsg} </div>}
            </div>

        {/*
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Date of Birth"
                value={dateValue}
                onChange={(newValue) => setDateValue(newValue)}
                sx={
                    {"& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
                    "& .MuiOutlinedInput-root": {
                        "&:hover > fieldset": { borderColor: "#FFFFFF" }
                    }
                    }
                }
                />
            </LocalizationProvider>
            */}
            <div className='innerLastContainer'>
            <button type="submit" onClick={handleSubmit} className='submitbbutton'>Submit</button>
            <div className='lastContainer'>
                <div className='alreadyHave'>Already have an account?</div>
                <button onClick={navigateToLogin} className='reviewbbutton'>Log in</button>
            </div>
            
            </div>
        </form>
        </div>
        </div>
    )
}