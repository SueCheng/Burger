import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

const errorShowModal = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    onCloseModal() {
      this.setState({ error: null });
    }
    getErrMsg() {
      if (this.state.error) {
        if (this.state.error.response && this.state.error.response.data)
          return this.state.error.response.data;
        return this.state.error.message;
      } else return null;
    }
    render() {
      return (
        <div>
          <Modal
            open={this.state.error == null ? false : true}
            onClose={this.onCloseModal.bind(this)}
          >
            <Modal.Header>Error</Modal.Header>
            <Modal.Content>
              <p>{this.getErrMsg()}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon="check"
                content="OK"
                onClick={this.onCloseModal.bind(this)}
              />
            </Modal.Actions>
          </Modal>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default errorShowModal;
