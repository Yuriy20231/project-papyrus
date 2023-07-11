import axios from "axios";
import { shuffleArray } from "./shuffle-array";
import { addLoader, removeLoader } from "./loader";

// DOCUMENTATION
// https://docs.google.com/document/d/15RSRcipKeAT89NMrsonByu1d_WfNXkiM0Uk7ubXb6XM/edit?usp=share_link

export async function getCategories() {
    const CATEGORY_LIST_URL =
        "https://books-backend.p.goit.global/books/category-list";
    addLoader();
    const resp = await axios.get(`${CATEGORY_LIST_URL}`);
    const list = resp.data.map((obj) => {
        return obj["list_name"];
    });
    removeLoader();
    return list;
}

export async function getTopBooks(amount = 4, shuffle = true) {
    const TOP_BOOKS_URL = "https://books-backend.p.goit.global/books/top-books";
    addLoader();
    const resp = await axios.get(`${TOP_BOOKS_URL}`);

    let rightIndex = amount - 1;
    if (rightIndex < 0 || rightIndex > resp.data.length - 1) {
        rightIndex = resp.data.length - 1;
    }
    const data = [...resp.data];
    if (shuffle) {
        shuffleArray(data);
    }
    const selectedData = [];
    for (let i = 0; i < rightIndex + 1; i += 1) {
        selectedData.push(data[i]);
    }
    const parsedData = selectedData.map((category) => {
        return {
            categoryName: category["list_name"],
            books: category.books.map((book) => {
                return {
                    id: book["_id"],
                    title: book.title,
                    author: book.author,
                    bookImage: book["book_image"],
                    categoryName: book["list_name"],
                    description: book.description,
                    buyLinks: book["buy_links"].filter((obj) => {
                        return (
                            obj.name === "Amazon" ||
                            obj.name === "Apple Books" ||
                            obj.name === "Bookshop"
                        );
                    })
                };
            })
        };
    });
    removeLoader();
    return parsedData;
}

export async function getBooksByCategory(category = "") {
    const CATEGORY_BASE_URL =
        "https://books-backend.p.goit.global/books/category?category=";
    category = category.trim().replace(/\s+/g, "+");
    addLoader();
    const resp = await axios.get(`${CATEGORY_BASE_URL}${category}`);
    const parsedData = resp.data.map((book) => {
        return {
            id: book["_id"],
            title: book.title,
            author: book.author,
            bookImage: book["book_image"],
            categoryName: book["list_name"],
            description: book.description,
            buyLinks: book["buy_links"].filter((obj) => {
                return (
                    obj.name === "Amazon" ||
                    obj.name === "Apple Books" ||
                    obj.name === "Bookshop"
                );
            })
        };
    });
    removeLoader();
    return parsedData;
}

export async function getBookById(bookId = "") {
    const BOOKID_BASE_URL = "https://books-backend.p.goit.global/books/";
    bookId = bookId.trim().replace(/\s+/g, "+");
    addLoader();
    const resp = await axios.get(`${BOOKID_BASE_URL}${bookId}`);
    removeLoader();
    return {
        id: resp.data["_id"],
        title: resp.data.title,
        author: resp.data.author,
        bookImage: resp.data["book_image"],
        categoryName: resp.data["list_name"],
        description: resp.data.description,
        
        buyLinks: resp.data["buy_links"].filter((obj) => {
            return (
                obj.name === "Amazon" ||
                obj.name === "Apple Books" ||
                obj.name === "Bookshop"
            );
        })
    };
}
