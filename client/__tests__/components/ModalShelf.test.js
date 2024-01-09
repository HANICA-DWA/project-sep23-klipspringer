import { cleanup, render } from "@testing-library/react";
import ModalShelf from "../../src/components/ModalShelf"
import userEvent from "@testing-library/user-event";
import store from "../../src/redux/store/store.js";
import { Provider } from "react-redux";
import * as router from 'react-router';
import { MemoryRouter } from "react-router";
import {logUserIn} from "../../src/redux/reducers/profileReducer.js";

const navigate = jest.fn()

global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({
      shelf: {
          name: "My top three",
          books: [
              {
                  _id: "9789048805839",
                  cover_image: "https://covers.openlibrary.org/b/id/11462163-M.jpg",
                  title: "Het is weer raak met Kees en Sjaak",
                  authors: [
                      "Kees van Nieuwkerk"
                  ]
              },
              {
                  _id: "9788466307420",
                  cover_image: null,
                  title: "La daga",
                  authors: [
                      "Philip Pullman"
                  ]
              }
          ],
          _id: "659bc850dcf784870406d896"
      }
  })
})
)

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

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

afterEach(cleanup);

it("ModalShelf should render without problems", () => {
    const shelfInfo = {}
    const open = true
    const handleClose = () => {}
    const book = {}
    render(<Provider store={store}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></Provider>);
});

it("ModalShelf should show top three as option", () => {
    const shelfInfo = {
        top_three: {
            name: "My top three",
            books: [
              {
                _id: "9667047393",
                cover_image: "https://covers.openlibrary.org/b/isbn/9667047393-M.jpg?default=false",
                title: "Harry Potter and the Philosopher's Stone",
                authors: [
                  "J. K. Rowling"
                ]
              }
            ],
            _id: "659bc850dcf784870406d896"
          },
        shelf: []
      }
    const open = true
    const handleClose = () => {}
    const book = {
        _id: "9667047393",
        cover_image: "https://covers.openlibrary.org/b/id/12649038-M.jpg",
        title: "Гаррі Поттер і філософський камінь",
        authors: [
            "J. K. Rowling"
        ]
    }
    const {getByText} = render(<Provider store={store}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></Provider>);
    const topthree = getByText(shelfInfo.top_three.name)
    expect(topthree).toBeDefined()
});

it("ModalShelf should show custom shelf as option", () => {
  const shelfInfo = {
      top_three: {
          name: "My top three",
          books: [
            {
              _id: "9667047393",
              cover_image: "https://covers.openlibrary.org/b/isbn/9667047393-M.jpg?default=false",
              title: "Harry Potter and the Philosopher's Stone",
              authors: [
                "J. K. Rowling"
              ]
            }
          ],
          _id: "659bc850dcf784870406d896"
        },
      shelf: [{
        name: "testplank",
        books: [
          {
            _id: "9667047393",
            cover_image: "https://covers.openlibrary.org/b/isbn/9667047393-M.jpg?default=false",
            title: "Harry Potter and the Philosopher's Stone",
            authors: [
              "J. K. Rowling"
            ]
          }
        ],
        _id: "659bc850dcf784870406d777"
      },]
    }
  const open = true
  const handleClose = () => {}
  const book = {
      _id: "9667047393",
      cover_image: "https://covers.openlibrary.org/b/id/12649038-M.jpg",
      title: "Гаррі Поттер і філософський камінь",
      authors: [
          "J. K. Rowling"
      ]
  }
  const {getByText} = render(<Provider store={store}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></Provider>);
  const customshelf = getByText(shelfInfo.shelf[0].name)
  expect(customshelf).toBeDefined()
});


it("ModalShelf should close after click on shelf", async () => {
  const user = userEvent.setup()
  const shelfInfo = {
      top_three: {
          name: "My top three",
          books: [
            {
              _id: "9667047393",
              cover_image: "https://covers.openlibrary.org/b/isbn/9667047393-M.jpg?default=false",
              title: "Harry Potter and the Philosopher's Stone",
              authors: [
                "J. K. Rowling"
              ]
            }
          ],
          _id: "659bc850dcf784870406d896"
        },
      shelf: []
    }
  const open = true
  const handleClose = jest.fn()
  const book = {
      _id: "9781644732106",
      cover_image: "https://covers.openlibrary.org/b/id/12649038-M.jpg",
      title: "Harry&nbsp;Potter y el Cáliz de Fuego / Harry Potter and the Goblet of Fire",
      authors: [
          "J. K. Rowling"
      ]
  }
  const {getByTestId} = render(<Provider store={store}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></Provider>);
  const topthree = getByTestId("1234-modalshelf-stack")
  await user.click(topthree)
  expect(handleClose).toHaveBeenCalled()
});

it("clicking create new shelf should go to shelf page", async () => {
  const user = userEvent.setup()
  const shelfInfo = {}
  const open = true
  const handleClose = () => {}
  const book = {}
  const {getByTestId} = render(<Provider store={store}><MemoryRouter initialEntries={["/"]}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></MemoryRouter></Provider>);
  const newshelfbutton = getByTestId("add-new-shelf")
  await user.click(newshelfbutton)

  const expectedResult = `/1234567890/shelf`;
  expect(navigate).toHaveBeenCalledWith(expectedResult);
});

it("clicking close button should close modal", async () => {
  const user = userEvent.setup()
  const shelfInfo = {}
  const open = true
  const handleClose = jest.fn()
  const book = {}
  const {getByTestId} = render(<Provider store={store}><MemoryRouter initialEntries={["/"]}><ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={book}/></MemoryRouter></Provider>);
  const close = getByTestId("close-modal-shelf-button")
  await user.click(close)
  expect(handleClose).toHaveBeenCalled()
});