import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const history = useNavigate();
    const [user, setUser] = useState({
        name:'', email:'', phone:'', work:'', password:'', cpassword:''
    })
    const handelInputs = (e) =>{
        // console.log(e)
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    }
    const registerUser = async(e) =>{
        e.preventDefault();
        // console.log(user);
        const {name, email, phone, work, password, cpassword} = user;
        const res = await fetch('/register', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                name, email, phone, work, password, cpassword

            })
        });

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid Registration")
            console.log("Invalid Registration")
        }else{
            window.alert("Registration successfull");
            console.log("Registration successfull");

            history("/signin");
        }
    }
    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-2"></div>
                <div className="col-8 shadow p-5 mb-5 bg-body rounded">
                    <h1 className='mb-4'>Signup</h1>
                    <div className="row">
                        <div className="col-6">
                            <form method='POST'>
                                <div className="mb-3">
                                    <input type="text" name='name' className="form-control" value={user.name} onChange={handelInputs} id="exampleInputName" placeholder='Enter Name' />
                                </div>
                                <div className="mb-3">
                                    <input type="email" name='email' className="form-control" value={user.email} onChange={handelInputs} id="exampleInputEmail" placeholder='Enter Email' />
                                </div>
                                <div className="mb-3">
                                    <input type="number" name='phone' className="form-control" value={user.phone} onChange={handelInputs} id="exampleInputNumber" placeholder='Enter Mobile No.' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name='work' className="form-control" value={user.work} onChange={handelInputs} id="exampleInputProfession" placeholder='Enter Profession' />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name='password' className="form-control" value={user.password} onChange={handelInputs} id="exampleInputPassword" placeholder='Make Password' />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name='cpassword' className="form-control" value={user.cpassword} onChange={handelInputs} id="exampleInputCpassword" placeholder='Enter Confirm Password' />
                                </div>
                                <input type="submit" className="btn btn-primary" onClick={registerUser} value="Submit" />
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

export default Signup;
