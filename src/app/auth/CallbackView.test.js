import React from "react";
import { shallow, mount } from "enzyme";
import flushPromises from "flush-promises";

import { MemoryRouter, Redirect } from "react-router-dom";
import CallbackViewContainer, { CallbackView } from "./CallbackView";
import FullLoader from "../common/FullLoader";
import context from "./testHelper";

jest.mock("./AuthContext");

describe("<CallbackView />", () => {
  it("should render FullLoader when is loading", () => {
    const handleAuthentication = jest.fn(() => Promise.reject(new Error()));

    const wrapper = shallow(
      <CallbackView handleAuthentication={handleAuthentication} />
    );
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(FullLoader)).toHaveLength(1);
  });

  it("should render Redirect when isn`t loading", () => {
    const handleAuthentication = jest.fn(() => Promise.reject(new Error()));

    const wrapper = shallow(
      <CallbackView handleAuthentication={handleAuthentication} />
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});

describe("<CallbackViewContainer />", () => {
  it("should render without errors", () => {
    mount(
      <MemoryRouter
        initialEntries={["/", "/two", { pathname: "/auth/callback" }]}
        initialIndex={1}
      >
        <CallbackViewContainer />
      </MemoryRouter>
    );
    expect(context.handleAuthentication.mock.calls.length).toBe(1);
  });
});
