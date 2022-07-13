import React, { useState, useEffect } from 'react';

const Contact = () => {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    const callContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone });

            if (!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (err){
            console.log(err);
        }
    }
    useEffect(()=>{
        callContactPage();
    }, []);
    
    const handelInputs = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const contactForm = async (e) => {
        e.preventDefault();
        
        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not send");
        } else{
            alert("Message Send");
            setUserData({ ...userData, message: "" });
        }
    }
    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-2"></div>
                <div className="col-8 shadow p-5 mb-5 bg-body rounded">
                    <h1 className='mb-4'>Get In Touch</h1>
                    <div className="row">
                        <div className="col-12">
                            <form method='POST'>
                                <div className="mb-3">
                                    <input type="text" className="form-control" name='name' value={userData.name} onChange={handelInputs} id="exampleInputEmail" placeholder='Enter Your Name' />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" name='email' value={userData.email} onChange={handelInputs} id="exampleInputEmail" placeholder='Enter Email' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" name='phone' value={userData.phone} onChange={handelInputs} id="exampleInputPassword" placeholder='Enter Password' />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Message' name='message' value={userData.message} onChange={handelInputs}></textarea>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" onClick={contactForm} />

                            </form>
                        </div>
                        <div className="col-12"></div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Contact;
