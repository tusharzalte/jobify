import React, { useReducer, useContext } from 'react'
import reducer from './reducers'
import axios from 'axios';
import {
        DISPLAY_ALERT,
        CLEAR_ALERT,
        REGISTER_USER_BEGIN,
        REGISTER_USER_SUCCESS,
        REGISTER_USER_ERROR,
        LOGIN_USER_BEGIN,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_ERROR,
        TOGGLE_SIDEBAR, 
        LOGOUT_USER,
    } from './actions'


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userlocation = localStorage.getItem('location');


const initialState =
{
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userlocation || '',
    jobLocation: userlocation || '',
    showSidebar: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addusertoLocalstorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserfromtLocalstorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }

    const registeruser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post("/api/v1/auth/register", currentUser)
            // console.log(response);
            const { user, token, location } = response.data
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } },)
            addusertoLocalstorage({ user, token, location })
        } catch (error) {
            // console.log(error.response);
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post("/api/v1/auth/login", currentUser)
            const { user, token, location } = data
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token, location } },)
            addusertoLocalstorage({ user, token, location })
        } catch (error) {
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }

    
    const togglesidebar=()=> {
        dispatch({ type:TOGGLE_SIDEBAR})
    }
    const logoutUser=()=> {
        dispatch({ type:LOGOUT_USER})
        removeUserfromtLocalstorage() 
    }
    
    const updateUser = async(currentUser) =>
    {
        console.log(currentUser);
    }
    return (
        <AppContext.Provider value={{ ...state, displayAlert, registeruser, loginUser,togglesidebar,logoutUser,updateUser }}>
            {children}
        </AppContext.Provider>
    )
}



const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }