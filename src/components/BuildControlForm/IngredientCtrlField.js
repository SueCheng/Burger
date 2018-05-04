import React from "react";

import { Grid, Button } from "semantic-ui-react";

const IngredientCtrlField = ({
  label,
  input: { value, onChange },
  meta: { error, touched }
}) => {
  return (
    <Grid.Row>
      <Grid.Column computer={5} verticalAlign={"middle"}>
        {label}
      </Grid.Column>
      <Grid.Column computer={5} verticalAlign={"middle"}>
        {value}
      </Grid.Column>
      <Grid.Column computer={5} textAlign={"center"}>
        <Button.Group vertical>
          <Button
            icon="sort ascending"
            disabled={value >= 5}
            onClick={() => onChange(value + 1)}
          />
          <Button
            icon="sort descending"
            disabled={value <= 0}
            onClick={() => onChange(value - 1)}
          />
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default IngredientCtrlField;
