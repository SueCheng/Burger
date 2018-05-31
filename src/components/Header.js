import React, { Component } from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import Media from "react-media";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Media query="(max-width:650px)">
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
                  {this.props.renderAuthContent()}
                </Menu.Menu>
              </Menu>
            )}
        </Media>
      </div>
    );
  }
}
export default Header;
