(this.webpackJsonpzprefix=this.webpackJsonpzprefix||[]).push([[0],{11:function(t,e,s){"use strict";s.r(e);var n=s(1),i=s.n(n),r=s(4),a=s(5),o=s(6),c=s(2),u=s(8),l=s(7),d=s(3),p=s.n(d),h=s(10),b=s.n(h),g=(s(17),s(0)),j=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(t){var n;return Object(a.a)(this,s),(n=e.call(this,t)).loginFuncton=n.loginFuncton.bind(Object(c.a)(n)),n}return Object(o.a)(s,[{key:"loginFuncton",value:function(t){var e=t.target.previousSibling.previousSibling.value,s=t.target.previousSibling.value;this.props.auth(e,s)}},{key:"render",value:function(){var t=this;return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"input-form ".concat(this.props.bad?"warning-login":""),children:[Object(g.jsx)("input",{placeholder:"Username"}),Object(g.jsx)("input",{placeholder:"Password",type:"password"}),Object(g.jsx)("button",{onClick:this.loginFuncton,children:"Login"}),Object(g.jsx)("button",{onClick:function(){return t.props.click()},children:"Create Account"})]})})})}}]),s}(p.a.Component),v=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(){return Object(a.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"render",value:function(){var t=this;return Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"input-form",children:[Object(g.jsx)("button",{onClick:function(){return t.props.getPosts()},children:"All Posts"}),Object(g.jsx)("button",{onClick:function(){return t.props.getPosts(t.props.user.id)},children:"Your Posts"}),Object(g.jsx)("button",{onClick:function(){return t.props.create()},children:"Create Post"}),Object(g.jsxs)("div",{children:["Welcome ",this.props.user.username,"!"]}),Object(g.jsx)("button",{onClick:this.props.logout,children:"Logout"})]})})}}]),s}(p.a.Component),f=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(t){var n;return Object(a.a)(this,s),(n=e.call(this,t)).createUser=n.createUser.bind(Object(c.a)(n)),n.state={badPassword:!1},n}return Object(o.a)(s,[{key:"createUser",value:function(){var t=Object(r.a)(i.a.mark((function t(e){var s,n,r,a,o;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=e.target,s=e.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.value,n=e.previousSibling.previousSibling.previousSibling.previousSibling.value,r=e.previousSibling.previousSibling.previousSibling.value,a=e.previousSibling.previousSibling.value,o=e.previousSibling.value,a===o){t.next=11;break}return this.setState({badPassword:!0}),t.abrupt("return");case 11:this.setState({badPassword:!1});case 12:this.props.create(s,n,r,a);case 13:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsx)("div",{style:{display:"flex",justifyContent:"space-around",width:"100%"},children:Object(g.jsxs)("div",{className:(this.state.badPassword?"warning-password":"")+" "+(this.props.bad?"warning-create":""),style:{display:"flex",justifyContent:"space-around",width:"200px",flexDirection:"column",marginTop:"60px"},children:[Object(g.jsx)("input",{placeholder:"first name"}),Object(g.jsx)("input",{placeholder:"last name"}),Object(g.jsx)("input",{placeholder:"username"}),Object(g.jsx)("input",{placeholder:"password",type:"password"}),Object(g.jsx)("input",{placeholder:"confirm password",type:"password"}),Object(g.jsx)("button",{onClick:this.createUser,children:"Create Account"})]})})}}]),s}(p.a.Component),O=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(){return Object(a.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"render",value:function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"header",children:[Object(g.jsx)("div",{className:"brand-name",children:"Tiger Blog"}),this.props.auth?Object(g.jsx)(v,{create:this.props.create,getPosts:this.props.getPosts,logout:this.props.logout,user:this.props.auth}):Object(g.jsx)(j,{bad:this.props.bad,auth:this.props.setauth,click:this.props.click})]})})}}]),s}(p.a.Component),x=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(t){var n;return Object(a.a)(this,s),(n=e.call(this,t)).state={edit:void 0===t.blog},n.editContent=n.editContent.bind(Object(c.a)(n)),n.deleteContent=n.deleteContent.bind(Object(c.a)(n)),n.createContent=n.createContent.bind(Object(c.a)(n)),n}return Object(o.a)(s,[{key:"createContent",value:function(t){var e={content:t.target.parentNode.previousSibling.innerText,title:t.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText};this.props.blogFunction.create(e)}},{key:"editContent",value:function(t){if(this.state.edit){this.setState({edit:!1});var e={id:this.props.blog.id,content:t.target.parentNode.previousSibling.innerText,title:t.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText};this.props.blogFunction.edit(e)}else this.setState({edit:!0})}},{key:"deleteContent",value:function(){this.props.blogFunction.delete(this.props.blog.id)}},{key:"render",value:function(){var t=this,e={backgroundColor:"#CCC",border:"1px solid black",borderRadius:"10px"};return e=void 0===this.props.blog||this.state.edit?e:{},Object(g.jsxs)("div",{className:"blog-post",children:[Object(g.jsx)("div",{style:e,contentEditable:void 0===this.props.blog||this.state.edit,className:"blog-title",children:void 0===this.props.blog?"":this.props.blog.title}),Object(g.jsxs)("div",{children:["Created By: ",void 0===this.props.blog?"":this.props.blog.bloguser.username]}),Object(g.jsx)("div",{children:void 0===this.props.blog?"":this.props.blog.createdAt}),Object(g.jsx)("div",{style:e,contentEditable:void 0===this.props.blog||this.state.edit,children:void 0===this.props.blog?"":this.props.blog.content}),Object(g.jsxs)("div",{className:"blog-post-buttons",children:[Object(g.jsx)("button",{onClick:function(){return t.props.click(void 0)},children:"Back to Posts"}),void 0===this.props.blog?Object(g.jsx)("button",{onClick:this.createContent,children:"Create"}):this.props.auth.id===this.props.blog.bloguserId?Object(g.jsx)("button",{onClick:this.editContent,children:this.state.edit?"Save Changes":"Edit Post"}):"",void 0===this.props.blog?"":this.props.auth.id===this.props.blog.bloguserId?Object(g.jsx)("button",{onClick:this.deleteContent,children:"Delete Post"}):""]})]})}}]),s}(p.a.Component),y=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(){return Object(a.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"selectBlog",value:function(t){this.props.click(t)}},{key:"render",value:function(){var t=this;return Object(g.jsx)("div",{className:"blog-display",children:this.props.blogs.map((function(e){return Object(g.jsxs)("div",{className:"blog-item noselect",onClick:function(){return t.selectBlog(e.id)},children:[Object(g.jsx)("div",{className:"blog-title",children:e.title}),Object(g.jsx)("div",{children:e.createdAt}),Object(g.jsx)("div",{children:e.bloguser.username}),Object(g.jsx)("div",{children:e.content.length>100?e.content.substring(0,101)+"...":e.content})]},e.id)}))})}}]),s}(p.a.Component),k=function(t){Object(u.a)(s,t);var e=Object(l.a)(s);function s(t){var n;return Object(a.a)(this,s),(n=e.call(this,t)).state={testBlogs:[],selectedBlog:void 0,authenticated:!1,createUser:!1,badLogin:!1,badCreate:!1},n.setDisplayedBlog=n.setDisplayedBlog.bind(Object(c.a)(n)),n.flipCreateAccount=n.flipCreateAccount.bind(Object(c.a)(n)),n.setAuthentication=n.setAuthentication.bind(Object(c.a)(n)),n.logoutUser=n.logoutUser.bind(Object(c.a)(n)),n.getPosts=n.getPosts.bind(Object(c.a)(n)),n.displayCreateBlog=n.displayCreateBlog.bind(Object(c.a)(n)),n.editBlog=n.editBlog.bind(Object(c.a)(n)),n.deleteBlog=n.deleteBlog.bind(Object(c.a)(n)),n.createBlog=n.createBlog.bind(Object(c.a)(n)),n.createAccount=n.createAccount.bind(Object(c.a)(n)),n}return Object(o.a)(s,[{key:"setAuthentication",value:function(){var t=Object(r.a)(i.a.mark((function t(e,s){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:s})});case 2:if(200!==(n=t.sent).status){t.next=12;break}return this.setState({badLogin:!1}),t.next=7,n.json();case 7:n=t.sent,this.setState({authenticated:{username:n.user,id:n.id}}),this.getPosts(n.id),t.next=13;break;case 12:this.setState({badLogin:!0});case 13:case"end":return t.stop()}}),t,this)})));return function(e,s){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){document.title="VZ Blog",this.checkAuthentication(),this.getPosts(this.state.authenticated.id)}},{key:"getPosts",value:function(){var t=Object(r.a)(i.a.mark((function t(e){var s,n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s="/posts",void 0!==e&&(s+="/"+e),t.next=4,fetch(s);case 4:return n=t.sent,t.next=7,n.json();case 7:n=t.sent,this.setState({testBlogs:n.outBlogs});case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"checkAuthentication",value:function(){var t=Object(r.a)(i.a.mark((function t(){var e,s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/login/auth");case 2:return e=t.sent,s=e.status,t.next=6,e.json();case 6:e=t.sent,200===s&&this.setState({authenticated:{username:e.user,id:e.id}});case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"setDisplayedBlog",value:function(t){this.setState({selectedBlog:t})}},{key:"logoutUser",value:function(){var t=Object(r.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/logout");case 2:200===t.sent.status&&(this.setState({authenticated:!1,selectedBlog:void 0}),this.getPosts());case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"flipCreateAccount",value:function(){var t=!this.state.createUser;this.setState({createUser:t})}},{key:"createAccount",value:function(){var t=Object(r.a)(i.a.mark((function t(e,s,n,r){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:e,lastName:s,username:n,password:r})});case 2:if(201!==t.sent.status){t.next=7;break}this.setState({badCreate:!1}),t.next=9;break;case 7:return this.setState({badCreate:!0}),t.abrupt("return");case 9:this.setState({createUser:!1});case 10:case"end":return t.stop()}}),t,this)})));return function(e,s,n,i){return t.apply(this,arguments)}}()},{key:"createBlog",value:function(){var t=Object(r.a)(i.a.mark((function t(e){var s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/blog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return s=t.sent,t.next=5,s.json();case 5:s=t.sent,this.setState({testBlogs:s,selectedBlog:void 0});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"editBlog",value:function(){var t=Object(r.a)(i.a.mark((function t(e){var s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/post/"+e.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return s=t.sent,t.next=5,s.json();case 5:s=t.sent,this.setState({testBlogs:s});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"deleteBlog",value:function(){var t=Object(r.a)(i.a.mark((function t(e){var s;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/post/"+e,{method:"DELETE"});case 2:return s=t.sent,t.next=5,s.json();case 5:s=t.sent,this.setState({testBlogs:s,selectedBlog:void 0});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"displayCreateBlog",value:function(){this.setState({selectedBlog:"create"})}},{key:"render",value:function(){var t=this;return Object(g.jsxs)("div",{children:[Object(g.jsx)(O,{bad:this.state.badLogin,create:this.displayCreateBlog,logout:this.logoutUser,getPosts:this.getPosts,setauth:this.setAuthentication,click:this.flipCreateAccount,auth:this.state.authenticated}),void 0===this.state.selectedBlog||this.state.createUser?"":Object(g.jsx)(x,{auth:this.state.authenticated,blog:this.state.testBlogs.find((function(e){return e.id===t.state.selectedBlog})),click:this.setDisplayedBlog,blogFunction:{edit:this.editBlog,delete:this.deleteBlog,create:this.createBlog}}),void 0!==this.state.selectedBlog||this.state.createUser?"":Object(g.jsx)(y,{blogs:this.state.testBlogs,click:this.setDisplayedBlog}),this.state.createUser?Object(g.jsx)(f,{bad:this.state.badCreate,create:this.createAccount}):""]})}}]),s}(p.a.Component);b.a.render(Object(g.jsx)(k,{}),document.getElementById("root"))},17:function(t,e,s){}},[[11,1,2]]]);
//# sourceMappingURL=main.da43cfb3.chunk.js.map