import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import Checkout from "./Checkout";
import Orders from "./Orders";
import NotFound from "./NotFound";
import SignupForm from "./SignupForm";
import SigninLocalForm from "./SigninLocalForm";
import ShoppingCart from "./ShoppingCart";

import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Sidebar, Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import Media from "react-media";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarVisible: false };
  }

  //get auth user
  componentDidMount() {
    this.props.fetchUser();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.sidebarVisible === true) {
      document.addEventListener("keydown", this.handleKeyPress);
    } else {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
  }
  handleKeyPress = e => {
    if (e.keyCode === 27 && this.state.sidebarVisible) {
      this.setState({ sidebarVisible: false });
    }
  };

  hideSidebarIfVisible() {
    if (this.state.sidebarVisible) {
      this.setState({
        sidebarVisible: false
      });
    }
  }
  toggleSidebar() {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }
  shortenLongString(str) {
    if (str.length > 10) {
      return str.substr(0, 10) + "...";
    }
  }
  renderUserNameId(auth) {
    if (auth) {
      switch (auth.loginMethod) {
        case "facebook":
          return `Welcome ${this.shortenLongString(auth.facebook.facebookId)}`;
        case "google":
          return `Welcome ${this.shortenLongString(auth.google.googleId)}`;
        case "local":
          return `Welcome ${this.shortenLongString(auth.local.userName)}`;
        default:
          return null;
      }
    }
    return null;
  }
  renderAuthContent() {
    if (this.props.auth)
      return (
        <Dropdown item text={this.renderUserNameId(this.props.auth)}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={NavLink}
              onClick={(event, data) => {
                this.setState({ sidebarVisible: false });
              }}
              exact
              to="/orders"
              text="Orders"
            />
            <Dropdown.Item as="a" href="/auth/logout" text="Logout" />
          </Dropdown.Menu>
        </Dropdown>
      );
    else {
      return (
        <Dropdown item text="Sign up or Login">
          <Dropdown.Menu>
            <Dropdown.Item
              as="a"
              icon="facebook"
              href="/auth/facebook"
              text="Login with Facebook"
            />
            <Dropdown.Item
              as="a"
              icon="google"
              href="/auth/google"
              text="Login with Google"
            />
            <Dropdown.Item
              as={NavLink}
              exact
              to="/signinlocal"
              icon="user"
              text="Login Locally"
              onClick={(event, data) => {
                this.setState({ sidebarVisible: false });
              }}
            />
            <Dropdown.Item
              as={NavLink}
              exact
              to="/signup"
              icon="signup"
              text="Signup"
              onClick={(event, data) => {
                this.setState({ sidebarVisible: false });
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar.Pushable>
            <Media
              query="(max-width:650)" //650px could insure the right menu showed completely
              render={() => (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  width="wide"
                  visible={this.state.sidebarVisible}
                  vertical
                >
                  <Menu.Item header>
                    <div className="imgBackground">
                      <Image
                        size="tiny"
                        src={process.env.PUBLIC_URL + "/img/burger-logo.png"}
                        alt="Burger"
                      />
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/"
                    onClick={(event, data) => {
                      this.setState({ sidebarVisible: false });
                    }}
                  >
                    Burger Builder
                  </Menu.Item>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/shoppingcart"
                    onClick={(event, data) => {
                      this.setState({ sidebarVisible: false });
                    }}
                  >
                    <Icon name="cart" />
                    Cart
                  </Menu.Item>
                  {this.renderAuthContent()}
                </Sidebar>
              )}
            />
            <Sidebar.Pusher onClick={this.hideSidebarIfVisible.bind(this)}>
              <Header
                toggleSidebar={this.toggleSidebar.bind(this)}
                renderAuthContent={this.renderAuthContent.bind(this)}
              />
              <Switch>
                <Route exact path="/signup" component={SignupForm} />
                <Route exact path="/signinlocal" component={SigninLocalForm} />
                <Route exact path="/" component={BurgerBuilder} />
                <Route
                  exact
                  path="/shoppingcart"
                  render={props => (
                    <ShoppingCart isCheckoutPage={false} {...props} />
                  )}
                />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/checkout" component={Checkout} />
                <Route component={NotFound} />
              </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
App = connect(mapStateToProps, { fetchUser })(App);
export default App;
