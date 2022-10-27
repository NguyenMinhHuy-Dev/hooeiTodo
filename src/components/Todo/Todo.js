import React, { useContext, useEffect, useState } from "react"; 
import '../../css/TodoList.css'
import { db } from "../../firebase-config";
import DeleteIcon from '@mui/icons-material/Delete';  
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { MyContext } from "../../contexts/MyContext";

export const Todo = () => {   
    const { email, isLogged } = useContext(MyContext);

    const [input, setInput] = useState("");
    const [id, setId] = useState("");  
    const [title, setTitle] = useState("");
    const [create, setCreate] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [todos, setTodos] = useState([]); 
 
    const getTodos = async () => { 
        const todosCollectionRef = collection(db, "todos"); 
        const data = await   getDocs(todosCollectionRef);
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


    const handleSearchTodo = (input) => {
        setTodos(todos.filter(function(todo) { return todo.title === input; })) 
    }  

    const handleCreateTodo = async () => { 
        if (isLogged) { 
            try {
                const todosCollectionRef = collection(db, "todos"); 
                const current = new Date();
                const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
                await addDoc(todosCollectionRef, {
                    email: email,
                    title: title,
                    description: description, 
                    create: date,
                    deadline: deadline,
                    status: "Processing"
                }); 
                getTodos();
                setId("");
                setTitle("");
                setDescription("");
                setDeadline("");
                
            } catch (error) {
                console.log(error.message);
            } 
        } 
        else {
            console.log("You are not logged in!")
        }
    } 

    const handleDeleteTodo = async (id) => {
        try {   
            const todo = doc(db, "todos", id);
            const updateTodo = {status: "Canceled"}
            await updateDoc(todo, updateTodo);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleCompleteTodo = async (id) => {
        try {
            const todo = doc(db, "todos", id);
            const updateTodo = {status: "Done"}
            await updateDoc(todo, updateTodo);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUpdateTodo = async () => {
        try {
            const todo = doc(db, "todos", id);
            const updateTodo = {title: title, description: description, deadline: deadline}
            await updateDoc(todo, updateTodo);
            getTodos();
            setId("");
            setTitle("");
            setDescription("");
            setDeadline("");
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="Todo-page">
            <div className="Todo-form">
                <div className="Todo-left">
                    <div className="Todo-search">
                        <input type="text"  placeholder="Search todo..." onChange={(e) => {setInput(e.target.value)}} defaultValue={input} className="Todo-input"/>
                        <input type="button" onClick={() => {
                            handleSearchTodo(input)
                        }} className="Todo-button" value="Search"/>
                        <button onClick={() => {
                            getTodos()
                        }} className="Todo-button-reset">RESET</button>
                    </div>

                    <div className="Todo-add-form">
                        <span className="Todo-add-heading">TODO DETEAIL</span>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        TITLE
                                    </th>
                                    <td>
                                        <input 
                                        onChange={(event) => {
                                            setTitle(event.target.value)
                                        }}
                                        className="Todo-add-name" value={title} placeholder="Type your new todo's title" type="text"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        DESCRIPTION
                                    </th>
                                    <td>
                                        <textarea 
                                        onChange={(event) => {
                                            setDescription(event.target.value)
                                        }}
                                        value={description}
                                        placeholder="Type your new todo's description" rows="7" cols="37"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                            DEADLINE
                                    </th>
                                    <td>
                                        <input 
                                        onChange={(event) => {
                                            setDeadline(event.target.value)
                                        }}
                                        className="Todo-add-date" type="date" defaultValue={deadline}/>
                                    </td>
                                </tr>
                                <tr className="Todo-form-button-row">
                                    <td className="Todo-form-button" colSpan="2">
                                        <button 
                                        onClick={handleUpdateTodo} className={`Todo-update-btn ${id === "" ? "disabled" : ""}`}>UPDATE</button>
                                    </td>
                                </tr>
                                <tr className="Todo-form-button-row">
                                    <td className="Todo-form-button" colSpan="2">
                                        <button 
                                        onClick={handleCreateTodo}>CREATE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="Todo-right" className="Todo-right">
                    {todos.filter(function(todo) { return todo.email === email && todo.status === "Processing"; }).length !== 0 ? (
                        todos.filter(function(todo) { return todo.email === email && todo.status === "Processing"; }).map((todo) => { 
                            const date = todo.create.split("/").reverse().join("-"); 
                            return (
                                <div key={todo.id} className="Todo-item-container"> 
                                    <div  id="item" className="Todo-item">
                                        <div onClick={() => {
                                        setId(todo.id);
                                        setTitle(todo.title);
                                        setDescription(todo.description);
                                        setDeadline(todo.deadline);
                                    }} className="Todo-item-left">
                                            <div className="Todo-item-heading">
                                                <h3>{todo.title}</h3>
                                            </div>
                                            <div className="Todo-item-info">
                                                <div className="Todo-item-description">
                                                    <p>{todo.description}</p>
                                                </div>
                                                <div className="Todo-item-date">
                                                    <span className="Todo-item-create">Create at: {date}</span>
                                                    <span>Deadline: {todo.deadline}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div onClick={(event) => {
                                            event.target.parentElement.parentElement.classList.add("remove");
                                            handleDeleteTodo(todo.id);
                                        }} className="Todo-item-right-delete">
                                            <DeleteIcon className="Icon"/>  
                                        </div>
                                        <div onClick={(event) => {
                                            event.target.parentElement.parentElement.classList.add("finish");
                                            handleCompleteTodo(todo.id);
                                        }} className="Todo-item-right-finish">
                                            <CheckCircleIcon className="Icon"/>
                                        </div>
                                    </div>
                                
                                </div>   
                            )
                        })): (
                        <div className="Todo-right-empty">
                            <span>Your todo list is empty! Please add new todo</span>
                        </div>
                    )}  
                </div>
            </div>
        </div> 
    );
}