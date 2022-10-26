import { useEffect, useState, useContext } from 'react'
import '../css/Login.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore" 
import { auth, db } from '../firebase-config'
import { MyContext } from "../contexts/MyContext";  

export const Login = () => { 

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerFullname, setRegisterFullname] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    
    const { user, setUser, isLogged, setIsLogged, setEmail } = useContext(MyContext);


    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const errors = {
        uname: "Invalid username or password!",
        pass: "Invalid username or password!"
      };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );

    const register = async () => {
        try {
            const con = collection(db, "users")
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            addDoc(con, {
                username: registerUsername, 
                email: registerEmail, 
                name: registerFullname,
                password: registerPassword,
                address: "",
                university: "",
                class: "",
                studentid: "",
                studentemail: ""
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async () => {
        loginEmail.trim();
        loginPassword.trim();
        if (loginEmail !== "") {
            if (loginPassword !== "") {
                try {  
                    const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                    console.log(user)

                    sessionStorage.setItem("isLogged", !isLogged)
                    sessionStorage.setItem("isWhere", "HOME")
                    sessionStorage.setItem("email", loginEmail)

                    setIsLogged(sessionStorage.getItem("isLogged"));
                    setEmail(loginEmail);

                    
                } catch (error){
                    setErrorMessages({ name: "uname", message: errors.uname});
                }
            }
            else {
                setErrorMessages({ name: "pass", message: errors.pass });
            }
        }
        else {
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    }

    return (
        <div className="login-register-form">
            {isLogged ? <span className="logged-in-heading">You are logged in {user.email}</span> : (
                <>
                    <div className="register-form">
                        <span className="heading-form">REGISTER</span>
                        <div className="inputs-container">
                            <div className="input-container">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => {
                                        setRegisterUsername(e.target.value)
                                    }} 
                                    placeholder="What is your username?" 
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    onChange={(e) => {
                                        setRegisterEmail(e.target.value)
                                    }} 
                                    placeholder="What is your email?" 
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Name</label>
                                <input type="text" onChange={(e) => {
                                        setRegisterFullname(e.target.value)
                                    }}  placeholder="What is your name?" required/>
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Create your password" 
                                    onChange={(e) => {
                                        setRegisterPassword(e.target.value)
                                    }} 
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Confirm password</label>
                                <input type="password" placeholder="Confirm your password?" required/>
                            </div>
                            <div className="input-container"> 
                                <button onClick={register} type="submit">REGISTER</button>
                            </div>
                        </div>
                    </div> 

                    <div className="login-form">
                        <span className="heading-form">LOGIN</span>
                        <div className="inputs-container">
                            <div className="input-container">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    placeholder="abc@123.com" 
                                    onChange={(e) => {
                                        setLoginEmail(e.target.value)
                                    }} 
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="What is your password?" 
                                    onChange={(e) => {
                                        setLoginPassword(e.target.value)
                                    }} 
                                    required
                                />
                            </div> 
                            <div className="errors-container">
                                <span>
                                    {renderErrorMessage("uname")}
                                    {renderErrorMessage("pass")}
                                </span>
                            </div>
                            <div className="input-container"> 
                                <button onClick={login} type="submit">LOG IN</button>
                            </div>
                        </div>
                    </div>
                </>
            )} 
        </div>
    );
}