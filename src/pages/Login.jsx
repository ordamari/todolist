import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../actions/userActions';

function _Login(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [wrongMsg, setWrongMsg] = useState('Login to your account');

    useEffect(() => {
        if (props.loggedInUser) props.history.push(`/todoList`)
    }, [])

    async function onSubmitForm(ev) {
        ev.preventDefault();
        const user = await props.onLogin({ userName, password });
        setUserName('');
        setPassword('');
        if (!user) setWrongMsg('There was a problem with your login')
        else props.history.push(`/todoList`)
    }

    return (
        <div className='main-container'>
            <div className="login-container">

                <form
                    className='login-form flex column'
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
                    <button>login</button>
                </form>
                <div className="sign-up-link-container flex justify-space-between">
                    <p>Don't have an account?</p>
                    <button
                        onClick={() => { props.history.push('/signup') }}
                    >
                        join now
                    </button>
                </div>
            </div>
        </div>
    )
}
//redux
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    onLogin,
}
export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)