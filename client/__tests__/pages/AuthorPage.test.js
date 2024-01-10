import { cleanup, render } from "@testing-library/react";
import * as router from 'react-router';
import AuthorPage from "../../src/pages/AuthorPage";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store";
import '@testing-library/jest-dom'

jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useEffect: jest.fn()
  }))
import * as React from 'react';

beforeEach(() => {
    jest.spyOn(router, "useParams").mockImplementation(() => {return {author: "test"}})
    React.useState.mockImplementation(jest.requireActual('react').useState);
    React.useEffect.mockImplementation(jest.requireActual('react').useEffect);
});

afterEach(cleanup);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

it("Should render the AuthorPage component", () => {
    render(<ThemeProvider theme={theme}><MemoryRouter><Provider store={store}><AuthorPage /></Provider></MemoryRouter></ThemeProvider>);
});

it("Should render the AuthorPage authorname", async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({name: "test", size: 0, entries: []}),
      })
    );

    useEffectSpy = jest.spyOn(React, 'useEffect')
    useEffectSpy.mockImplementation(() => {});


    const { findByText } = render(<ThemeProvider theme={theme}><MemoryRouter basename="/"><Provider store={store}><AuthorPage/></Provider></MemoryRouter></ThemeProvider>);

    expect(await findByText("test")).toBeInTheDocument();
});

