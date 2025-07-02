import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  loggedIn: false,
  email: "",
  role: "",
  profilePic: "",
  token: "",
  displayname: ""
};

const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        email: action.payload.email,
        displayname: action.payload.displayname,
        role: action.payload.role,
        profilePic: action.payload.profilePic || '',
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialState;
    case "UPDATE_PROFILE_PIC":
      return { ...state, profilePic: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
