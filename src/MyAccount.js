import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';

export default class MyAccount extends Component {
    
    constructor(props) {
        super(props);
        const api_path = 'http://localhost/vyog/api/';
        window.api_path = api_path;
        const redirect_to = '';
        const my_account = {name:'', email:'', joining_date: ''};
        this.state = {my_account, redirect_to};
    }

    componentDidMount = () => {
        const api_url = axios.defaults.baseURL + 'my_account.php';
        axios.post(api_url)
        .then(res => {
            // console.log(res);
            // console.log(res.data.data);
            const response = res.data;

            if(response.error === 'true') {
                this.props.showErrorMsg(response.msg);

                if(response.code === '403') {
                    // setTimeout(() => {
                    //     window.location.href = '/';
                    // }, 1500); 
                }
            }
            else if(response.notice === 'true') {
                const response_data = response.data;

                this.setState({my_account: {name: response_data.name, email: response_data.email, joining_date: response_data.date_add}});
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render(){
        const {name, email, joining_date} = this.state.my_account;
        return(
            <div className="col-md-4 mx-auto mt-5">
                <div className="card">
                    <h2 className="text-center">My Account Details</h2>
                    
                    <table className="table w-100">
                        <tbody>
                            <tr>
                                <th>Your Name</th>
                                <td>{ name }</td>
                            </tr>
                            <tr>
                                <th>Your Email</th>
                                <td>{ email }</td>
                            </tr>
                            <tr>
                                <th>Your Joining Date</th>
                                <td>{ joining_date }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}