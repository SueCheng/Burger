import React, { Component } from "react";
import { Container, Button, Form, Message } from "semantic-ui-react";
import axiosInstance from "../axios-instance";
import errorShowModal from "./hoc/errorShowModal";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signInLocally } from "../actions";

class SigninLocalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorUserName: "",
      errorPassword: "",
      submissionError: ""
    };
  }
  validateUserName() {
    if (this.state.userName.length === 0)
      this.setState({ errorUserName: "User Name can't be empty" });
    else if (this.state.userName.length >= 6)
      this.setState({
        errorUserName: "User Name's length can't be longer than 6"
      });
  }
  validatePassword() {
    if (this.state.password.length === 0)
      this.setState({ errorPassword: "Password can't be empty" });
    else if (this.state.password.length >= 8)
      this.setState({
        errorPassword: "Password's length can't be longer than 8"
      });
  }
  isFieldErrorExist() {
    if (
      this.state.errorUserName.length !== 0 ||
      this.state.errorPassword.length !== 0
    )
      return true;
    else return false;
  }
  isErrorExist() {
    if (this.isFieldErrorExist()) return true;
    else if (this.state.submissionError.length !== 0) return true;
    else return false;
  }
  /*errorMsgNode(err) {
    if (err.length !== 0) return <Message error content={err} />;
    else return;
  }*/
  async handleSubmit() {
    //if any validation error exist,do nothing
    if (this.isFieldErrorExist()) return;
    //axios send to server
    const { userName, password } = this.state;

    let res = this.props.signInLocally({ userName, password });
    res.then(res => {
      if (res) {
        if (res.data.success === true) {
          this.props.history.push("/");
        } else {
          this.setState({ submissionError: res.data.info });
        }
      } else this.setState({ submissionError: "Network Error Detected" });
    });
  }
  render() {
    return (
      <Container>
        <Form
          onSubmit={this.handleSubmit.bind(this)}
          error={this.isErrorExist()}
        >
          {this.state.submissionError.length !== 0 ? (
            <Message error content={this.state.submissionError} />
          ) : null}
          <Form.Field
            error={this.state.errorUserName.length === 0 ? false : true}
          >
            <label>UserName</label>
            <input
              placeholder="UserName"
              onFocus={() => this.setState({ errorUserName: "" })}
              onBlur={this.validateUserName.bind(this)}
              onChange={event => {
                this.setState({ userName: event.target.value });
              }}
              value={this.state.userName}
            />
          </Form.Field>
          {this.state.errorUserName.length !== 0 ? (
            <Message error content={this.state.errorUserName} />
          ) : null}
          <Form.Field
            error={this.state.errorPassword.length === 0 ? false : true}
          >
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onFocus={() => this.setState({ errorPassword: "" })}
              onBlur={this.validatePassword.bind(this)}
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
              value={this.state.password}
            />
          </Form.Field>
          {this.state.errorPassword.length !== 0 ? (
            <Message error content={this.state.errorPassword} />
          ) : null}
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    );
  }
}
SigninLocalForm = errorShowModal(SigninLocalForm, axiosInstance);
SigninLocalForm = withRouter(SigninLocalForm);
SigninLocalForm = connect(null, { signInLocally })(SigninLocalForm);

export default SigninLocalForm;
