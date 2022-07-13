import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Pagenotfound from './components/Pagenotfound';
import Logout from './components/Logout';
import { initialState, reducer } from './reducer/UseReducer';

// 1. ContextAPI
export const UserContext = createContext();

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/about' element={ <About />} />
            <Route path='/contact' element={ <Contact />} />
            <Route path='/signin' element={ <Login />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/logout' element={ <Logout />} />
            <Route path='*' element={ <Pagenotfound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
