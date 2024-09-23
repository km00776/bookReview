import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../Home";
import SearchBar from "../components/SearchBar/SearchBar";
// Mock the useBooks hook

const mockData = {
  title: "Some Book Title",
  ISBN: "12345",
  author: "John Doe",
  rating: 4,
  coverImage:
    "https://m.media-amazon.com/images/I/41s4IPscgtL._SX342_SY445_QL70_ML2_.jpg",
};

jest.mock("../../../hooks/useBooks", () => ({
  useBooks: () => ({
    books: [mockData],
    getBooks: jest.fn(),
    getBookByName: jest.fn((searchTerm) => {
      // Mock the search function: return an empty array if searchTerm doesn't match
      if (
        searchTerm !== "Some Book Title" &&
        searchTerm !== "Another Book Title"
      ) {
        return [];
      }
    }),
    loading: false,
    error: null,
  }),
}));
const mockedUsedNavigate = jest.fn();

// Properly mock the `useNavigate` hook from `react-router-dom`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate, // Return a mocked version of `useNavigate`
}));

describe("Home Component", () => {
  test("navigates to details page when book card is clicked", () => {
    // Render the Home component inside a MemoryRouter
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    // Find the book card button and simulate a click event
    const bookCard = screen.getByTestId("book-card-button");
    expect(bookCard).toBeInTheDocument(); // Ensure the button is rendered
    fireEvent.click(bookCard); // Simulate a click

    // Expect `mockNavigate` to have been called with the correct arguments
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/Details", {
      state: {
        book: mockData,
      }, // Expecting any book object
    });
  });
  // test("Render no books when search doesn't match any books", () => {
  //   const mockNavigate = jest.fn(); // Create a jest mock function
  //   (useNavigate as jest.Mock).mockReturnValue(mockNavigate); // Set `useNavigate` to return the mockNavigate function
  //   const setSearch = jest.fn((value) => {});

  //   // Render the Home component inside a MemoryRouter
  //   render(
  //     <MemoryRouter>
  //       <Home />
  //     </MemoryRouter>,
  //   );

  //   // Find the book card button and simulate a click event
  //   const searchInput = screen.getByTestId("search-input");
  //   expect(searchInput).toBeInTheDocument();

  //   fireEvent.change(searchInput, { target: { value: "Random Book" } });

  //   // Assert the input value has changed
  //   expect(searchInput).toHaveValue("Random Book");
  //   const formBtn = screen.getByTestId("search-btn");
  //   expect(formBtn).toBeInTheDocument();

  //   fireEvent.click(formBtn);

  //   const text = screen.getByTestId("no-books-found");
  //   expect(text).toBeInTheDocument();
  // });
});
