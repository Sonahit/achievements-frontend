import React, { useState } from 'react'
import { AuthContext, authInitialProps } from './contexts/auth.context'
import { User } from './entities/User';

export default function App() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<Partial<User> | null>(null);



    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser }}>
            <div>
                Hello_World
            </div>
        </AuthContext.Provider>
    )
}
