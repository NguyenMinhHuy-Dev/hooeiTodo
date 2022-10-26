import { createContext, useState } from "react";

// Init value
export const MyContext = createContext({
    user: {},
    setUser: () => {},

    email: null, // state
    setEmail: () => { }, 

    isLogged: false,
    setIsLogged: () => {},

    isWhere: null,
    setIsWhere: () => {}
});

export const MyContextProvider = ({ children }) => {
     
    const [user, setUser] = useState({});
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [isWhere, setIsWhere] = useState(sessionStorage.getItem("isWhere") === null ? "HOME" : sessionStorage.getItem("isWhere"));
    
    return (
        <MyContext.Provider value={{ 
            user,
            setUser,
            email,
            setEmail,
            isLogged,
            setIsLogged,
            isWhere,
            setIsWhere
        }}>

            {children}

        </MyContext.Provider>
    )
}