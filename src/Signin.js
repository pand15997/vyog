import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
// import { Redirect } from 'react-router';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        const api_path = 'http://localhost/vyog/api/';
        window.api_path = api_path;
        const signin_values = {name:'', email:'', password:''};
        const redirect_to = '';
        this.state = {signin_values: signin_values, redirect_to: redirect_to};
        console.log(this.props)
    }

    handleSigninChange = (event) => {
        const signin_values_tmp = event.target;
        console.log(signin_values_tmp)
        this.setState({signin_values: {...this.state.signin_values, [signin_values_tmp.name]: signin_values_tmp.value}});
    }

    handleSigninSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.signin_values)
        const headers = {
            "Content-Type": "application/json"
        };

        const api_url = axios.defaults.baseURL + 'signin_user.php';
        axios.post(api_url, this.state.signin_values)
        .then(res => {
            // console.log(res);
            console.log(res.data);
            console.log(res.data.data);
            const response = res.data;

            if(response.error === 'true') {
                this.props.showErrorMsg(response.msg);
            }
            else if(response.notice === 'true') {
                let return_data = response.data;
                
                if(return_data !== '') {
                    localStorage.setItem('token',  return_data.token);
                }

                // this.props.showSuccessMsg(response.msg);
                this.props.updateUserDetail('checked', true);
                this.props.updateUserDetail('_Token', return_data.token);
                console.log('going to post');

                this.setState({redirect_to: '/'});

                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 1500);
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render(){
        if(this.state.redirect_to != '') {
            
                return <Redirect to='/' />
           
        }
        return(
            <div className="col-md-4 mx-auto mt-5">
                <div className="card">
                    <h2 className="text-center">Signin</h2>
                    <div className="text-danger text-right small">
                        * All Fields are Required.
                    </div>
                    <form className="form" id="signin_user_form" onSubmit={this.handleSigninSubmit}>
                        <div className="form-group">
                            <label htmlFor="Email">Your Email, please..</label>
                            <input type="email" name="email" className="form-control" required onChange={this.handleSigninChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Your Password, please..</label>
                            <input type="password" name="password" className="form-control" required onChange={this.handleSigninChange} />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success btn-block">Signin</button>
                            <p className="text-center mt-2">New user,<Link to="/account/registration"> Go for Registration</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}