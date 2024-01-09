import { cleanup, render } from "@testing-library/react";
import ProfileInfo from "../../src/components/ProfileInfo";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

it("Should render ProfileInfo without problems", () => {
    render(<MemoryRouter><ProfileInfo /></MemoryRouter>);
});

it("should create a clickable link", () => {
    const { getAllByRole } = render(<MemoryRouter><ProfileInfo name="test" avatar="nope" handle="test123" /></MemoryRouter>);
    expect(getAllByRole("link")[0].href).toBe("http://localhost/test123");
});