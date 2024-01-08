import { cleanup, render } from "@testing-library/react";
import FollowerList from "../../src/components/FollowerList"
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import * as router from 'react-router';

const navigate = jest.fn()

beforeEach(() => {
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

afterEach(cleanup);

it("FollowerList should render without problems", () => {
  render(<MemoryRouter><FollowerList /></MemoryRouter>);
});

it("FollowerList should render item(profile) with correct name", () => {
    const followers = [
        {_id: "karel", profile_picture: "kaas.jpg"}
    ]
  const { getByText } = render(<MemoryRouter><FollowerList list={followers} /></MemoryRouter>);
  const karel = getByText(followers[0]._id,{exact: false});
  expect(karel).toBeDefined()
});

it("FollowerList should render item(profile) with correct avatar", async() => {
    const followers = [
        {_id: "karel", profile_picture: "kaas.jpg"}
    ]
    const { getByRole } = render(<MemoryRouter><FollowerList list={followers} /></MemoryRouter>);
    const avatar = getByRole("img");
  
    const matcher = new RegExp(followers[0].profile_picture);
    expect(avatar.src).toMatch(matcher)
});

it("navigate to correct profile", async() => {
    const followers = [
        {_id: "karel", profile_picture: "kaas.jpg"}
    ]
    const user = userEvent.setup();
	const { getByRole } = render(
        <MemoryRouter initialEntries={["/"]}>
            <FollowerList list={followers} handleClose={() => {}} />
        </MemoryRouter>
	);

    const button = getByRole('button', {name: /view/i});

	const expectedResult = `/${followers[0]._id}`;

	await user.click(button);

	await expect(navigate).toHaveBeenCalledWith(expectedResult);
});
