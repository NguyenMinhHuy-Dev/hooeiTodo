import { useContext, useEffect, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import { db } from "../firebase-config";
import '../css/Timeline.css'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const Timeline = () => {
    const { email, isLogged } = useContext(MyContext);

    const [todos, setTodos] = useState([]); 

    const getTodos = async () => { 
        const todosCollectionRef = collection(db, "todos"); 
        const data = await getDocs(todosCollectionRef);
        setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
    } 

    useEffect(() => { 
        if (isLogged) { 
            getTodos();
        }
        else {
            console.log("You are not logged in!")
        }
    }, [])

    return (
        
        <div className="Timeline-page">
                 
            <div onScroll={() => {
                const timelines = document.querySelectorAll(".Timeline-item");
                const timeline_container = document.getElementById("Timeline-container");

                const triggerBottom = timeline_container.offsetHeight / 5 * 5;
                timelines.forEach(timeline => {
                    const timeline_top = timeline.getBoundingClientRect().top;
                    if (timeline_top < triggerBottom) {
                        timeline.classList.add("show");
                    }
                    else {
                        timeline.classList.remove("show");
                    }
                })
        }} id="Timeline-container" className="Timeline-container">

                {/* <div className="Timeline-line">

                </div> */}
            
                {todos.filter(function(todo) {return todo.email === email;}).sort((a, b) => {
                    const deadlineA = Date.parse(a.deadline); 
                    const deadlineB = Date.parse(b.deadline);
                     
                    if (deadlineA < deadlineB) {
                        return -1;
                    }
                    if (deadlineA > deadlineB) { 
                        return 1;
                    } 
                    return 0;
                }).map(todo => {
                    return (
                        <div key={todo.id} className="Timeline-item ">
                            <div className="Timeline-item-heading">
                                <h3>{todo.deadline}</h3>
                            </div>
                            <div className="Timeline-item-title">
                                <h2>{todo.title}</h2>
                            </div>
                            <div className="Timeline-item-description">
                                <p>
                                {todo.description}
                                </p>
                            </div>
                            <div className={`Timeline-item-status `}>
                                <span className={`${todo.status}`}>{todo.status}</span>
                            </div>
                            <div className="circle-warning">
                            </div>
                        </div>
                    )
                })}
            </div>
        </div> 
    
    );
}