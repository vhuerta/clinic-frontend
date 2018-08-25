// __mocks__/Provider.jsx
import context from "../testHelper";

export const AuthConsumer = props => props.children(context);
