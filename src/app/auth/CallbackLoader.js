import React, { Component } from "react";
import Styled from "styled-components";

import Logo from "../../assets/logo.png";

const loaderSize = 150;
const animationDuration = 4;

const FullContainer = Styled.div`
& {
  width: 100%;
  height: 100vh;
  background-color: #289ad1;
  position: relative;
}
`;

const LoaderContainer = Styled.div`
& {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${loaderSize}px;
  width: ${loaderSize}px;
}
`;

const Image = Styled.img`
& {
  width: 100%;
  opacity: .5;
}
`;

const Loader = Styled.div`
@keyframes grow {
  0% {
    height: 0;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 0;
  }
}

& {
  position: absolute;
  bottom: 0;
  width: ${loaderSize}px;
  background-image: url(${Logo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  animation-name: grow;
  animation-duration: ${animationDuration}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
`;

export default class CallbackLoader extends Component {
  render() {
    return (
      <FullContainer>
        <LoaderContainer>
          <Image src={Logo} />
          <Loader />
        </LoaderContainer>
      </FullContainer>
    );
  }
}
