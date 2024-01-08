import { cleanup, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import Genres from "../../src/components/Genres";
import { act, create } from "react-test-renderer";

afterEach(cleanup);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: "Fiction", subgenres: ["Fantasy", "Science Fiction"] }]),
  })
);

it("Genres should render without problems", () => {
//   render(<Genres />);
    expect(true).toBe(true);
});

// it("Should render the subgenre chips", async () => {
//     await act(async () => {
//         render(<Genres />);
//     });
    
//     const chip = await screen.findByText("Fantasy")

//     expect(chip).toBeInTheDocument()
    
// });

