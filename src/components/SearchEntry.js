import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRestaurantList } from "../actions";
import { Grid, Search, Card, Message, Icon, Button } from "semantic-ui-react";
import MapwithMarkInfoWindow from "./MapwithMarkInfoWindow";
import { GOOGLE_MAP_KEY } from "../config/googleMapKey";

import _ from "lodash";

const source = [
  { title: "croydon VIC 3136" },
  { title: "burwood VIC 3152" },
  { title: "balwyn VIC 3103" },
  { title: "hawthorn VIC 3122" },
  { title: "vermont south VIC 3133" }
];
//map api key :   AIzaSyAWZ9OGjcY98pJPsz3rgFjPtx2ddo7sBf8
class SearchEntry extends Component {
  componentWillMount() {
    this.setState({ error: "" });
    this.resetSearchComponent();
  }
  onSearch() {
    //req to server to get address list of restaurant
    this.setState({ error: "" });
    const res = this.props.fetchRestaurantList(this.state.value);
    res.then(error => {
      if (error) this.setState({ error });
    });
  }
  resetSearchComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    if (value.length < 1) return this.resetSearchComponent();

    const re = new RegExp(_.escapeRegExp(value));
    const isMatch = result => re.test(result.title);
    this.setState({
      isLoading: false,
      results: _.filter(source, isMatch)
    });
  };
  gotoMenu(menu) {
    if (menu === "Burger") this.props.history.push("/burger");
    else this.props.history.push("/pizza");
  }
  renderResult() {
    return this.props.restaurantList.map(restaurantInfo => {
      return (
        <Card
          key={restaurantInfo.address}
          onClick={() => {
            this.gotoMenu(restaurantInfo.menu);
          }}
        >
          <Card.Content header={restaurantInfo.address} />
          <Card.Content description={`buy ${restaurantInfo.menu}`} />
          <Card.Content extra>
            <Icon name="favorite" />
            4 Reviews
          </Card.Content>
        </Card>
      );
    });
  }
  renderMapResult() {
    //geocode to get the lat lng from props.restaurantList
    //let MarkInfo= this.props.restaurantList.map((restaurant)=>{
    //})
    return (
      <MapwithMarkInfoWindow
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        zoom={11}
        markNumber={this.props.restaurantList.length}
        restaurantInfo={this.props.restaurantList}
        gotoMenu={this.gotoMenu.bind(this)}
      />
    );
  }
  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <div className="searchBar">
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            icon={
              <Button icon onClick={this.onSearch.bind(this)}>
                <Icon name="search" />
              </Button>
            }
          />
        </div>
        {this.state.error.length > 0 && <Message>{this.state.error}</Message>}
        {this.props.restaurantList.length > 0 && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderMapResult()}</Grid.Column>
              <Grid.Column width={6}>{this.renderResult()}</Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return { restaurantList: state.restaurantList };
}
export default connect(mapStatetoProps, { fetchRestaurantList })(SearchEntry);
