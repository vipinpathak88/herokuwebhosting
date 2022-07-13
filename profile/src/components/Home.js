import React, { useState, useEffect} from 'react';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false)
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true)

            if (!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (err){
            console.log(err);
        }
    }
    useEffect(()=>{
        userHomePage();
    }, []);
    return (
        <div className='container'>
            <h1 className='text-center mt-5'>Hi, {userName}</h1>
            <h3 className='text-center'>{ show ? 'Happy, to see you back' : 'We are the MERN Developer' }</h3>
        </div>
    );
}

export default Home;
