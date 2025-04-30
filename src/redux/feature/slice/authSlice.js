import { createSlice } from "@reduxjs/toolkit";

  
  const isTokenPresentInCookies = () => {
    const token = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('token='));
        return Boolean(token);
  };

export const saveUserToLocalStorage = (user)=>{
    try {
        if(user === undefined || user === null) {
            console.error("No user object provided to saveUserToLocalStorage");
            return;
        }
        const serializedState = JSON.stringify(user);
        localStorage.setItem('user', serializedState);
        console.log("User successfully saved to localStorage", serializedState);
    } catch (error) {
        console.error("Error saving user to localStorage", error);
    }
};

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if(!serializedState){
            return {user: null};
        }

        const parsedState = JSON.parse(serializedState);
        return {user: parsedState};
    } catch (error) {
        console.error("Error loading user from the LocalStorage:", error);
        return {user: null};
    }
};
// const userFromStorage = loadUserFromLocalStorage().user;

const initialState = {
    ...loadUserFromLocalStorage(),
    isAuthenticated: isTokenPresentInCookies(),
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.isAuthenticated = true;
            saveUserToLocalStorage(action.payload);
        },
        logOut(state){
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');

            document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
        }
    }
});

export const {setUser, logOut} = authSlice.actions;
export default authSlice.reducer;