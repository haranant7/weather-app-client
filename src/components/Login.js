/*

Component for Login Page

*/

import React, { Component } from 'react';
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateEmail, serverDomain, strings } from "../utils/utils";
import '../styles/index.css';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            pwd: '',
            errorMessage: strings.loginFormValidation,
            isValid:true,
            loading: false
        }
    }

    login(){
        let userId = this.state.userId;
        let pwd = this.state.pwd;
        if(validateEmail(userId) && pwd !== ''){
            this.setState({loading: true});
            const url = `${ serverDomain }/authenticate`;
            fetch(url, {
                method: 'POST',
                body:JSON.stringify({userId: userId, pwd: pwd}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(json => {
                    if(json.errorCode === 0){
                        localStorage.setItem('token',json.token);
                        this.setState({loading: false,isValid: true});
                        this.props.history.push(`/home`);
                    }
                    else{
                        this.setState({
                            errorMessage:strings.loginFailed,
                            isValid:false,
                            loading: false
                        })
                    }
                });
        }
        else{
            this.setState({isValid: false});
        }
    }

    render(){
        return (
            <div className="Login">
                <Form className="login-form-container">
                    <FormGroup className="login-formgroup1">
                        <FormLabel className="label-username">USERNAME</FormLabel>  
                        {' '}
                        <FormControl 
                            required
                            type="text" 
                            placeholder="jobs@benestudio.co"
                            onChange={e => this.setState({'userId':e.target.value})}
                            className="input-username"
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                    this.login();
                                }
                             }}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup className="login-formgroup2">
                        <FormLabel className="label-password">PASSWORD</FormLabel>
                        {' '}
                        <FormControl 
                            required
                            type="password" 
                            placeholder="********"
                            onChange={e => this.setState({'pwd':e.target.value})}
                            className="input-password"
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                    this.login();
                                }
                             }}
                        />
                    </FormGroup>
                    <FormGroup className="login-button-group">
                        <FormLabel 
                            className="btn-login"
                            onClick={() => {
                                this.login();
                            }}
                        >
                            LOGIN
                        </FormLabel>
                        <FormLabel className="btn-signup">
                            <Link to="/register">SIGNUP</Link>
                        </FormLabel>
                    </FormGroup>
                    {
                        !this.state.isValid ? 
                            <FormLabel className="label-error">{this.state.errorMessage}</FormLabel>
                        :
                        <div></div>
                    }
                </Form>
                {
                    this.state.loading &&
                        <img 
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" 
                            alt="Loading..."
                            className="loading-icon"
                            />
                }
            </div>
        )
    }
}

export default Login;