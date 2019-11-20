import React, { Component } from "react";
import "./Login.css";
import { withRouter } from "react-router-dom";
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback
} from "react-form-with-constraints";

const facebookIcon = require("../../images/facebook.svg");
const twitterIcon = require("../../images/twitter.svg");

class Login extends Component {
  login(e) {
    e.preventDefault();
    if (this.loginForm.isValid()) {
      this.props.history.push("/catalog");
      let data = this.props.userSignUpData;
    }
  }
  render() {
    return (
      <div className="login-container">
        <div className="text-center">
          <h2>Log in</h2>
          <br />
          <button className="primary-btn">
            <img
              className="facebook-icon"
              src={facebookIcon}
              alt="facebook icon"
            />
            WITH FACEBOOK
          </button>
          <button className="primary-btn">
            <img
              className="twitter-icon"
              src={twitterIcon}
              alt="twitter icon"
            />
            WITH TWITTER
          </button>
        </div>
        <br />
        <div className="hr">
          <span>OR</span>
        </div>
        <FormWithConstraints
          onSubmit={this.login.bind(this)}
          ref={element => (this.loginForm = element)}
        >
          {/* <form onSubmit={this.login.bind(this)}> */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              required
              name="email"
              type="email"
              className="form-control"
              pattern=".{5,}"
            />
            <FieldFeedbacks for="email">
              <FieldFeedback when="valueMissing">
                You must provide email address.
              </FieldFeedback>
              <FieldFeedback when={value => !/\S+@\S+/.test(value)}>
                <FieldFeedback when="patternMismatch">
                  Should be at least 5 characters long
                </FieldFeedback>
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
              //onChange={this.handleInputChange.bind(this)}
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
          <div className="text-center">
            <button type="submit" className="primary-btn">
              LOG IN
            </button>
          </div>
          {/* </form> */}
        </FormWithConstraints>
      </div>
    );
  }
}

export default withRouter(Login);
