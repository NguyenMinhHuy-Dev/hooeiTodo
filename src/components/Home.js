import { useContext, useEffect } from "react";
import { MyContext } from "../contexts/MyContext";
import { TodoContext } from "../contexts/TodoContext";
import '../css/Home.css'
import fb from '../img/fb.png'
import ins from '../img/ins.png'
import github from '../img/git.png'
import react from '../img/reactjs.png'
import fire from '../img/firebase.png'

export const Home = () => {
    
    const { user, email, isLogged, isWhere, setIsWhere } = useContext(MyContext);
    const { tasks } = useContext(TodoContext);

    return (
        <div className="home-page">
            <section id="introduce"> 
                <div className="intro-top">
                    <span className="static-txts">Hello!!! </span>
                    <span className="dynamic-txts">I'm Hooei The Designer.</span>
                </div> 
                <div className="intro-bottom">
                    <div className="intro-left"> 
                        <p>
                        ToDo List App is a kind of app that generally used to maintain our day-to-day tasks or list everything that we have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom. It is helpful in planning our daily schedules. 
                        </p>  
                        <p>
                        In this project, for Frontend I use ReactJs and practice React Hooks, for database I use Firebase. 
                        </p>  
                        <p>
                        React Hooks are simple JavaScript functions that we can use to isolate the reusable part from a functional component. Hooks can be stateful and can manage side-effects. React provides a bunch of standard in-built hooks: useState : To manage states. Returns a stateful value and an updater function to update it.
                        </p>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100015232036699" target="_blank">
                                    <img src={fb} alt="img"></img>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/02.minhuy/" target="_blank">
                                    <img src={ins} className="imgIns" alt="img"></img>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/hooeiholigan" target="_blank">
                                    <img src={github} className="imgGithub" alt="img"></img>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="intro-right">
                        <div className="img-holder">
                            <img src={react} alt="picture"></img>
                        </div>
                        <div className="fire img-holder">
                            <img src={fire} alt="picture"></img>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>

    );
}