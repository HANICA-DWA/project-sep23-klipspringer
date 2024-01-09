import { cleanup, render } from "@testing-library/react";
import SocialCard from "../../src/components/SocialCard.jsx";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../src/redux/store/store.js";

afterEach(cleanup);

it("Should render SocialCard without problems", () => {
	render(<Provider store={store}><MemoryRouter><SocialCard /></MemoryRouter></Provider>);
});