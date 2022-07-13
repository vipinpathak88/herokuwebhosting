import React, { useEffect, useState } from 'react';
import userPhoto from '../images/profilephoto.jpg';
import aboutpic from '../images/aboutpic.jpg';
import { useNavigate } from 'react-router-dom'

const About = () => {
    const history = useNavigate();
    const [userData, setUserData] = useState({});
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (err){
            console.log(err);
            history('/signin');
        }
    }
    useEffect(()=>{
        callAboutPage();
    }, []);

    return (
        <div className='container'>
            <form method="GET">
                <div className="row my-5">
                    <div className="col-2"></div>
                    <div className="col-8 shadow p-5 mb-5 bg-body rounded">
                        <div className="row">
                            <div className="col-4">
                                <img src={userData.name === "Ankur" ? userPhoto : aboutpic} alt="profile-photo" className='img-fluid' />
                                <h6 className='py-1'>Work Link</h6>
                                <h6 className='py-1'>Instagram</h6>
                                <h6 className='py-1'>Thapa Technical</h6>
                                <h6 className='py-1'>WebsiteGitHubMERN Dev</h6>
                                <h6 className='py-1'>Figma</h6>
                                <h6 className='py-1'>Software Engeeneer</h6>
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-8">
                                        <h2>{userData.name}</h2>
                                        <h5>{userData.work}</h5>
                                        <p>RANKING : 1/10</p>
                                    </div>
                                    <div className="col-4">
                                        <input type='submit' value='Edit profile' className="btn btn-primary" />
                                    </div>
                                    <div className="col-12">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">About</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Timeline</button>
                                            </li>                                        
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                                <div className="row  mt-3">
                                                    <div className="col-6">
                                                        <h6>User Id</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>789456123</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Name</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData.name}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Email</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData.email}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Phone</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData.phone}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Profession</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData.work}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <h6>Experience</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>Expert</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Hourly Rate</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>10$/hr</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Total Project</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>230</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>English Level</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>Expert</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6>Abailability</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>6 Months</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </form>
        </div>
    );
}

export default About;
