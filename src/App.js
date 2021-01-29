import './App.css';
import {Component} from 'react';
import Header, {ResponseMsg } from './Home.js';
import Registration from './Registration.js';
import Signin from './Signin.js';
import MyAccount, {Logout} from './MyAccount.js';
import MyPost, {Posts, OnePosts} from './Posts';
import {Editors} from './Editors.js';
import AddPost from './AddPost.js';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    const response_msg = {success_msg: '', error_msg: ''}
    const _Token = localStorage.getItem('token');
    const user_detail = {checked: false, _Token: _Token}
    this.state = {response_msg, user_detail}
    console.log(this.state.user_detail)
    axios.defaults.baseURL = 'http://localhost/vyog/api/';

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.post['token'] = _Token;
  }

  componentDidMount(){
    this.checkUserSession();
  }

  showErrorMsg = (msg) => {
    console.log(msg)
    this.setState({response_msg: {...this.state.response_msg, error_msg: msg}})
  }

  showSuccessMsg = (msg) => {
    this.setState({response_msg: {...this.state.response_msg, success_msg: msg}})
  }

  updateUserDetail = (key, val) => {
    console.log(val)
    this.setState({user_detail: {...this.state.user_detail, key: val}})
    console.log(this.state.user_detail)
  }

  checkUserSession = () => {
    const api_url = axios.defaults.baseURL + 'auth.php';
    axios.post(api_url, this.state)
    .then(res=> {
        const api_response = res.data;
        console.log(api_response);

        if(api_response.error === 'true') {
          this.setState({ user_detail: { checked: false } });
        }
        else if(api_response.notice === 'true') {
          this.setState({ user_detail: { checked: true } });
        }
    })
    .catch(function (err) {
        console.log(err);
    })
  }

  render(){
    const {error_msg, success_msg, display} = this.state.response_msg;
    // const {user_detail} = this.state.user_detail; 
    return (
      <Router>
        <Header userChecked={this.state.user_detail.checked} updateUserDetail={this.updateUserDetail} />
        <ResponseMsg error_msg={error_msg} success_msg={success_msg} display={display} />
        <Switch>
            <Route exact path="/">
                <Posts />
            </Route>
            <Route exact path="/one_post">
              <div></div>
              <Posts />
            </Route>
            <Route exact path="/editors">
                <Editors />
            </Route>
            <Route exact path="/my_account">
                <MyAccount showErrorMsg={this.showErrorMsg} showSuccessMsg={this.showSuccessMsg}  />
            </Route>
            <Route exact path="/add_post">
                <AddPost showErrorMsg={this.showErrorMsg} showSuccessMsg={this.showSuccessMsg}  />
            </Route>
            <Route exact path="/my_post">
                <MyPost showErrorMsg={this.showErrorMsg} showSuccessMsg={this.showSuccessMsg} />
            </Route>
            <Route exact path="/account/registration">
                <Registration showErrorMsg={this.showErrorMsg} showSuccessMsg={this.showSuccessMsg} />
            </Route>
            <Route exact path="/account/signin">
                <Signin showErrorMsg={this.showErrorMsg} showSuccessMsg={this.showSuccessMsg} updateUserDetail={this.updateUserDetail} />
            </Route>
        </Switch>
      </Router>
    );
  }
}


export default App;
