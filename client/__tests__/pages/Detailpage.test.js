import { cleanup, render, act } from "@testing-library/react";
import Detailpage from "../../src/pages/Detailpage";
import store from "../../src/redux/store/store.js";
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";

afterEach(cleanup);

global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve(
        {
            "ISBN:9789048805839": {
                url: "https://openlibrary.org/books/OL32830135M/Het_is_weer_raak_met_Kees_en_Sjaak",
                key: "/books/OL32830135M",
                title: "Het is weer raak met Kees en Sjaak",
                authors: [
                    {
                        url: "https://openlibrary.org/authors/OL9324879A/Kees_van_Nieuwkerk",
                        name: "Kees van Nieuwkerk"
                    }
                ],
                number_of_pages: 111,
                pagination: "111 p.",
                by_statement: "Kees van Nieuwkerk",
                identifiers: {
                    isbn_10: [
                        "904880583X"
                    ],
                    isbn_13: [
                        "9789048805839"
                    ],
                    oclc: [
                        "712093779"
                    ],
                    openlibrary: [
                        "OL32830135M"
                    ]
                },
                publishers: [
                    {
                        name: "Moon"
                    }
                ],
                publish_places: [
                    {
                        name: "Amsterdam"
                    }
                ],
                publish_date: "2010",
                subjects: [
                    {
                        name: "Jeugdboeken ; verhalen",
                        url: "https://openlibrary.org/subjects/jeugdboeken_;_verhalen"
                    }
                ],
                ebooks: [
                    {
                        preview_url: "https://archive.org/details/hetisweerraakmet0000nieu",
                        availability: "borrow",
                        formats: {},
                        borrow_url: "https://openlibrary.org/books/OL32830135M/Het_is_weer_raak_met_Kees_en_Sjaak/borrow",
                        checkedout: true
                    }
                ],
                cover: {
                    small: "https://covers.openlibrary.org/b/id/11462163-S.jpg",
                    medium: "https://covers.openlibrary.org/b/id/11462163-M.jpg",
                    large: "https://covers.openlibrary.org/b/id/11462163-L.jpg"
                }
            }
        }
    )
})
)

const navigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    // React.useState.mockImplementation(jest.requireActual('react').useState);
    // React.useEffect.mockImplementation(jest.requireActual('react').useEffect);

    store.dispatch(logUserIn.fulfilled({
      _id: "1234567890",
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
    }, "fulfilled"));
  })

xit("Detailpage should render without problems", () => {
    act(()=> {
        render(<MemoryRouter><Provider store={store}><Detailpage /></Provider></MemoryRouter>);
    })
});

it('redirects to correct author page', async () => {
    const user = userEvent.setup()
    let getByTestId;
    await act(async () => {
        const result = render(<MemoryRouter><Provider store={store}><Detailpage /></Provider></MemoryRouter>)
        getByTestId = result.getByTestId
    })
    const link = getByTestId("author-page-link")
    console.log(link.outerHTML)
    // expect(navigate).toHaveBeenCalledWith("/author",expect.anything());
})