import { cleanup, render } from "@testing-library/react";
import Header from "../../src/components/Header";

import store from "../../src/redux/store/store"
import { Provider } from "react-redux";
import Router from "../../src/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";

afterEach(cleanup);

const navigate = jest.fn();

it("Header should render without problems", () => {
  render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
        <Provider store={store}>
    <Router>
        <Header />
    </Router>
   
    </Provider>
    </GoogleOAuthProvider>
    );
});