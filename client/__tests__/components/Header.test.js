import { cleanup, render } from "@testing-library/react";
import Header from "../../src/components/Header";

import store from "../../src/redux/store/store"
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MemoryRouter } from "react-router";
import '@testing-library/jest-dom'

afterEach(cleanup);

const navigate = jest.fn();

it("Header should render without problems", () => {
    render(
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        </GoogleOAuthProvider>
    );
});

it("Should render all subcomponents", () => {
    const { getByTestId } = render(
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
            <Provider store={store}>
                <MemoryRouter>
                    <Header shareButton backButton />
                </MemoryRouter>
            </Provider>
        </GoogleOAuthProvider>
    );
    
    expect(getByTestId("hamburger-menu-icon")).toBeInTheDocument();
    expect(getByTestId("ArrowBackIosNewIcon")).toBeInTheDocument();

});