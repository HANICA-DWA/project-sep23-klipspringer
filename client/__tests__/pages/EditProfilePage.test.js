import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import EditProfilePage from "../../src/pages/EditProfilePage.jsx";
import * as router from 'react-router';
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import { MemoryRouter } from "react-router-dom";
import { logUserIn } from "../../src/redux/reducers/profileReducer.js";

const navigate = jest.fn();

const imgSource = "image.jpeg";

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    store.dispatch(logUserIn.fulfilled({
        _id: "testUser",
        loggedIn: true,
        name: "Test User",
        profile_picture: imgSource,
    }, "fulfilled"));
});

afterEach(cleanup);

it("should render edit profile page", () => {
    render(
        <Provider store={store}>
            <EditProfilePage />
        </Provider>
    );
})

it("should display user info correct", () => {
    render(
        <Provider store={store}>
            <EditProfilePage />
        </Provider>
    );

    const img = screen.getByRole("img");
    const handler = screen.getByTestId("handler");
    const handlerValue = handler.querySelector('input').value;
    const name = screen.getByTestId("name");
    const nameValue = name.querySelector('input').value;

    expect(img.src).toContain(imgSource);
    expect(handlerValue).toBe("testUser");
    expect(nameValue).toBe("Test User");
});

it("should change the name correctly", async () => {
    const differentName = "Different Name";

    const user = userEvent.setup();

    render(
        <Provider store={store}>
            <EditProfilePage />
        </Provider>
    );

    const input = screen.getByTestId("name");
    const inputValue = input.querySelector('input');

    await user.clear(inputValue);
    await user.type(inputValue, differentName);

    expect(inputValue.value).toBe(differentName);
})

it("should redirect to profile when clicking logout", async () => {
    const user = userEvent.setup();

    render(
        <Provider store={store}>
            <EditProfilePage />
        </Provider>
    );
    
    const logOut = screen.getByText("Log Out");

    await user.click(logOut);
    expect(navigate).toHaveBeenCalledWith("/testUser");
});