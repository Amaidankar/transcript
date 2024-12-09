import React, { useState, useEffect, useRef, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { LogOut } from 'lucide-react';
import { postData } from '../api/api';
import { UserContext } from '../contextApi/userIdProvider';
import axios from 'axios';

const GoogleLogin = () => {
    const [userToken, setUserToken] = useState(() => JSON.parse(sessionStorage.getItem('user')) || null);
    const [profile, setProfile] = useState(() => JSON.parse(sessionStorage.getItem('profile')) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('user'));
    const [isOpen, setIsOpen] = useState(false);
    const { setUserId } = useContext(UserContext);
    const menuRef = useRef(null);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUserToken(codeResponse);
            setIsLoggedIn(true);
            sessionStorage.setItem('user', JSON.stringify(codeResponse));
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (userToken && !profile) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken?.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${userToken?.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res?.data);
                    userAuth(res?.data);
                    sessionStorage.setItem('profile', JSON.stringify(res?.data));
                })
                .catch((err) => console.log(err));
        }
    }, [userToken, profile]);

    const userAuth = async (authData) => {
        try {
            const payload = {
                email: authData?.email,
                i_paid: false,
            }
            await postData('/user-auth', payload);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogout = () => {
        googleLogout();
        setProfile(null);
        setUserToken(null);
        setIsLoggedIn(false);
        setIsOpen(false);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('profile');
    };

    const handleGmailLogin = () => {
        login();
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        setUserId(profile?.email);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            {isLoggedIn && profile ? (
                <div className="d-flex align-items-center user-info">
                    {/* <span className="me-2 text-center">{profile?.name}</span> */}
                    <button className="btn text-end" onClick={toggleMenu}>
                        <img
                            src={profile?.picture}
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: '30px', height: '30px' }}
                        />
                    </button>
                    {isOpen && (
                        <div ref={menuRef} className='logout-popup'>
                            <ul>
                                <li onClick={handleLogout} className='text-dark'><LogOut className="me-2 text-primary" style={{ height: '1.2rem', width: '1.2rem' }} />Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="before-login">
                    <div className='login-button-holder'>
                        <p>Please, authorise with Google to start summarizing videos</p>
                        <button className='loginBtn' onClick={handleGmailLogin}>
                            <div className='googleIcon'>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c" style={{ height: '1.5rem', width: '1.5rem' }}><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" ></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                            </div>
                            <span className=''>Login with Gmail</span>
                        </button>
                    </div>
                </div>
                // <button className="btn btn-sm btn-light loginBtn" onClick={handleGmailLogin}>
                //     <svg
                //         xmlns="http://www.w3.org/2000/svg"
                //         viewBox="0 0 24 24"
                //         fill="currentColor"
                //         style={{ height: '1rem', width: '1rem' }}
                //     >
                //         <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                //     </svg>
                //    
                // </button>
            )}
        </>
    );
};

export default GoogleLogin;
