import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import {
  Grid,
  Segment,
  List,
  Accordion,
  Icon,
  Button,
  Divider,
  Dropdown
} from "semantic-ui-react";
import MySticky from "./MySticky";
import _ from "lodash";
import { VARIETY, PIZZASHIPMENU } from "../config/pizzashopMenu";
import { addItemToShoppingcart } from "../actions";
import { connect } from "react-redux";
import Media from "react-media";

class Pizza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticking: false,
      pizzaStyle: true,
      sideStyle: false,
      drinkStyle: false,
      activeIndexArray: [0, 1, 2],
      shoppingcartItems: [],
      openModal: false
    };
    this.animationId = 0;
    this.pizzaRef = React.createRef();
    this.sideRef = React.createRef();
    this.drinkRef = React.createRef();
    this.lastFocusSection = "pizza";
  }

  //handleContextRef = contextRef => this.setState({ contextRef });
  componentDidMount() {
    this.smallScreen = window.matchMedia("(max-width:650px)").matches;
    if (!this.smallScreen) {
      this.scrollFunc = this.onScroll.bind(this);
      document.body.addEventListener("scroll", this.scrollFunc);
    }
  }
  componentWillUnmount() {
    if (!this.smallScreen) {
      document.body.removeEventListener("scroll", this.scrollFunc);
      if (this.animationId !== 0) {
        window.cancelAnimationFrame(this.animationId);
      }
    }
  }
  onScroll() {
    if (!this.state.ticking) {
      this.animationId = window.requestAnimationFrame(
        this.connectMove.bind(this)
      );
      this.setState({ ticking: true });
    }
  }
  getVariety(title, icon) {
    let resultRef;
    let resultIcon;
    switch (title) {
      case "pizza":
        resultRef = "pizzaRef";
        resultIcon = "chart pie";
        break;
      case "side":
        resultRef = "sideRef";
        resultIcon = "lemon";
        break;
      case "drink":
        resultRef = "drinkRef";
        resultIcon = "coffee";
        break;
      default:
        resultRef = "pizzaRef";
        resultIcon = "chart pie";
        break;
    }
    if (icon) return resultIcon;
    else return resultRef;
  }
  connectMove() {
    //according scrollTop,highlight left rail menu,use boundingclientrect to measure
    let arrMiddle = VARIETY.map((title, index) => {
      let rect = findDOMNode(
        this[this.getVariety(title, false)].current
      ).getBoundingClientRect();
      return {
        distance: Math.abs(rect.top + rect.bottom - window.innerHeight),
        name: title
      };
    });
    let newArrMiddle = _.sortBy(arrMiddle, ["distance"]);
    //get the closest one, if it changes
    if (newArrMiddle[0].name !== this.lastFocusSection) {
      this.lastFocusSection = newArrMiddle[0].name;
      //focus section changed in scroll process
      if (this.lastFocusSection === "pizza")
        this.setState({
          pizzaStyle: true,
          sideStyle: false,
          drinkStyle: false
        });
      else if (this.lastFocusSection === "side")
        this.setState({
          pizzaStyle: false,
          sideStyle: true,
          drinkStyle: false
        });
      else if (this.lastFocusSection === "drink")
        this.setState({
          pizzaStyle: false,
          sideStyle: false,
          drinkStyle: true
        });
    }
    this.setState({ ticking: false });
  }
  handleAccordianClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndexArray } = this.state;
    let newIndexArray;
    if (activeIndexArray.indexOf(index) > -1) {
      newIndexArray = activeIndexArray.filter(i => i !== index);
    } else {
      newIndexArray = [...activeIndexArray, index];
    }
    this.setState({ activeIndexArray: newIndexArray });
  }
  renderAccordion() {
    return (
      <Accordion fluid>
        {VARIETY.map((title, index) => {
          return (
            <React.Fragment key={index}>
              {this.renderAccordionTitle(title, index)}
              {this.renderAccordionContent(title, index)}
            </React.Fragment>
          );
        })}
      </Accordion>
    );
  }
  renderAccordionTitle(title, index) {
    const { activeIndexArray } = this.state;
    return (
      <Accordion.Title
        active={_.includes(activeIndexArray, index)}
        index={index}
        onClick={this.handleAccordianClick.bind(this)}
      >
        <div>
          <Icon size="big" color="yellow" name={this.getVariety(title, true)} />
          <div style={{ float: "right" }}>
            <Icon name="dropdown" />
          </div>
        </div>
        <Divider horizontal>{title}</Divider>
      </Accordion.Title>
    );
  }
  renderAccordionContent(title, index) {
    const { activeIndexArray } = this.state;
    return (
      <Accordion.Content active={_.includes(activeIndexArray, index)}>
        <List ref={this[this.getVariety(title, false)]} divided relaxed="very">
          {this.renderListItem(title)}
        </List>
      </Accordion.Content>
    );
  }
  renderListItem(title) {
    return PIZZASHIPMENU[title].map((menu, index) => {
      return (
        <List.Item key={index}>
          <List.Content>
            <List.Header>
              {menu.name}
              {menu.isvege ? <Icon name="leaf" /> : null}
            </List.Header>
            <List.Description>{menu.description}</List.Description>
            <div style={{ float: "right", textAlign: "right" }}>
              {this.renderPrice(menu)}
            </div>
          </List.Content>
        </List.Item>
      );
    });
  }
  renderPrice(menu) {
    if (menu.price)
      //one price
      return (
        <div>
          {menu.price.toFixed(2)}{" "}
          <Button
            color="green"
            icon="add"
            onClick={() => this.handleMenuClick(menu, "average")}
          />
        </div>
      ); //price based on size
    else
      return (
        <List.List>
          <List.Item>
            <List.Content>
              {menu.small
                ? `small(  ${menu.small
                    .calories}KJ ) ${menu.small.price.toFixed(2)}  `
                : null}
              <Button
                color="green"
                icon="add"
                onClick={() => this.handleMenuClick(menu, "small")}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              {menu.medium
                ? `medium(  ${menu.medium
                    .calories}KJ ) ${menu.medium.price.toFixed(2)}  `
                : null}
              <Button
                color="green"
                icon="add"
                onClick={() => this.handleMenuClick(menu, "medium")}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              {menu.large
                ? `large(  ${menu.large
                    .calories}KJ ) ${menu.large.price.toFixed(2)}  `
                : null}
              <Button
                color="green"
                icon="add"
                onClick={() => this.handleMenuClick(menu, "large")}
              />
            </List.Content>
          </List.Item>
        </List.List>
      );
  }

  /*
 category: String,
  quantity: Number,
  price: Number,
  config: { type: Map, of: String }
  */
  handleMenuClick(menu, size) {
    //add Menu from left to right to display
    const { shoppingcartItems } = this.state;
    const price = size === "average" ? menu.price : menu[size].price;

    let index = _.findIndex(shoppingcartItems, o => {
      return o.config.name === menu.name && o.config.size === size;
    });
    //if the item already exist,add quantity and price to the exist item
    if (index >= 0) {
      shoppingcartItems[index].quantity++;
      shoppingcartItems[index].price += price;
      this.setState({ shoppingcartItems });
    } else {
      let shoppingcartItem = {
        category: "Pizza",
        quantity: 1,
        price: price,
        config: { name: menu.name, size: size }
      };
      //add to state shopping cart array
      this.setState({
        shoppingcartItems: [...shoppingcartItems, shoppingcartItem]
      });
    }
  }

  renderShoppingcartItems() {
    const { shoppingcartItems } = this.state;
    return (
      <List divided relaxed="very">
        {shoppingcartItems.map((item, index) => {
          return this.renderItemInfo(item, index);
        })}
        <List.Item>
          <Grid>
            <Grid.Column width={10} textAlign="left">
              Subtotal({" "}
              {_.reduce(
                shoppingcartItems,
                (sum, o) => sum + o.quantity,
                0
              )}{" "}
              item)
            </Grid.Column>
            <Grid.Column width={6} textAlign="right">
              {_.reduce(
                shoppingcartItems,
                (sum, o) => sum + o.price,
                0
              ).toFixed(2)}
            </Grid.Column>
          </Grid>
        </List.Item>
      </List>
    );
  }
  renderItemInfo(item, index) {
    return (
      <Grid key={index}>
        <Grid.Row>
          <Grid.Column width={4} textAlign="right">
            <Dropdown
              value={item.quantity}
              onChange={(e, { value }) =>
                this.handleQuantityChange(index, value)}
              options={Array.from(new Array(20), (val, index) => {
                return { text: index, value: index };
              })}
            />
          </Grid.Column>
          <Grid.Column width={6} textAlign="left">
            <p>{item.config.name}</p>
            <p>{item.config.size}</p>
            <Button onClick={() => this.handleRemoveItem(index)}>Remove</Button>
          </Grid.Column>
          <Grid.Column width={6} textAlign="right">
            {item.price.toFixed(2)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  handleQuantityChange(index, quantity) {
    const { shoppingcartItems } = this.state;
    const perPrice = (shoppingcartItems[index].price /
      shoppingcartItems[index].quantity
    ).toFixed(2);
    shoppingcartItems[index].quantity = quantity;
    shoppingcartItems[index].price = quantity * perPrice;
    this.setState({ shoppingcartItems });
  }
  handleRemoveItem(index) {
    //remove from local state
    const { shoppingcartItems } = this.state;
    this.setState({
      shoppingcartItems: [
        ...shoppingcartItems.slice(0, index),
        ...shoppingcartItems.slice(index + 1)
      ]
    });
  }
  handleAddShoppingcart() {
    //use redux method to send to server shoppingcart
    if (this.state.shoppingcartItems.length > 0) {
      /*this.state.shoppingcartItems.forEach(item => {
        this.props.addItemToShoppingcart(item);
      });*/
      this.props.addItemToShoppingcart(this.state.shoppingcartItems);
      this.props.history.push("/shoppingcart");
    }
  }
  showModal() {
    this.setState({ openModal: true });
  }
  closeModal() {
    this.setState({ openModal: false });
  }

  renderWideScreen() {
    return (
      <Grid centered>
        <Grid.Column width={3}>
          <MySticky push={false} top={110}>
            <Segment>
              <List link relaxed="very">
                <List.Item active={this.state.pizzaStyle}>
                  <div style={{ verticalAlign: "middle" }}>
                    <Icon size="big" color="yellow" name="chart pie" />Pizza
                  </div>
                </List.Item>
                <List.Item active={this.state.sideStyle}>
                  <div style={{ verticalAlign: "middle" }}>
                    <Icon size="big" color="yellow" name="lemon" />Side
                  </div>
                </List.Item>
                <List.Item active={this.state.drinkStyle}>
                  <div style={{ verticalAlign: "middle" }}>
                    <Icon size="big" color="yellow" name="coffee" />Drink
                  </div>
                </List.Item>
              </List>
            </Segment>
          </MySticky>
        </Grid.Column>
        <Grid.Column width={10}>{this.renderAccordion()}</Grid.Column>
        <Grid.Column width={3}>
          <MySticky push={false} top={110}>
            <Segment padded>
              <Button
                fluid
                color="green"
                onClick={this.handleAddShoppingcart.bind(this)}
              >
                Add to Shoppingcart
              </Button>
              {this.renderShoppingcartItems()}
            </Segment>
          </MySticky>
        </Grid.Column>
      </Grid>
    );
  }
  renderNarrowScreen() {
    return (
      <React.Fragment>
        {this.renderAccordion()}
        <Segment padded>
          <Button
            fluid
            color="green"
            onClick={this.handleAddShoppingcart.bind(this)}
          >
            Add to Shoppingcart
          </Button>
          {this.renderShoppingcartItems()}
        </Segment>
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="pizza">
        <Media query="(max-width:650px)">
          {matches =>
            matches ? this.renderNarrowScreen() : this.renderWideScreen()}
        </Media>
      </div>
    );
  }
}

Pizza = connect(null, { addItemToShoppingcart })(Pizza);
export default Pizza;
