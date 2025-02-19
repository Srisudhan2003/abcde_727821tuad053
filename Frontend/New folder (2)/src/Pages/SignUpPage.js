import React, { useState } from 'react';
import Cover_img from '../Images/login1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../Features/User';
import { useDispatch } from 'react-redux'; 
import { addCustomer } from '../Features/CustomersSlice'
import axios from 'axios';
const SignupPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch(); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 15;
    };

    const handleSignup = async () => {

        try{
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            });
            
            if(response.status === 200){
                navigate("/login");
                dispatch(login({name:firstName}));
                dispatch(addCustomer({fname:firstName,lname:lastName , email:email , ph:phoneNumber}));
            }
        }
        catch(error){
            console.log("Error!")
        }   
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowErrors(true);
        navigate('/')
     }

    return (
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute left-[27%] flex flex-col top-[70px] items-center">
                    <h1 className="text-6xl text-white font-bold font-serif ">ESSENTIA</h1>
                </div>
                <img src={Cover_img} className="w-full h-full object-cover" alt="CoverImage" />
            </div>

            <div className="w-1/2 h-full bg-[#E0E0E0] flex flex-col p-5 justify-between items-center ">
                <div className="w-fil flex flex-col w-[65%]">
                    <div className="w-flex flex flex-col mb-5">
                        <h3 className="text-3xl font-semibold mb-2">Sign Up</h3>
                        <p className="text-base mb-2">Step into Essentia - Where Homes Find Harmony</p>
                    </div>


                    <div className="w-full flex flex-col">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="flex-1 text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="flex-1 text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                                !showErrors || validateEmail(email) ? '' : 'border-red-500'
                            }`}
                        />
                        {showErrors && !validateEmail(email) && <p className="text-red-500">Invalid email address.</p>}
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                                !showErrors || /^\d+$/.test(phoneNumber) ? '' : 'border-red-500'
                            }`}
                        />
                        {showErrors && !/^\d+$/.test(phoneNumber) && <p className="text-red-500">Phone number must contain only numbers.</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                                !showErrors || validatePassword(password) ? '' : 'border-red-500'
                            }`}
                        />
                        {showErrors && !validatePassword(password) && (
                            <p className="text-red-500">Password must be between 8 and 15 characters.</p>
                        )}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                                !showErrors || password === confirmPassword ? '' : 'border-red-500'
                            }`}
                        />
                        {showErrors && password !== confirmPassword && <p className="text-red-500">The passwords do not match.</p>}
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm font-medium whitespace-nowrap underline-offset-2">
                            By signing up, you agree to our <Link to="/Terms_And_Conditions" className=' cursor-pointer font-semibold'>Terms and Privacy Policy</Link>
                        </p>
                    </div>

                    <div className="w-full flex flex-col my-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                                className="w-4 h-4 mr-2"
                            />
                            <p className="text-sm" >I agree to the Terms and Conditions</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col my-4">
                        <button
                            onClick={handleSignup}
                            className="w-full bg-[#060606] my-2 text-white font-semibold border-2 rounded-md p-4 text-center flex items-center justify-center hover:text-black hover:bg-white border-black"
                        >
                            Sign Up
                        </button>
                    </div>
                    
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute  text-black/80 bg-[#E0E0E0]"></p>
                    </div>
                </div>
                
                <div className="justify-center items-center">
                    <p className="text-sm font-normal text-[#060606]">
                    <Link to={"/login"} >Already have an account? <span className="font-semibold underline ring-offset-2 cursor-pointer">Log in</span></Link>
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default SignupPage;