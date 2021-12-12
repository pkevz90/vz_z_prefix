
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.loginFuncton = this.loginFuncton.bind(this)
  }
  loginFuncton(action) {
    let username = action.target.previousSibling.previousSibling.value
    let password = action.target.previousSibling.value
    this.props.auth(username, password)
  }
  render () {
    return (
      <>
        <div>
          <div className="input-form">
            <input placeholder="Username"/>
            <input placeholder="Password" type="password"/>
            <button onClick={this.loginFuncton}>Login</button>
            <button onClick={() => this.props.click()}>Create Account</button>
          </div>
        </div>
      </>
    )
  }
}

class UserDisplay extends React.Component {
  render() {
    return (
      <div>
        <div className="input-form">
          <button onClick={() => this.props.getPosts()}>All Posts</button>
          <button onClick={() => this.props.getPosts(this.props.user)}>Your Posts</button>
          <button onClick={() => this.props.create()}>Create Post</button>
          <div>Welcome {this.props.user}!</div>
          <button onClick={this.props.logout}>Logout</button>
        </div>

      </div>
    )
  }
}

class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.createUser = this.createUser.bind(this)
  }
  async createUser(button) {
    button = button.target
    let username = button.previousSibling.previousSibling.previousSibling.value
    let password = button.previousSibling.previousSibling.value
    let password_check = button.previousSibling.value
    if (password !== password_check) return
    this.props.create(username, password)

  }
  render() {
    let outerStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%'
    }

    let innerStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      width: '200px',
      flexDirection: 'column',
      marginTop: '60px'
    }
    return (
      <div style={outerStyle}>
        <div style={innerStyle}>
          <input placeholder="username"/>
          <input placeholder="password" type="password"/>
          <input placeholder="confirm password" type="password"/>
          <button onClick={this.createUser}>Create Account</button>
        </div>
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header">
          <div className="brand-name">
            Tiger Blog
          </div>
          {this.props.auth ? <UserDisplay create={this.props.create} getPosts={this.props.getPosts} logout={this.props.logout} user={this.props.auth}></UserDisplay> : <Login auth={this.props.setauth} click={this.props.click}/>}
        </div>
      </>
    )
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: props.blog === undefined ? true : false
    }
    this.editContent = this.editContent.bind(this)
    this.deleteContent = this.deleteContent.bind(this)
    this.createContent = this.createContent.bind(this)
  }
  createContent(button) {
    let newBlog = {
      content: button.target.parentNode.previousSibling.innerText,
      subject: button.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText
    }
    this.props.blogFunction.create(newBlog)
  }
  editContent(button) {
    if (!this.state.edit) {
      this.setState({
        edit: true
      })
      return
    }
    else {
      this.setState({
        edit: false
      })

    }
    let newBlog = {
      id: this.props.blog.id,
      content: button.target.parentNode.previousSibling.innerText,
      dateCreated: this.props.blog.dateCreated,
      user: this.props.blog.user,
      subject: button.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText
    }
    this.props.blogFunction.edit(newBlog)
  }
  deleteContent() {
    this.props.blogFunction.delete(this.props.blog.id)
  }
  render() {
    let contentStyle = {
      backgroundColor: '#CCC',
      border: '1px solid black',
      borderRadius: '10px'
    }
    contentStyle = this.props.blog === undefined  || this.state.edit ? contentStyle : {}
    return (
      <div className="blog-post">
        <div style={contentStyle} contentEditable={this.props.blog === undefined ? true : this.state.edit} className="blog-title">{this.props.blog === undefined ? '' :  this.props.blog.subject}</div>
        <div>Created By: {this.props.blog === undefined ? '' : this.props.blog.user}</div>
        <div>{this.props.blog === undefined ? '' : this.props.blog.createdAt}</div>
        <div style={contentStyle} contentEditable={this.props.blog === undefined ? true : this.state.edit}>{this.props.blog === undefined ? '' : this.props.blog.content}</div>
        <div className="blog-post-buttons">
            <button onClick={() => this.props.click(undefined)}>Back to Posts</button>
            {this.props.blog === undefined ? <button onClick={this.createContent}>Create</button> : this.props.auth === this.props.blog.user ? <button onClick={this.editContent}>{this.state.edit ? 'Save Changes' : 'Edit Post'}</button> : ''}
            {this.props.blog === undefined ? '' : this.props.auth === this.props.blog.user ? <button onClick={this.deleteContent}>Delete Post</button> : ''}
        </div>
      </div>
    )
  }
}

