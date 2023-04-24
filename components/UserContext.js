import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userUuid, setUserUuid] = useState('');

    return (
        <UserContext.Provider value={{ userUuid, setUserUuid }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;