import logo from './logo.svg';
import axios from 'axios';
import {Component} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';

export class Posts extends Component {
    constructor(props) {
        super(props);
        const posts = {};
        this.state = posts;
        var id ;
    }

    componentDidMount() {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        this.id = params.get('id');
        console.log(this.id)
        this.id = this.id ? this.id.trim() : '';
        console.log(this.id);

        if(this.id != '') {
            const api_url = axios.defaults.baseURL + 'posts.php';
            axios.post(api_url, {id: this.id})
            .then(res=> {
                const response = res.data;
                console.log(response);
    
                if(response.error === 'true') {
                    this.props.showErrorMsg(response.msg);
                }
                else if(response.notice === 'true') {
                    this.setState(response.data)
                }
            })
            .catch(function (err) {
                console.log(err);
            })
        }
        else {
            const api_url = (axios.defaults.baseURL + 'posts.php');
            axios.post(api_url)
            .then(res => {
                const response = res.data;
                console.log(response);
        
                if(response.error === 'true') {
                    this.setState({})
                }
                else if(response.notice === 'true') {
                    this.setState(response.data)
                }
    
                return true;
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    render() {
        const posts = this.state;
        console.log(posts)
        if(this.id) {
            return(
                <div className="col-md-12 mx-auto">
                    <h1 className="text-center ">All Posts</h1>
                    <OnePost post = {posts} edit = {false} />
                </div>
            )
        }
        else {
            return(
                <div className="col-md-12 mx-auto">
                    <h1 className="text-center ">All Posts</h1>
                    <RenderPosts posts = {posts} edit = {false}  />
                </div>
            )
        }
    }
}



export default class MyPost extends Component {
    constructor(props) {
        super(props);
        var posts = {};
        const redirect_to = '';
        this.state = {posts, redirect_to};
        this.deletePost = this.deletePost.bind(this);
    }

     deletePost(id) {
        console.log(id)

        if(typeof id == 'undefined' || id == '') {
            return false;
        }

        console.log("i ma here");
    
        const api_url = (axios.defaults.baseURL + 'my_post.php');
        axios.post(api_url, {callback: 'delete_post', id: id})
        .then(res => {
            const response = res.data;
            console.log(response);
    
            if(response.error === 'true') {
                console.log(response.msg)
                this.props.showErrorMsg(response.msg)
            }
            else if(response.notice === 'true') {
                this.props.showSuccessMsg(response.msg)
                this.setState({redirect_to: '/my_post'})
            }
            
        })
        .catch(function (error) {
            // console.log(error)
        })
    }

    componentDidMount() {
        const api_url = (axios.defaults.baseURL + 'my_post.php');
        axios.post(api_url)
        .then(res => {
            // console.log(res);
            const response = res.data;
            console.log(response);
    
            if(response.error === 'true') {
                this.setState({posts: {}})
            }
            else if(response.notice === 'true') {
                this.setState({posts: response.data})
            }
            return true;
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    
    render(){
        if(this.state.redirect_to != '') {
            return <MyPost />
        }

        const posts = this.state.posts;
        console.log(posts)
        return(
            <div className="col-md-12 mx-auto">
                <h1 className="text-center ">My Posts</h1>
                <RenderPosts posts = {posts} edit = {true} deletePost={this.deletePost} />
            </div>
        )
    }
}

function RenderPosts (props) {
    // console.log(posts);
    const posts = props.posts;
    const edit = props.edit;
    let total = Object.keys(posts).length;
    console.log(total);

    if(total == 0) {
        return <p className="text-center h2 text-info">No Posts available.</p>;
    }

    return(
        <div className="row">
            {
                Object.keys(posts).map(i => {
                    return <PostSnippet post={posts[i]} key={i} edit={edit} deletePost={props.deletePost} />
                })
            }
        </div>
    )
}

function PostSnippet (props) {
    console.log(props)
    const post = props.post;
    const edit = props.edit;

    return(
        <div className="col-md-3 mt-3">
            <div className="card p-2">
                <div className="mb-2 ">
                    <table className="w-100">
                        <tbody>
                            <tr>
                                <td key="1" width="75px"><img src={logo} width="75px" className="img img-rounded"></img></td>
                                <td key="2" className="text-left"><a href="#" className="nav-link d-inline-block">Nanraj</a></td>
                                {edit &&
                                    <td className="text-right" key="3">
                                        <ul className="nav justify-content-end element-actions">
                                            <li className="nav-item pr-1"><Link to={`/add_post?id=${post.id}`} className=" nav-link d-inline-block p-0 "><button className="btn btn-sm btn-primary">Edit</button></Link></li>
                                            <li className="nav-item"><button className="btn btn-sm btn-danger" onClick={()=> { props.deletePost(post.id) }}>Delete</button></li>
                                        </ul>
                                    </td>
                                }
                            </tr>
                        </tbody>
                    </table> 
                </div>
                <Link to={`/one_post?id=${post.id}`} className="d-block single-post" >
                <h3>{post.title}</h3>
                <div className="post-thumbnail mb-3" style={{ backgroundImage: "url('image1.jpg')" }}></div>
                <p className="text-dark">{post.content}</p>
                </Link>
            </div>
        </div>
    )
}

const OnePost = ({post, edit}) => {
    console.log(post)
    return(
        <div className="col-md-9 mt-3 mx-auto">
            <div className="card p-2">
                <div className="mb-2 ">
                    <table className="w-100">
                        <tbody>
                            <tr>
                                <td key="1" width="75px"><img src={logo} width="75px" className="img img-rounded"></img></td>
                                <td key="2" className="text-left"><a href="#" className="nav-link d-inline-block">Nanraj</a></td>
                                {edit &&
                                    <td className="text-right" key="3"><Link to={`/add_post?id=${post.id}`} className="nav-link d-inline-block  ">Edit</Link></td>
                                }
                            </tr>
                        </tbody>
                    </table> 
                </div>
                <h3>{post.title}</h3>
                <div className="post-thumbnail mb-3" style={{ backgroundImage: "url('image1.jpg')" }}></div>
                <p className="text-dark">{post.content}</p>
            </div>
        </div>
    )
}

