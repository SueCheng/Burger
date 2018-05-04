import React, { Component } from "react";

import Burger from "../Burger/Burger";
import BuildControlForm from "../BuildControlForm/BuildControlForm";
import { Grid } from "semantic-ui-react";

class BurgerBuilder extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={6}>
            <Burger />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={6}>
            <BuildControlForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BurgerBuilder;
