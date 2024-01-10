import { cleanup, render, within } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";
import userEvent from "@testing-library/user-event";
import profileFetch from "../../__mocks__/profileFetch";
import "@testing-library/jest-dom";

afterEach(cleanup);

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => [profileFetch],
  })
);

it("SearchBar renders without problems", () => {
  render(<SearchBar />);
});

it("SearchBar click on chip changes filled chip", async () => {
  const mockSetFilter = jest.fn();
  const user = userEvent.setup();

  const { getByTestId } = render(<SearchBar fullSearch setActiveSearchFilterPage={mockSetFilter} />);

  const chipSection = getByTestId("chip-section");
  const chips = within(chipSection).getAllByRole("button");

  const chip0FilledBeforeClick = chips[0].classList.contains("MuiChip-filled");
  const chip1FilledBeforeClick = chips[1].classList.contains("MuiChip-filled");

  await user.click(chips[1]);

  const chip0FilledAfterClick = chips[0].classList.contains("MuiChip-filled");
  const chip1FilledAfterClick = chips[1].classList.contains("MuiChip-filled");

  expect(chip0FilledBeforeClick).toBe(true);
  expect(chip1FilledBeforeClick).toBe(false);
  expect(chip0FilledAfterClick).toBe(false);
  expect(chip1FilledAfterClick).toBe(true);
  expect(mockSetFilter).toHaveBeenCalled();
});

it("SearchBar with chip is only read", async () => {
  const genres = ["Genre1", "Genre2"];
  const { getByTestId } = render(<SearchBar fullSearch genreChips={genres} />);

  const searchbar = getByTestId("input-searchbar");
  const input = within(searchbar).getByRole("textbox");

  expect(input.hasAttribute("readonly", "true")).toBeTruthy();
});

it("SearchBar delete chip calls delete function", async () => {
  const user = userEvent.setup();
  const mockDeleteChip = jest.fn();
  const genres = ["Genre1", "Genre2"];

  const { getByTestId } = render(<SearchBar fullSearch genreChips={genres} deleteChip={mockDeleteChip} />);

  const searchbar = getByTestId("input-searchbar");
  const cancelButtons = within(searchbar).getAllByTestId("CancelIcon");

  await user.click(cancelButtons[0]);

  expect(mockDeleteChip).toHaveBeenCalled();
});

it("SearchBar input should call fetch and open popper", async () => {
  const user = userEvent.setup();
  const mockSetActiveFilter = jest.fn();

  const { getByTestId, getByRole } = render(<SearchBar fullSearch setActiveSearchFilterPage={mockSetActiveFilter} />);

  const searchbar = getByTestId("input-searchbar");
  const input = within(searchbar).getByRole("textbox");

  const chipSection = getByTestId("chip-section");
  const chips = within(chipSection).getAllByRole("button");

  await user.click(chips[3]);
  await user.type(input, "test");

  expect(input.value).toBe("test");
  expect(global.fetch).toHaveBeenCalled();
  expect(getByRole("tooltip")).toBeInTheDocument();
});

it("SearchBar input should be removed when clicking cancel icon", async () => {
  const user = userEvent.setup();
  const mockSetActiveFilter = jest.fn();

  const { getByTestId } = render(<SearchBar fullSearch setActiveSearchFilterPage={mockSetActiveFilter} />);

  const searchbar = getByTestId("input-searchbar");
  const input = within(searchbar).getByRole("textbox");

  const cancelButton = within(searchbar).getByTestId("CancelIcon");

  await user.type(input, "te");
  await user.click(cancelButton);

  expect(input.value).toBe("");
});
