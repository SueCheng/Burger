import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import NotFound from "./NotFound";
import SigninLocalForm from "./SigninLocalForm";
import ShoppingCart from "./ShoppingCart";
import { Sidebar, Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import Media from "react-media";
import Loadable from "react-loadable";

function Loading() {
  return <h3>LoadinG...</h3>;
}

const LoadableSearchEntry = Loadable({
  loader: () => import(/*webpackChunkName:"searchEntry"*/ "./SearchEntry"),
  loading: Loading
});
const LoadableBurgerBuilder = Loadable({
  loader: () =>
    import(/*webpackChunkName:"burgerBuilder"*/ "./BurgerBuilder/BurgerBuilder"),
  loading: Loading
});
const LoadablePizza = Loadable({
  loader: () => import(/*webpackChunkName:"pizza"*/ "./Pizza"),
  loading: Loading
});
const LoadableOrders = Loadable({
  loader: () => import(/*webpackChunkName:"orders"*/ "./Orders"),
  loading: Loading
});
const LoadableSignup = Loadable({
  loader: () => import(/*webpackChunkName:"signupForm"*/ "./SignupForm"),
  loading: Loading
});
const LoadableCheckout = Loadable({
  loader: () => import(/*webpackChunkName:"checkout"*/ "./Checkout"),
  loading: Loading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarVisible: false };
  }

  //get auth user
  componentDidMount() {
    this.props.fetchUser();
  }
  componentWillUnmount() {
    //if this.keyPressFunc is undefined, there should be no harm
    document.removeEventListener("keydown", this.keyPressFunc);
  }
  componentWillUpdate(nextProps, nextState) {
    this.keyPressFunc = this.handleKeyPress.bind(this);
    if (nextState.sidebarVisible === true) {
      document.addEventListener("keydown", this.keyPressFunc);
    } else {
      document.removeEventListener("keydown", this.keyPressFunc);
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
    } else return str;
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
              query="(max-width:650px)" //650px could insure the right menu showed completely
              render={() => (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  width="wide"
                  visible={this.state.sidebarVisible}
                  vertical
                >
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/"
                    header
                    onClick={this.hideSidebarIfVisible.bind(this)}
                  >
                    <div className="imgBackground">
                      <Image
                        size="tiny"
                        src={process.env.PUBLIC_URL + "/img/burger-logo.png"}
                        alt="Burger"
                      />
                    </div>
                  </Menu.Item>

                  <Dropdown item text="Menu">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={NavLink}
                        exact
                        to="/burger"
                        onClick={this.hideSidebarIfVisible.bind(this)}
                        text="Burger Builder"
                      />
                      <Dropdown.Item
                        as={NavLink}
                        exact
                        to="/pizza"
                        onClick={this.hideSidebarIfVisible.bind(this)}
                        text="Pizza"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item
                    as={NavLink}
                    exact
                    to="/shoppingcart"
                    onClick={this.hideSidebarIfVisible.bind(this)}
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
              <div className="pageWrapper">
                <Switch>
                  <Route exact path="/" component={LoadableSearchEntry} />
                  <Route exact path="/signup" component={LoadableSignup} />
                  <Route
                    exact
                    path="/signinlocal"
                    component={SigninLocalForm}
                  />
                  <Route
                    exact
                    path="/burger"
                    component={LoadableBurgerBuilder}
                  />
                  <Route exact path="/pizza" component={LoadablePizza} />
                  <Route
                    exact
                    path="/shoppingcart"
                    render={props => (
                      <ShoppingCart isCheckoutPage={false} {...props} />
                    )}
                  />
                  <Route exact path="/orders" component={LoadableOrders} />
                  <Route exact path="/checkout" component={LoadableCheckout} />
                  <Route component={NotFound} />
                </Switch>
              </div>
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
