import React from "react";
import { shallow } from "enzyme";

import {Switch} from 'react-router-dom';

import App from "./App";


it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Switch)).toHaveLength(1);
});
