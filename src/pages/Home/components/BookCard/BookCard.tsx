import React from "react";
import styles from "./BookCard.module.css";

import { Book } from "../../../../types/bookTypes";

export type BookCardProps = Partial<Book> & {
  onPress: any;
};

export const BookCard = ({
  title,
  author,
  rating,
  ISBN,
  onPress,
}: BookCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <h2>by {author}</h2>
        <h3>{rating ? `Rating: ${rating} / 5` : "No rating available"} </h3>
        <h4>ISBN: {ISBN}</h4>
      </div>
      <button
        onClick={onPress}
        data-testid="book-card-button"
        className={styles.btn}
      >
        Find out more
      </button>
    </div>
  );
};
