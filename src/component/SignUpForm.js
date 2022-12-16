// SignUpForm.jsx

import { Component } from 'react';

import { signUp } from '../utilities/user-service'


export default class SignUpForm extends Component {
    //Initializing a Class Component's State
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    //Defining Event Handler Methods in a Class Component
    /**
     * 
     * The handleChange()method can't be defined using the usual syntax for defining an instance method of 
     * a class like that of the render()method.

    The reason the usual syntax won't work is because the method will be invoked as a callback and thus will not have 
    this bound to the component instance as necessary if we want to be able to access this.props, this.setState(), etc.

    There are two solutions to ensure that a method has thiscorrectly set to the component instance:

    Define the method as usual and use JavaScript's bindmethod in the constructormethod to explicitly set the value of this.
    Use the class field syntax along with an arrow function when defining the method which by its very nature fixes the issue due to the way class fields are actually initialized in the constructormethod.
    FYI: The trouble with the binding of thisin class components is definitely one of the main inspirations for React hooks!
     */


    handleChange = (evt) => {
        this.setState({
            //access the name variable in the []
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }

    //Handling the onSubmitEvent
    //As we learned during the React Fundamentals - Handling Input and Events lesson, we need to prevent the form from being submitted to the server by including evt.preventDefault();as the first line of code.
    //Baby step by adding this additional line of code alert(JSON.stringify(this.state))

    handleSubmit = async (evt) => { //Prevent form from being submitted to the server
        /**Use a try/catchBlock to Catch Errors When Using async/await
Let's start back in the handleSubmitmethod in SignUpForm.jsx by setting up a try/catchblock required to handle
 errors when using async/await: */
 evt.preventDefault()
 try {
   // We don't want to send the 'error' or 'confirm' property,
   //  so let's make a copy of the state object, then delete them
   const formData = {...this.state}
   delete formData.error;
   delete formData.confirm;
   // The promise returned by the signUp service method
   // will resolve to the user object included in the
   // payload of the JSON Web Token (JWT)
   // eslint-disable-next-line no-unused-vars
   const user = await signUp(formData)
   this.props.setUser(user)
 } catch {
   this.setState({ error: "Sign Up Failed - Try Again"})
 }
}

    

    //alert(JSON.stringify(this.state)turns event into a string inside handleSubmit

    //FYI: Internally, the class field syntax is converted into the constructor method approach.

    //'this' Keyword in a Class Component When we use class components, it's important to realize that the components themselves are 
    //instances of the class instantiated by React the first time they are rendered.
    //Unlike with function components, a class component accesses its props and methods using 'this' = this.props, this.state, etc.

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required/>
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required/>
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>  
            <p className="error-message">&#160;{this.state.error}</p>
          </div>
        )
      }
    }