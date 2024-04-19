import React from 'react';
import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <>
            <div className="App">
                <div className='main-page'>
                    <h1>Thank you for Contacting me</h1>
                    <p>Please click on below button to check my work done as per the document shared:</p>
                    <Link to='/todo-list' className='btn'>Click Here</Link>
                </div>
            </div>
        </>
    )
}

export default Homepage
