import React from "react";
import styles from "./Details.module.css";
import { Book } from "../../types/bookTypes";

interface DetailsProps {
  book: Book;
}

const Details = ({ book }: DetailsProps) => {
  const { ISBN, title, author, coverImage, rating } = book;
  return (
    <div className={styles.container}>
      <header className={styles.title}>
        <h1 className={styles.tite}>Book Details</h1>
      </header>
      <div className={styles.row}>
        <img src={coverImage} alt={"in-too-deep-book"} />
        <div className={styles.column}>
          <h2> {title}</h2>
          <h3>{author}</h3>
          <h4>{ISBN}</h4>
          <h5>{rating ? `${rating} / 5` : "No ratings available"}</h5>
        </div>
      </div>
      {/* <div className="content"></div> */}
    </div>
  );
};

export default Details;
