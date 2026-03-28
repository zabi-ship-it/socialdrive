import { createContext, useState, useContext } from 'react'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [role, setRole] = useState('buyer') // 'buyer' | 'seller' | 'expert'

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
