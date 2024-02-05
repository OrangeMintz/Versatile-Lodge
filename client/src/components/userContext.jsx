import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get(`/profile/admin`).then(({ data }) => {
                setUser(data);
            });
        }
    }, []); // You should pass an empty dependency array to execute the effect only once when the component mounts.

    return (
        <UserContext.Provider value={{ user, setUser }}> {/* Wrap the value in an object */}
            {children}
        </UserContext.Provider>
    );
}
