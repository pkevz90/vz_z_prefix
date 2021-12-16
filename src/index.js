
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
          <div className={`input-form ${this.props.bad ? 'warning-login' : ''}`}>
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
          <button onClick={() => this.props.getPosts(this.props.user.id)}>Your Posts</button>
          <button onClick={() => this.props.create()}>Create Post</button>
          <div>Welcome {this.props.user.username}!</div>
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
    this.state = {
      badPassword: false
    }
  }
  async createUser(button) {
    button = button.target
    let firstName = button.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value
    let lastName = button.previousSibling.previousSibling.previousSibling.previousSibling.value
    let username = button.previousSibling.previousSibling.previousSibling.value
    let password = button.previousSibling.previousSibling.value
    let password_check = button.previousSibling.value
    if (password !== password_check) {
      this.setState({
        badPassword: true
      })
      return
    }
    else {
      this.setState({
        badPassword: false
      })
    }
    this.props.create(firstName, lastName, username, password)

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
        <div className={(this.state.badPassword ? 'warning-password' :'')+ ' ' + (this.props.bad ? 'warning-create' :'')} style={innerStyle}>
          <input placeholder="first name"/>
          <input placeholder="last name"/>
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
          {this.props.auth ? <UserDisplay create={this.props.create} getPosts={this.props.getPosts} logout={this.props.logout} user={this.props.auth}></UserDisplay> : <Login bad={this.props.bad} auth={this.props.setauth} click={this.props.click}/>}
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
      title: button.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText
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
      title: button.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText
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
    let date = this.props.blog === undefined ? '' : (new Date(this.props.blog.createdAt)).toString().split('GMT')[0]
    return (
      <div className="blog-post">
        {this.props.blog === undefined ? <div>Title:</div> : ''}
        <div style={contentStyle} contentEditable={this.props.blog === undefined ? true : this.state.edit} className="blog-title">{this.props.blog === undefined ? '' :  this.props.blog.title}</div>
        <div>{this.props.blog === undefined ? 'Content:' : 'Created By: ' + this.props.blog.bloguser.username}</div>
        <div>{this.props.blog === undefined ? '' : date}</div>
        <div style={contentStyle} contentEditable={this.props.blog === undefined ? true : this.state.edit}>{this.props.blog === undefined ? '' : this.props.blog.content}</div>
        <div className="blog-post-buttons">
            <button onClick={() => this.props.click(undefined)}>Back to Posts</button>
            {this.props.blog === undefined ? <button onClick={this.createContent}>Create</button> : this.props.auth.id === this.props.blog.bloguserId ? <button onClick={this.editContent}>{this.state.edit ? 'Save Changes' : 'Edit Post'}</button> : ''}
            {this.props.blog === undefined ? '' : this.props.auth.id === this.props.blog.bloguserId ? <button onClick={this.deleteContent}>Delete Post</button> : ''}
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
              <div className="blog-title">{blog.title}</div>
              <div>{(new Date(blog.createdAt)).toString().split('GMT')[0]}</div>
              <div>{'Author: ' + blog.bloguser.username}</div>
              <div>{blog.content.length > 100 ? blog.content.substring(0,101) + '...' : blog.content}</div>
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
      createUser: false,
      badLogin: false,
      badCreate: false
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
    if (response.status === 200) {
      this.setState({
        badLogin: false
      })
      response = await response.json()
      this.setState({authenticated: {
        username: response.user,
        id: response.id
      }})
      this.getPosts(response.id)
    }
    else {
      this.setState({
        badLogin: true
      })
    }
    
  }
  componentDidMount() {
    document.title = 'VZ Blog'
    this.checkAuthentication()
    this.getPosts(this.state.authenticated.id)
  }
  async getPosts(userid) {
    let link = '/posts'
    if (userid !== undefined) link += '/' + userid
    let response = await fetch(link)
    response = await response.json()
    this.setState({
      testBlogs: response.outBlogs
    })
  }
  async checkAuthentication() {
    let response = await fetch('/login/auth')
    let status = response.status
    if (status === 200) {
      response = await response.json()
      this.setState({
        authenticated: {
          username: response.user,
          id: response.id
        }
      })
    }
    
  }
  setDisplayedBlog(blog) {
    this.setState({selectedBlog: blog})
  }
  async logoutUser() {
    let response = await fetch('/logout')
    if (response.status === 200) {
      this.setState({
        authenticated: false,
        selectedBlog: undefined
      })
      this.getPosts()
    }
  }
  flipCreateAccount() {
    let old = !this.state.createUser;
    this.setState({createUser: old})
  }
  async createAccount(firstName, lastName, username, password) {
    let response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName, lastName, username, password})
    })
    if (response.status === 201) {
      response = await response.json()
      this.setState({
        badCreate: false,
        authenticated: {
          username: response.user,
          id: response.id
        }
      })

    }
    else {
      this.setState({
        badCreate: true
      })
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
       },
      body: JSON.stringify(newBlog)
    })
    if (response.status !== 201) {
      this.setState({
        authenticated: false
      })
      return
    }
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    })
    if (response.status !== 201) {
      this.setState({
        authenticated: false
      })
      return
    }
    response = await response.json()
    this.setState({
      testBlogs: response
    })
  }
  async deleteBlog(id) {
    let response = await fetch('/post/' + id, {
      method: 'DELETE'
    })
    if (response.status !== 201) {
      this.setState({
        authenticated: false
      })
      return
    }
    response = await response.json()
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
        <Header bad={this.state.badLogin} create={this.displayCreateBlog} logout={this.logoutUser} getPosts={this.getPosts} setauth={this.setAuthentication} click={this.flipCreateAccount} auth={this.state.authenticated}/>
        {this.state.selectedBlog !== undefined && !this.state.createUser ? <BlogPost auth={this.state.authenticated} blog={this.state.testBlogs.find(blog => blog.id ===this.state.selectedBlog)} click={this.setDisplayedBlog} blogFunction={{edit: this.editBlog, delete: this.deleteBlog, create: this.createBlog}}/> : ''}
        {this.state.selectedBlog === undefined && !this.state.createUser ? <BlogDisplay blogs={this.state.testBlogs} click={this.setDisplayedBlog}/>: ''}
        {this.state.createUser ? <CreateUser bad={this.state.badCreate} create={this.createAccount}/> : ''}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
