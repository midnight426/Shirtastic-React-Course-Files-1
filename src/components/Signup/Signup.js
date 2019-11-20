import React, { Component } from "react";
import "./Signup.css";
import { withRouter } from "react-router-dom";
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback
} from "react-form-with-constraints";

const termsOfUse =
  "By clicking the Sign Up button below, you agree to our Terms of Service and Privacy Policy.";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      disableButton: true
    };
  }
  handleInputChange = event => {
    if (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.passwordConfirm.length > 0
    ) {
      console.log("it is valid");
      this.setState({ disableButton: false });
    } else {
      console.log("it's not valid", this.state.email.length);
      this.setState({ disableButton: true });
    }
  };
  handleInputOnBlur = event => {
    this.signupForm.validateFields(event.currentTarget.name);

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  //   componentDidMount() {
  //     if (this.signupForm.isValid()) {
  //       console.log("it is valid");
  //       this.submitBtn.disabled = true;
  //     } else {
  //       console.log("it's not valid");
  //       this.submitBtn.disabled = false;
  //     }
  //   }
  signupSubmit = e => {
    e.preventDefault();
    if (this.signupForm.isValid()) {
      this.props.onSelectTabId("2");
      this.props.userSignUpData(this.state);
    }
  };
  // selectedTabId = tabId => {
  //     this.props.onSelectTabId('2');
  //     this.props.userSignUpData(this.state);
  // }
  render() {
    return (
      <div className="signup-container">
        <FormWithConstraints
          onSubmit={this.signupSubmit.bind(this)}
          ref={element => (this.signupForm = element)}
        >
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              required
              name="email"
              className="form-control"
              onBlur={this.handleInputOnBlur.bind(this)}
              onChange={this.handleInputChange.bind(this)}
              ref={email => (this.email = email)}
            />
            <FieldFeedbacks for="email">
              <FieldFeedback when="valueMissing">
                You must provide email address.
              </FieldFeedback>
              <FieldFeedback when={value => !/\S+@\S+/.test(value)}>
                Invalid email address.
              </FieldFeedback>
            </FieldFeedbacks>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onBlur={this.handleInputOnBlur.bind(this)}
              onChange={this.handleInputChange.bind(this)}
              ref={password => (this.password = password)}
              required
              pattern=".{5,}"
            />
            <FieldFeedbacks for="password">
              <FieldFeedback when="valueMissing" />
              <FieldFeedback when="patternMismatch">
                Should be at least 5 characters long
              </FieldFeedback>
              <FieldFeedback when={value => !/\d/.test(value)} warning>
                Should contain numbers
              </FieldFeedback>
              <FieldFeedback when={value => !/[a-z]/.test(value)} warning>
                Should contain small letters
              </FieldFeedback>
              <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>
                Should contain capital letters
              </FieldFeedback>
              <FieldFeedback when={value => !/\W/.test(value)} warning>
                Should contain special characters
              </FieldFeedback>
              <FieldFeedback when="valid">Looks good!</FieldFeedback>
            </FieldFeedbacks>
          </div>
          <div className="form-group">
            <label htmlFor="pwd2">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              className="form-control"
              //   value={this.state.passwordConfirm}
              required
              onBlur={this.handleInputOnBlur.bind(this)}
              onChange={this.handleInputChange.bind(this)}
              ref={passwordConfirm => (this.passwordConfirm = passwordConfirm)}
            />
            <FieldFeedbacks for="passwordConfirm">
              <FieldFeedback when={value => value !== this.password.value}>
                Not the same password
              </FieldFeedback>
            </FieldFeedbacks>
          </div>
          <p>{termsOfUse}</p>
          <div className="text-center">
            <button
              type="submit"
              className="primary-btn"
              ref={element => (this.submitBtn = element)}
              name="submitBtn"
              disabled={this.state.disableButton}
            >
              SIGN UP
            </button>
          </div>
        </FormWithConstraints>
      </div>
    );
  }
}

export default withRouter(Signup);
