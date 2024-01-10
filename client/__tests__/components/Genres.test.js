import { cleanup, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Genres from "../../src/components/Genres";
import genresFetch from "../../__mocks__/genresFetch.json";

const setChips = jest.fn();
const selectedChips = [];

afterEach(cleanup);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(genresFetch),
  })
);

it("Genres should render without problems", async () => {
  await act(async () => {
    render(<Genres setChips={setChips} selectedChips={selectedChips} />);
  });
});

it("Should render the subgenre chips", async () => {
  let getAllByRole;

  await act(async () => {
    const result = render(<Genres setChips={setChips} selectedChips={selectedChips} />);
    getAllByRole = result.getAllByRole;
  });

  const chips = getAllByRole("button");

  expect(chips[0].textContent).toBe(genresFetch[0].subgenres[0]._id);
});

it("Selected genre should be disabled", async () => {
  let getAllByRole;

  await act(async () => {
    const result = render(<Genres setChips={setChips} selectedChips={[genresFetch[0].subgenres[0]._id]} />);
    getAllByRole = result.getAllByRole;
  });

  const chips = getAllByRole("button");

  expect(chips[0].getAttribute("aria-disabled")).toBe("true");
});
