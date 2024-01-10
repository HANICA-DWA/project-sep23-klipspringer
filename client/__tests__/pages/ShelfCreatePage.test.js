import { cleanup, render, waitFor } from "@testing-library/react";
import ShelfCreatePage from "../../src/pages/ShelfCreatePage";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import '@testing-library/jest-dom'
import { logUserIn } from "../../src/redux/reducers/profileReducer";
import * as router from 'react-router';
import userEvent from "@testing-library/user-event";
import * as websocket from '../../src/data/websockets'

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
afterEach(cleanup);

it("Should render the ShelfCreatePage page normally", () => {
    const { getByText } = render(<Provider store={store}><MemoryRouter><ShelfCreatePage /></MemoryRouter></Provider>);
    expect(getByText("Create shelf")).toBeInTheDocument();
});

it("Should render the ShelfCreatePage in edit mode and save properly", async () => {

    jest.spyOn(router, "useParams").mockImplementation(() => {return { shelf: "top_three", userName: "testsubject" }});
    jest.spyOn(websocket, "getWebSocket").mockImplementation(() => { return {send: jest.fn()}});

    const profileInfo = {
        _id: "testsubject",
        name: "test",
        profile_picture: "test",
        top_three: {
            name: "test",
            books: [],
        },
        shelf: [],
        bookcase: [],
        followers: [],
        following: [],
    }

    global.fetch = jest.fn()
        .mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve(profileInfo)
            })
        })
        .mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve(profileInfo)
            })
        })
        .mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve({name: "testshelf", books: []})
            })
        })

    const user = userEvent.setup();

    store.dispatch(logUserIn.fulfilled(
        {
          _id: "testsubject",
          name: "test",
          profile_picture: "test",
          top_three: {
            name: "test",
            books: [],
          },
          shelf: [],
          bookcase: [],
          followers: [],
          following: [],
        },
        "fulfilled"
      ))

    const { getByText, getByTestId } = render(<Provider store={store}><MemoryRouter><ShelfCreatePage edit /></MemoryRouter></Provider>);
    
    expect(getByText("Save shelf")).toBeInTheDocument();

    await user.click(getByTestId("save-shelf"));

    expect(navigate).toHaveBeenCalledWith("/testsubject");

});