import { createContext, useState } from "react";

// Init value
export const TodoContext = createContext({
    tasks:[],
    setTasks: () => {}
});

const initTasks = [
    {
        id: 1,
        name: "Đồ án Web",
        deadline: "29/10/2022",
        isCompleted: false
    },
    {
        id: 2,
        name: "Đồ án Java",
        deadline: "5/11/2022",
        isCompleted: true
    }
];

export const TodoContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState(initTasks);
    return (
        <TodoContext.Provider value={{
            tasks,
            setTasks
        }}>

            {children}

        </TodoContext.Provider>
    )
}