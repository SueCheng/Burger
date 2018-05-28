import React, { Component } from "react";
import { Menu, Dropdown, Image, Icon } from "semantic-ui-react";
import Media from "react-media";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  /*
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
  */
  renderUserNameId(auth) {
    if (auth) {
      switch (auth.loginMethod) {
        case "facebook":
          return `Welcome ${auth.facebook.facebookId}`;
        case "google":
          return `Welcome ${auth.google.googleId}`;
        case "local":
          return `Welcome ${auth.local.userName}`;
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
            <Dropdown.Item as={NavLink} exact to="/orders" text="Orders" />
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
            />
            <Dropdown.Item
              as={NavLink}
              exact
              to="/signup"
              icon="signup"
              text="Signup"
            />
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <Media query="(max-width:500px)">
          {matches =>
            matches ? (
              <Menu color="brown" size="massive" inverted>
                <Menu.Item onClick={this.props.toggleSidebar}>
                  <Icon name="bars" size="big" />
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <div className="imgBackground">
                      <Image
                        size="tiny"
                        src={process.env.PUBLIC_URL + "/img/burger-logo.png"}
                        alt="Burger"
                      />
                    </div>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            ) : (
              <Menu color="brown" size="massive" inverted>
                <Menu.Item header>
                  <div className="imgBackground">
                    <Image
                      size="tiny"
                      src={process.env.PUBLIC_URL + "/img/burger-logo.png"}
                      alt="Burger"
                    />
                  </div>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item as={NavLink} exact to="/">
                    Burger Builder
                  </Menu.Item>
                  <Menu.Item as={NavLink} exact to="/shoppingcart">
                    <Icon name="cart" />
                    Cart
                  </Menu.Item>
                  {this.renderAuthContent()}
                </Menu.Menu>
              </Menu>
            )}
        </Media>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
Header = connect(mapStateToProps)(Header);
export default Header;
