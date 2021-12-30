import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onSignup } from '../actions/userActions';
import { onSetUsers } from '../actions/userActions';
import { cloudinaryService } from '../services/cloudinaryService';
import loader from '../assets/imgs/loader.gif'

function _Signup(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [imgUrl, setImgUrl] = useState("https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg");
    const [wrongMsg, setWrongMsg] = useState('Create a new account');

    useEffect(() => {
        if (isLoader) setImgUrl(loader);
    }, [isLoader])

    useEffect(() => {
        props.onSetUsers();
        if (props.loggedInUser) props.history.push(`/todoList`)
    }, [])

    async function uploadImg(ev) {
        setIsLoader(true);
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            setIsLoader(false)
            setImgUrl(newImg.url)
        } catch (err) {
        }
    }

    async function onSubmitForm(ev) {
        ev.preventDefault();
        if (password !== confirmPassword) {
            setWrongMsg('Your password and confirmation password do not match')
            setPassword('');
            setConfirmPassword('');
        }
        else if (props.users.some(user => user.userName === userName)) {
            setWrongMsg(`already have account with name ${userName} please try another one`)
        }
        else {
            const user = await props.onSignup({ userName, password, profileUrl: imgUrl });
            props.history.push(`/todoList`)
        }
    }


    return (
        <div className='main-container'>
            <div className="signup-container">

                <form
                    className='signup-form flex column'
                    onSubmit={onSubmitForm}
                >
                    <p>{wrongMsg}</p>
                    <input
                        type="text"
                        value={userName}
                        onChange={({ target }) => { setUserName(target.value) }}
                        placeholder='user name'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => { setPassword(target.value) }}
                        placeholder='password'
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={({ target }) => { setConfirmPassword(target.value) }}
                        placeholder='confirm password'
                    />
                    <label htmlFor="img-upload">
                        <div className='profile-img'>
                            <p>Click to select Profile Image</p>
                            <img src={imgUrl} alt="" />
                        </div>

                    </label>
                    <input
                        hidden
                        type="file"
                        className="file-input"
                        name="img-upload"
                        id="img-upload"
                        onChange={uploadImg}
                    />
                    <button>signup</button>
                </form>
                <div className="login-link-container flex justify-space-between">
                    <p>Don't have an account?</p>
                    <button
                        onClick={() => { props.history.push('/') }}
                    >
                        login
                    </button>
                </div>
            </div>
        </div>
    )
}
//redux
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
        users: state.user.users,

    }
}
const mapDispatchToProps = {
    onSignup,
    onSetUsers,
}
export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)