import React from "react";
import { shallow } from "enzyme";

import FullLoader, { FullContainer } from "./FullLoader";

describe("<FullLoader />", () => {
  it("should render and contain a FullContainer child", () => {
    const wrapper = shallow(<FullLoader />);
    expect(wrapper.find(FullContainer)).toHaveLength(1);
  });
});
