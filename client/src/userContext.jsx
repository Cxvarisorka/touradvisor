import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        if(!userData){
            axios.get('/profile')
                .then(({data}) => setUserData(data));
        }
    }, [])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}