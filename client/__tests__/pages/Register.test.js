import { cleanup, render } from "@testing-library/react";
import Register from "../../src/pages/Register";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import '@testing-library/jest-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";

afterEach(cleanup);

it("Should render the Register page", () => {
    render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
});

it("Should check if a name is available and submit", async () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
        })
    );

    const user = userEvent.setup();
    const { getByText, getByRole } = render(
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
            <Provider store={store}>
                <MemoryRouter><Register /></MemoryRouter>
            </Provider>
        </GoogleOAuthProvider>);
    const nameInput = getByRole("textbox");
    
    await act(async () => {
        await user.type(nameInput, "test");
    });
    
    expect(getByText("Available!")).toBeInTheDocument();

    await act(async () => {
        await user.click(getByRole("button"));
    });

    expect(getByText("Sign up with LinkedIn")).toBeInTheDocument();

});

