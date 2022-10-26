import '../css/Header.css'
import { MyContext } from '../contexts/MyContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

export const Header = () => {
    const { email, isLogged, setIsLogged, isWhere, setIsWhere } = useContext(MyContext);

    return (
        <header className="App-header">
            <Link id='home-link' to='/home' className={isWhere === "HOME" ? "active" : ""} onClick={() => {
                sessionStorage.setItem("isWhere", "HOME")
                setIsWhere("HOME")
            }}>Home</Link>
            <Link id='timeline-link' to='/timeline' className={isWhere === "TIMELINE" ? "active" : ""} onClick={() => {
                sessionStorage.setItem("isWhere", "TIMELINE")
                setIsWhere("TIMELINE")
            }}>Timeline</Link>
            <Link id='todos-link' to='/todos' className={isWhere === "TODOS" ? "active" : ""} onClick={() => {
                sessionStorage.setItem("isWhere", "TODOS")
                setIsWhere("TODOS")
            }}>Todos</Link>
            {isLogged ? (
                <Link  id='logout-link' className={isWhere === "INFO" ? "active" : ""} to='/info' onClick={() => {
                    sessionStorage.setItem("isWhere", "INFO")
                    setIsWhere("INFO")
                    // logout();
                }}>MY INFO</Link> 
            ): (
                <Link id='login-link' to='/login' className={isWhere === "LOGIN" ? "active" : ""} onClick={() => {
                    sessionStorage.setItem("isWhere", "LOGIN")
                    setIsWhere("LOGIN")
                }}>Login</Link> 
            )}
        </header>
    )
}