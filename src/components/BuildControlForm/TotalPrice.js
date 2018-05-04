import React from "react";
import { INGREDIENTS, PERPRICE } from "../../config/ingredients";

function calculatePrice(formValues) {
  if (Object.keys(formValues).length === 0) return 0;
  let result = INGREDIENTS.reduce((acc, cur, index) => {
    return acc + formValues[cur] * PERPRICE[index];
  }, PERPRICE[4] + PERPRICE[5]);
  return result.toFixed(1);
}

const TotalPrice = ({ formValues }) => {
  return (
    <p style={{ textAlign: "center" }}>
      Total price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {calculatePrice(formValues)}
    </p>
    /*<Grid.Row>
      <Grid.Column computer={5} verticalAlign={"middle"}>
        Total price
      </Grid.Column>
      <Grid.Column computer={5} verticalAlign={"middle"}>
        {calculatePrice(formValues)}
      </Grid.Column>
    </Grid.Row>*/
  );
};

export { TotalPrice, calculatePrice };