class BlogDisplay extends React.Component {
  selectBlog(blog) {
    this.props.click(blog)
  }
  render() {
    return (
      <div className="blog-display">
        {this.props.blogs.map((blog) => {
          return (
            <div className="blog-item noselect" key={blog.id} onClick={() => this.selectBlog(blog.id)}>
              <div className="blog-title">{blog.subject}</div>
              <div>{blog.createdAt}</div>
              <div>{blog.user}</div>
              <div>{blog.content.substring(0,101)}...</div>
            </div>
          )
        })}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testBlogs: [],
      selectedBlog: undefined,
      authenticated: false,
      createUser: false
    }
    
    this.setDisplayedBlog = this.setDisplayedBlog.bind(this)
    this.flipCreateAccount = this.flipCreateAccount.bind(this)
    this.setAuthentication = this.setAuthentication.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.displayCreateBlog = this.displayCreateBlog.bind(this)
    this.editBlog = this.editBlog.bind(this)
    this.deleteBlog = this.deleteBlog.bind(this)
    this.createBlog = this.createBlog.bind(this)
    this.createAccount = this.createAccount.bind(this)
  }
  async setAuthentication(username, password) {
    let response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    if (response.status === 201) {
      this.setState({authenticated: username})
      response = await response.json()
      window.localStorage.setItem('jwt', response)
      this.getPosts(username)
    }
    
  }
  componentDidMount() {
    this.checkAuthentication()
    this.getPosts()
  }
  async getPosts(user) {
    let link = '/posts'
    if (user !== undefined) link += '/' + user
    // console.log(link);
    let response = await fetch(link)
    response = await response.json()
    // console.log(response);
    this.setState({
      testBlogs: response.outBlogs
    })
  }
  async checkAuthentication() {
    if (!window.localStorage.getItem('jwt')) return
    let response = await fetch('/login/auth', {
      headers: {
        'authorization': 'Bearer ' + window.localStorage.getItem('jwt')
      }
    })
    let status = response.status
    response = await response.json()
    if (status === 201) {
      this.setState({
        authenticated: response.user
      })
    }
    
  }
  setDisplayedBlog(blog) {
    this.setState({selectedBlog: blog})
  }
  logoutUser() {
    window.localStorage.removeItem('jwt')
    this.setState({
      authenticated: false,
      selectedBlog: undefined
    })
    this.getPosts()
  }
  flipCreateAccount() {
    console.log(1);
    let old = !this.state.createUser;
    this.setState({createUser: old})
  }
  async createAccount(username, password) {
    let response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    if (response.status === 201) {
      console.log('success');
    }
    else {
      console.log('failure');
      return
    }
    this.setState({
      createUser: false
    })
  }
  async createBlog(newBlog) {
    let response = await fetch('/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('jwt')
      },
      body: JSON.stringify(newBlog)
    })
    response = await response.json()
    this.setState({
      testBlogs: response,
      selectedBlog: undefined
    })
  }
  async editBlog(newBlog) {
    let response = await fetch('/post/' + newBlog.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('jwt')
      },
      body: JSON.stringify(newBlog)
    })
    response = await response.json()
    this.setState({
      testBlogs: response
    })
  }
  async deleteBlog(id) {
    let response = await fetch('/post/' + id, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + window.localStorage.getItem('jwt')
      },
    })
    response = await response.json()
    console.log(response);
    this.setState({
      testBlogs: response,
      selectedBlog: undefined
    })

  }
  displayCreateBlog() {
    this.setState({
      selectedBlog: 'create'
    })
  }
  render() {
    return (
      <div>
        <Header create={this.displayCreateBlog} logout={this.logoutUser} getPosts={this.getPosts} setauth={this.setAuthentication} click={this.flipCreateAccount} auth={this.state.authenticated}/>
        {this.state.selectedBlog !== undefined && !this.state.createUser ? <BlogPost auth={this.state.authenticated} blog={this.state.testBlogs.find(blog => blog.id ===this.state.selectedBlog)} click={this.setDisplayedBlog} blogFunction={{edit: this.editBlog, delete: this.deleteBlog, create: this.createBlog}}/> : ''}
        {this.state.selectedBlog === undefined && !this.state.createUser ? <BlogDisplay blogs={this.state.testBlogs} click={this.setDisplayedBlog}/>: ''}
        {this.state.createUser ? <CreateUser create={this.createAccount}/> : ''}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
