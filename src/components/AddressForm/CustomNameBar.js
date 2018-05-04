import React, { Component } from "react";
import { Form, Message, Input } from "semantic-ui-react";

class CustomNameBar extends Component {
  render() {
    let { input, label, meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <Form.Field
          error={touched && error ? true : false}
          style={{ marginTop: "8px", marginBottom: "8px", marginRight: "10px" }}
          inline
          required
        >
          <label>{label}</label>
          <Input {...input} placeholder={label} />
        </Form.Field>
        {(touched && (error && <Message color="red">{error}</Message>)) ||
          (warning && <Message color="blue">{}</Message>)}
      </div>
    );
  }
}
export { CustomNameBar };
