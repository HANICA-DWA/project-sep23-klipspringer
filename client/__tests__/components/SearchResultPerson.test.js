import { cleanup, render } from "@testing-library/react";
import SearchResultPerson from "../../src/components/SearchResultPerson";
import userEvent from "@testing-library/user-event";

const person = { _id: "123", profile_picture: "test", name: "testname" };
const author = { key: "OA123", _id: "J.K. Rowling", profile_picture: "test", name: "testname" };

const closePopper = jest.fn();
const onClick = jest.fn();

afterEach(cleanup);

it("SearchResultPerson renders without problems", () => {
  render(<SearchResultPerson person={person} />);
});

it("SearchResultPerson renders without problems with person", () => {
  const { getByTestId } = render(<SearchResultPerson person={person} />);

  const personId = getByTestId("person-id");
  const personType = getByTestId("person-type");

  expect(personId.textContent).toBe(String(person._id));
  expect(personType.textContent).toBe("Profile");
});

it("SearchResultPerson renders without problems with author", () => {
  const { getByTestId } = render(<SearchResultPerson author person={author} />);

  const personId = getByTestId("person-id");
  const personType = getByTestId("person-type");

  expect(personId.textContent).toBe(String(author._id));
  expect(personType.textContent).toBe("Author");
});

it("SearchResultPerson click on button calls functions with person", async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<SearchResultPerson person={person} onClick={onClick} closePopper={closePopper} />);

  const button = getByRole("button");
  await user.click(button);

  expect(closePopper).toHaveBeenCalled();
  expect(onClick).toHaveBeenCalledWith({ type: "person", person: { _id: person._id } });
});

it("SearchResultPerson click on button calls functions with author", async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<SearchResultPerson author person={author} onClick={onClick} closePopper={closePopper} />);

  const button = getByRole("button");
  await user.click(button);

  expect(closePopper).toHaveBeenCalled();
  expect(onClick).toHaveBeenCalledWith({ type: "author", author: { _id: author.key } });
});
