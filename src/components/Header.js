import React, { Component } from "react";
import { Menu, Image, Icon, Dropdown } from "semantic-ui-react";
import Media from "react-media";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="headerMenu">
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
                <Menu.Item as={NavLink} exact to="/" header>
                  <div className="imgBackground">
                    <Image
                      size="tiny"
                      src={process.env.PUBLIC_URL + "/img/burger-logo.png"}
                      alt="Burger"
                    />
                  </div>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Dropdown item text="Menu">
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={NavLink}
                        exact
                        to="/burger"
                        text="Burger Builder"
                      />
                      <Dropdown.Item
                        as={NavLink}
                        exact
                        to="/pizza"
                        text="Pizza"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
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
