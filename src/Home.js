import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component {
    constructor(props) {
        super(props);
        const redirect_to = '';
        this.onLogout = this.onLogout.bind(this);
        this.state = {redirect_to};
    }
    
    render() {
        
        return(
            <div className="navbar navbar-expand-sm bg-light justify-content-center">
                <div className="navbar-logo text-black-50 p-2">Vyog |</div>
                <div className="">
                    <Menu userChecked={this.props.userChecked}  />
                </div>
                <div>
                    <LogoutBtn onLogout={this.onLogout} userChecked={this.props.userChecked} />
                </div>
            </div>
        )
    }
    
    onLogout = () => {
        console.log('on logout click')
        const api_url = (axios.defaults.baseURL + 'logout.php');
    
        axios.post(api_url)
        .then(res => {
            const response = res.data;
            console.log(response);
            this.setState({redirect_to: '/'});

            localStorage.removeItem('token');
            this.props.updateUserDetail('checked', false);
        })
        .catch(function (error) {
            console.log(error)
        })

        if(this.state.redirect_to != '') {
            return <Redirect to="/" />
        }
    }
}

const Menu = ({userChecked}) => {
    console.log(userChecked)
    const menus = [
        {'id': 1, 'name': 'Posts', 'path': '/', 'private': false},
        {'id': 2, 'name': 'Editors', 'path': '/editors', 'private': false},
        {'id': 3, 'name': 'Signin', 'path': '/account/signin', 'private': false},
        {'id': 4, 'name': 'My Account', 'path': '/my_account', 'private': true},
        {'id': 5, 'name': 'Add Post', 'path': '/add_post', 'private': true},
        {'id': 6, 'name': 'My Post', 'path': '/my_post', 'private': true},
    ]

    return (
        <List list = {menus} userChecked={userChecked} />
    )
}

const List = ({list, userChecked}) => {
    console.log(userChecked)
    if(!list)
        return null;

    return (
        <ul className="navbar-nav">
        {
            list.map(item => {
                let class_name, type;

                class_name = typeof item.class == 'undefined' ? '' : item.class;
                type = typeof item.type == 'undefined' ? '' : item.type;
                console.log("id: "+(item.id))
                if(item.name == 'Signin' && userChecked) {
                    return '';
                }
                else if(!item.private) {
                    return <Item name={item.name} path={item.path} className={class_name} type={type} key={item.id} />
                }
                else if(item.private && userChecked) {
                    return <Item name={item.name} path={item.path} className={class_name} type={type} key={item.id} />
                }
            })
        }
        </ul>
    )
}

const Item = ({name, path, className, type}) => {
    // console.log(name, path, key)
    
    return(
        <li className="nav-item" ><Link to={path} className={`nav-link ${className}`}>{name}</Link></li>
    )
}

const LogoutBtn = (props) => {
    if(!props.userChecked) {
        return null;
    }
    return <button className="btn text-danger" onClick={props.onLogout}>Logout</button>
}

export const ResponseMsg = (prop) => {
    return(
        <div className="show_msgs">
            <SuccessMsg msg = {prop.success_msg}  />
            <ErrorMsg msg = {prop.error_msg} display={prop.display} />
        </div>
    )
}

const SuccessMsg = (prop) => {
    let is_display = prop.msg !== '' ? 'block' : 'none';
    return(
        <div className="alert alert-success alert-dismissible success_msg" style={{display: is_display}}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>Success!</strong> {prop.msg}
        </div>
    )
}

const ErrorMsg = (prop) => {
    let is_display = prop.msg !== '' ? 'block' : 'none';
    return(
        <div className="alert alert-danger alert-dismissible danger_msg" style={{display: is_display}}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>Error!</strong> {prop.msg}
        </div>
    )
}