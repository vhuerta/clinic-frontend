import React from "react";
import { mount } from "enzyme";
import App from "./App";


it("renders without crashing", () => {
  const wrapper = mount(<App />);
  expect(App.prototype.componentDidMount).to.have.property("callCount", 1);
});
