import React, { Component } from "react";

export default class MySticky extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { ticking: false, lastScrollTop: 0 };
    if (this.props.push) this.state = { ticking: false, style: {} };
    else
      this.state = {
        ticking: false,
        style: { position: "fixed", width: "15%", top: props.top }
      };
  }

  componentDidMount() {
    if (this.props.push) {
      this.stickFunc = this.updateStick.bind(this);
      document.body.addEventListener("scroll", this.stickFunc, false);
    }
  }
  componentWillUnmount() {
    if (this.props.push)
      document.body.removeEventListener("scroll", this.stickFunc);
  }
  inRange(top, a, b, span) {
    var result = false;
    if (a > b - span && a < b + span) {
      result = true;
    } else result = false;
    //console.log(`top:${top} result:${result}`);
    return result;
  }
  //when scroll too fast,updateStick can't catch that inRange phase
  updateStick() {
    let scrollDown = false;
    const { top, context } = this.props;
    let rect = this.myRef.current.getBoundingClientRect();
    //update lastScrollTop to decide scroll direction
    if (document.body.scrollTop > this.state.lastScrollTop) {
      //scroll down
      scrollDown = true;
    }
    this.setState({ lastScrollTop: document.body.scrollTop });

    //set to fixed if sticky element's top get to the top when scrolling up
    if (
      scrollDown &&
      Object.keys(this.state.style).length === 0 &&
      this.inRange(true, rect.top, top, 20)
    ) {
      console.log("set state style fixed", rect.top);
      this.setState({ style: { position: "fixed", width: 272, top } });
    }
    //recover to static position when upper context 's bottom get to the top when scrolling down
    rect = context.getBoundingClientRect();
    if (
      !scrollDown &&
      Object.keys(this.state.style).length !== 0 &&
      this.inRange(false, rect.bottom, top, 20)
    ) {
      console.log("set state style to static", rect.bottom);
      this.setState({ style: {} });
    }
    this.setState({ ticking: false });
  }
  onScroll() {
    if (!this.state.ticking) {
      window.requestAnimationFrame(this.updateStick().bind(this));
      this.setState({ ticking: true });
    }
  }
  render() {
    return (
      <div style={this.state.style} ref={this.myRef}>
        {this.props.children}
      </div>
    );
  }
}
