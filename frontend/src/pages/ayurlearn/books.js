import React from "react";
import Navbar from "@/components/ayurlearn/Navbar";
import books from "@/utils/books";
import BookBard from "@/components/ayurlearn/BookBard";

const Books = () => {
  return (
    <div className="modules">
      <Navbar link={"books"} />
      <div className="container w-full flex flex-col ">
        <h1 className="learn_heading">Books</h1>
        <div className="flex flex-row ">
          <div className="prompt_layout">
            {books.map((book, index) => (
              <BookBard
                number={index + 1}
                color={book.color}
                title={book.title}
                link={book.link}
                content={book.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
