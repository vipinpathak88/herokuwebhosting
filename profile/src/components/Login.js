import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Login = () => {
    const {state, dispatch} = useContext(UserContext);

    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch('/signin', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body:JSON.stringify({
                email,
                password
            })
        });

        const data = res.json();
        if(res.status === 400 ||   !data){
            window.alert("Invalid Credentials");
        }else{
            dispatch({type:"USER", payload:true})
            window.alert("Login Successfull");
            history("/")
        }
    }
    
    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-2"></div>
                <div className="col-8 shadow p-5 mb-5 bg-body rounded">
                    <h1 className='mb-4'>Login</h1>
                    <div className="row">
                        <div className="col-6">
                            <form method='POST'>
                                <div className="mb-3">
                                    <input type="email" className="form-control" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail" placeholder='Enter Email' />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword" placeholder='Enter Password' />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" onClick={loginUser} />
                            </form>
                        </div>
                        <div className="col-6"></div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Login;
