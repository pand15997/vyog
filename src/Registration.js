import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Registration extends Component {
    
    constructor(props) {
        super(props);
        // const api_path = 'http://localhost/vyog/api/';
        // window.api_path = api_path;
        const registration_values = {name:'', email:'', password:''};
        this.state = {registration_values: registration_values};
        const signin_values = {name:'', email:'', password:''};
        this.state = {signin_values: signin_values};
    }

    handleRegistrationChange = (event) => {
        const registration_values_tmp = event.target;
        this.setState({registration_values: {...this.state.registration_values, [registration_values_tmp.name]: registration_values_tmp.value}});
        // console.log(registration_values_tmp.value);
    }

    handleRegistrationSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.registration_values)
        const headers = {
            "Content-Type": "application/json"
        };

        const api_url = axios.defaults.baseURL + 'register_user.php';

        axios.post(api_url, this.state.registration_values)
        .then(res => {
            console.log(res);
            console.log(res.data);
            const response = res.data;

            if(response.error === 'true') {
                this.props.showErrorMsg(response.msg);
            }
            else if(response.notice === 'true') {
                this.props.showSuccessMsg(response.msg);

                // setTimeout(() => {
                //     window.location.href = '/account/signin';
                // }, 1500);
                <Redirect to='/account/signin' />
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render(){
        return(
            <div className="col-md-4 mx-auto mt-5">
                <div className="card">
                    <h2 className="text-center">Registration</h2>
                    <div className="text-danger text-right small">
                        * All Fields are Required.
                    </div>
                    <form className="form" id="registration_user_form" onSubmit={this.handleRegistrationSubmit}>
                        <div className="form-group">
                            <label htmlFor="Name">Your Name, please..</label>
                            <input type="text" name="name" className="form-control" onChange={this.handleRegistrationChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Your Email, please..</label>
                            <input type="email" name="email" className="form-control" onChange={this.handleRegistrationChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Your Password, please..</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleRegistrationChange} required />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success btn-block">Create New Account</button>
                            <p className="text-center mt-2"><Link to="/account/signin">Existing user, Go for signin</Link></p>
                            {/* <NavLink to="/account/signin">Login</NavLink> */}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}