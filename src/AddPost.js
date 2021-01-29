import axios from 'axios';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class AddPost extends Component {
    constructor(props) {
        super(props);
        const post_data = {id: '', title: '', content: ''}
        const redirect_to = '';
        this.state = {post_data, redirect_to}; 
        this.handleAddPostChange = this.handleAddPostChange;
    }

    componentDidMount = () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log(id);
        
        if(id) {
            const api_url = axios.defaults.baseURL + 'my_post.php';
            axios.post(api_url, {id: id})
            .then(res=> {
                const response = res.data;
                console.log(response);
    
                if(response.error === 'true') {
                    this.props.showErrorMsg(response.msg);
                }
                else if(response.notice === 'true') {
                    this.props.showSuccessMsg(response.msg);
                    this.setState({post_data: response.data})
                }
            })
            .catch(function (err) {
                console.log(err);
            })
        }
    }

    handleAddPostChange = (event) => {
        const data = event.target;
        console.log(data.name)
        console.log(data.value)
        this.setState({post_data:{...this.state.post_data, [data.name]: data.value }});
    }

    handlePostSubmit = (event) => {
        event.preventDefault();
        const api_url = axios.defaults.baseURL + 'add_post.php';
        axios.post(api_url, this.state.post_data)
        .then(res=> {
            const api_response = res.data;
            console.log(api_response);

            if(api_response.error === 'true') {
                this.props.showErrorMsg(api_response.msg);
            }
            else if(api_response.notice === 'true') {
                this.props.showSuccessMsg(api_response.msg);
                if(this.state.post_data.id == '') {
                    this.setState({redirect_to: '/my_post'})
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        })
    }

    render(){
        // console.log(this.state.redirect_to)
        if(this.state.redirect_to != '') {
           return <Redirect to={this.state.redirect_to} />
        }

        const {id, title, content} = this.state.post_data;
        // console.log(content)
        const page_title = (id == '' ? 'Add Post' : 'Edit Post');
         return(
        <div className="col-md-4 mx-auto mt-5">
            <div className="card">
                <h2 className="text-center">{page_title}</h2>
                <div className="text-danger text-right small">
                    * All Fields are Required.
                </div>
                <form className="form" id="add_post_form" onSubmit={this.handlePostSubmit}>
                    <div className="form-group">
                        <label htmlFor="Title">Post Title</label>
                        <input type="text" name="title" className="form-control" value={title} onChange={this.handleAddPostChange} required />
                        <input type="hidden" name="id" value={id} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Blog">Content</label>
                        <textarea className="form-control" name="content" rows="10" onChange={this.handleAddPostChange} value={content}></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success btn-block">Create New Post</button>
                    </div>
                </form>
            </div>
        </div>
    )}
}