import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

import Header from "./Header";
import Checkout from "./Checkout";
import Orders from "./Orders";
import NotFound from "./NotFound";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Sidebar, Menu, Image } from "semantic-ui-react";
import Media from "react-media";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarVisible: false };
  }
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
  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar.Pushable>
            <Media
              query="(max-width:500px)"
              render={() => (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  width="thin"
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
                  <Menu.Item as={NavLink} exact to="/">
                    Burger Builder
                  </Menu.Item>
                  <Menu.Item as={NavLink} exact to="/orders">
                    Orders
                  </Menu.Item>
                </Sidebar>
              )}
            />
            <Sidebar.Pusher onClick={this.hideSidebarIfVisible.bind(this)}>
              <Header toggleSidebar={this.toggleSidebar.bind(this)} />
              <Switch>
                <Route exact path="/" component={BurgerBuilder} />
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

export default App;
