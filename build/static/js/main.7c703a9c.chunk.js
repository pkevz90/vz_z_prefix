(this.webpackJsonpzprefix=this.webpackJsonpzprefix||[]).push([[0],{11:function(t,e,n){"use strict";n.r(e);var s=n(2),r=n.n(s),i=n(4),o=n(5),a=n(6),c=n(1),l=n(8),u=n(7),p=n(3),d=n.n(p),h=n(10),b=n.n(h),j=(n(17),n(0)),g=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(o.a)(this,n),(s=e.call(this,t)).loginFuncton=s.loginFuncton.bind(Object(c.a)(s)),s}return Object(a.a)(n,[{key:"loginFuncton",value:function(t){var e=t.target.previousSibling.previousSibling.value,n=t.target.previousSibling.value;this.props.auth(e,n)}},{key:"render",value:function(){var t=this;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"input-form",children:[Object(j.jsx)("input",{placeholder:"Username"}),Object(j.jsx)("input",{placeholder:"Password",type:"password"}),Object(j.jsx)("button",{onClick:this.loginFuncton,children:"Login"}),Object(j.jsx)("button",{onClick:function(){return t.props.click()},children:"Create Account"})]})})})}}]),n}(d.a.Component),v=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this;return Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"input-form",children:[Object(j.jsx)("button",{onClick:function(){return t.props.getPosts()},children:"All Posts"}),Object(j.jsx)("button",{onClick:function(){return t.props.getPosts(t.props.user)},children:"Your Posts"}),Object(j.jsx)("button",{onClick:function(){return t.props.create()},children:"Create Post"}),Object(j.jsxs)("div",{children:["Welcome ",this.props.user,"!"]}),Object(j.jsx)("button",{onClick:this.props.logout,children:"Logout"})]})})}}]),n}(d.a.Component),f=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(o.a)(this,n),(s=e.call(this,t)).createUser=s.createUser.bind(Object(c.a)(s)),s}return Object(a.a)(n,[{key:"createUser",value:function(){var t=Object(i.a)(r.a.mark((function t(e){var n,s,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=e.target,n=e.previousSibling.previousSibling.previousSibling.value,s=e.previousSibling.previousSibling.value,i=e.previousSibling.value,s===i){t.next=6;break}return t.abrupt("return");case 6:this.props.create(n,s);case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(j.jsx)("div",{style:{display:"flex",justifyContent:"space-around",width:"100%"},children:Object(j.jsxs)("div",{style:{display:"flex",justifyContent:"space-around",width:"200px",flexDirection:"column",marginTop:"60px"},children:[Object(j.jsx)("input",{placeholder:"username"}),Object(j.jsx)("input",{placeholder:"password",type:"password"}),Object(j.jsx)("input",{placeholder:"confirm password",type:"password"}),Object(j.jsx)("button",{onClick:this.createUser,children:"Create Account"})]})})}}]),n}(d.a.Component),O=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"header",children:[Object(j.jsx)("div",{className:"brand-name",children:"Tiger Blog"}),this.props.auth?Object(j.jsx)(v,{create:this.props.create,getPosts:this.props.getPosts,logout:this.props.logout,user:this.props.auth}):Object(j.jsx)(g,{auth:this.props.setauth,click:this.props.click})]})})}}]),n}(d.a.Component),x=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(o.a)(this,n),(s=e.call(this,t)).state={edit:void 0===t.blog},s.editContent=s.editContent.bind(Object(c.a)(s)),s.deleteContent=s.deleteContent.bind(Object(c.a)(s)),s.createContent=s.createContent.bind(Object(c.a)(s)),s}return Object(a.a)(n,[{key:"createContent",value:function(t){var e={content:t.target.parentNode.previousSibling.innerText,subject:t.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText};this.props.blogFunction.create(e)}},{key:"editContent",value:function(t){if(this.state.edit){this.setState({edit:!1});var e={id:this.props.blog.id,content:t.target.parentNode.previousSibling.innerText,dateCreated:this.props.blog.dateCreated,user:this.props.blog.user,subject:t.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerText};this.props.blogFunction.edit(e)}else this.setState({edit:!0})}},{key:"deleteContent",value:function(){this.props.blogFunction.delete(this.props.blog.id)}},{key:"render",value:function(){var t=this,e={backgroundColor:"#CCC",border:"1px solid black",borderRadius:"10px"};return e=void 0===this.props.blog||this.state.edit?e:{},Object(j.jsxs)("div",{className:"blog-post",children:[Object(j.jsx)("div",{style:e,contentEditable:void 0===this.props.blog||this.state.edit,className:"blog-title",children:void 0===this.props.blog?"":this.props.blog.subject}),Object(j.jsxs)("div",{children:["Created By: ",void 0===this.props.blog?"":this.props.blog.user]}),Object(j.jsx)("div",{children:void 0===this.props.blog?"":this.props.blog.createdAt}),Object(j.jsx)("div",{style:e,contentEditable:void 0===this.props.blog||this.state.edit,children:void 0===this.props.blog?"":this.props.blog.content}),Object(j.jsxs)("div",{className:"blog-post-buttons",children:[Object(j.jsx)("button",{onClick:function(){return t.props.click(void 0)},children:"Back to Posts"}),void 0===this.props.blog?Object(j.jsx)("button",{onClick:this.createContent,children:"Create"}):this.props.auth===this.props.blog.user?Object(j.jsx)("button",{onClick:this.editContent,children:this.state.edit?"Save Changes":"Edit Post"}):"",void 0===this.props.blog?"":this.props.auth===this.props.blog.user?Object(j.jsx)("button",{onClick:this.deleteContent,children:"Delete Post"}):""]})]})}}]),n}(d.a.Component),y=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"selectBlog",value:function(t){this.props.click(t)}},{key:"render",value:function(){var t=this;return Object(j.jsx)("div",{className:"blog-display",children:this.props.blogs.map((function(e){return Object(j.jsxs)("div",{className:"blog-item noselect",onClick:function(){return t.selectBlog(e.id)},children:[Object(j.jsx)("div",{className:"blog-title",children:e.subject}),Object(j.jsx)("div",{children:e.createdAt}),Object(j.jsx)("div",{children:e.user}),Object(j.jsxs)("div",{children:[e.content.substring(0,101),"..."]})]},e.id)}))})}}]),n}(d.a.Component),k=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(o.a)(this,n),(s=e.call(this,t)).state={testBlogs:[],selectedBlog:void 0,authenticated:!1,createUser:!1},s.setDisplayedBlog=s.setDisplayedBlog.bind(Object(c.a)(s)),s.flipCreateAccount=s.flipCreateAccount.bind(Object(c.a)(s)),s.setAuthentication=s.setAuthentication.bind(Object(c.a)(s)),s.logoutUser=s.logoutUser.bind(Object(c.a)(s)),s.getPosts=s.getPosts.bind(Object(c.a)(s)),s.displayCreateBlog=s.displayCreateBlog.bind(Object(c.a)(s)),s.editBlog=s.editBlog.bind(Object(c.a)(s)),s.deleteBlog=s.deleteBlog.bind(Object(c.a)(s)),s.createBlog=s.createBlog.bind(Object(c.a)(s)),s.createAccount=s.createAccount.bind(Object(c.a)(s)),s}return Object(a.a)(n,[{key:"setAuthentication",value:function(){var t=Object(i.a)(r.a.mark((function t(e,n){var s;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})});case 2:if(201!==(s=t.sent).status){t.next=10;break}return this.setState({authenticated:e}),t.next=7,s.json();case 7:s=t.sent,window.localStorage.setItem("jwt",s),this.getPosts(e);case 10:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.checkAuthentication(),this.getPosts()}},{key:"getPosts",value:function(){var t=Object(i.a)(r.a.mark((function t(e){var n,s;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="/posts",void 0!==e&&(n+="/"+e),t.next=4,fetch(n);case 4:return s=t.sent,t.next=7,s.json();case 7:s=t.sent,this.setState({testBlogs:s.outBlogs});case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"checkAuthentication",value:function(){var t=Object(i.a)(r.a.mark((function t(){var e,n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(window.localStorage.getItem("jwt")){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,fetch("/login/auth",{headers:{authorization:"Bearer "+window.localStorage.getItem("jwt")}});case 4:return e=t.sent,n=e.status,t.next=8,e.json();case 8:e=t.sent,201===n&&this.setState({authenticated:e.user});case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"setDisplayedBlog",value:function(t){this.setState({selectedBlog:t})}},{key:"logoutUser",value:function(){window.localStorage.removeItem("jwt"),this.setState({authenticated:!1,selectedBlog:void 0}),this.getPosts()}},{key:"flipCreateAccount",value:function(){console.log(1);var t=!this.state.createUser;this.setState({createUser:t})}},{key:"createAccount",value:function(){var t=Object(i.a)(r.a.mark((function t(e,n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:n})});case 2:if(201!==t.sent.status){t.next=7;break}console.log("success"),t.next=9;break;case 7:return console.log("failure"),t.abrupt("return");case 9:this.setState({createUser:!1});case 10:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"createBlog",value:function(){var t=Object(i.a)(r.a.mark((function t(e){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/blog",{method:"POST",headers:{"Content-Type":"application/json",authorization:"Bearer "+window.localStorage.getItem("jwt")},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:n=t.sent,this.setState({testBlogs:n,selectedBlog:void 0});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"editBlog",value:function(){var t=Object(i.a)(r.a.mark((function t(e){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/post/"+e.id,{method:"PUT",headers:{"Content-Type":"application/json",authorization:"Bearer "+window.localStorage.getItem("jwt")},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:n=t.sent,this.setState({testBlogs:n});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"deleteBlog",value:function(){var t=Object(i.a)(r.a.mark((function t(e){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/post/"+e,{method:"DELETE",headers:{authorization:"Bearer "+window.localStorage.getItem("jwt")}});case 2:return n=t.sent,t.next=5,n.json();case 5:n=t.sent,console.log(n),this.setState({testBlogs:n,selectedBlog:void 0});case 8:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"displayCreateBlog",value:function(){this.setState({selectedBlog:"create"})}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{children:[Object(j.jsx)(O,{create:this.displayCreateBlog,logout:this.logoutUser,getPosts:this.getPosts,setauth:this.setAuthentication,click:this.flipCreateAccount,auth:this.state.authenticated}),void 0===this.state.selectedBlog||this.state.createUser?"":Object(j.jsx)(x,{auth:this.state.authenticated,blog:this.state.testBlogs.find((function(e){return e.id===t.state.selectedBlog})),click:this.setDisplayedBlog,blogFunction:{edit:this.editBlog,delete:this.deleteBlog,create:this.createBlog}}),void 0!==this.state.selectedBlog||this.state.createUser?"":Object(j.jsx)(y,{blogs:this.state.testBlogs,click:this.setDisplayedBlog}),this.state.createUser?Object(j.jsx)(f,{create:this.createAccount}):""]})}}]),n}(d.a.Component);b.a.render(Object(j.jsx)(k,{}),document.getElementById("root"))},17:function(t,e,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.7c703a9c.chunk.js.map