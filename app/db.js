// import * as SQLite from "expo-sqlite";
import * as SQLite from "expo-sqlite/legacy";
import React, { useEffect, useState } from "react";

const db = SQLite.openDatabase("cards.db"); // Open (or create) the SQLite database

// Create table with userId to link card details to a specific user
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cardDetails (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        userId TEXT,
        cardNumber TEXT, 
        cardHolderName TEXT, 
        expiryDate TEXT
      );`,
      [],
      () => {
        console.log("Card details table created or already exists");
      },
      (_, error) => {
        console.error("Error creating table: ", error);
      }
    );
  });
};

// Function to save credit card details with userId
export const saveCardDetails = (
  userId,
  cardNumber,
  cardHolderName,
  expiryDate
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO cardDetails (userId, cardNumber, cardHolderName, expiryDate) VALUES (?, ?, ?, ?);",
      [userId, cardNumber, cardHolderName, expiryDate],
      () => {
        console.log("Card details saved successfully for user:", userId);
      },
      (_, error) => {
        console.error("Error saving card details: ", error);
      }
    );
  });
};

// Function to fetch card details for a specific userId
export const getCardDetails = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM cardDetails WHERE userId = ? LIMIT 4;", // Fetch card for the given userId
      [userId],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(rows._array[0]); // Return the first card record for that user
        } else {
          callback(null); // No card details found for this user
        }
      },
      (_, error) => {
        console.error("Error fetching card details: ", error);
      }
    );
  });
};

// get all the cards details for the users
export const getCards = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM cardDetails WHERE userId = ? LIMIT 4;", // Fetch up to 4 cards for the given userId
      [userId],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(rows._array); // Return the entire array of card records
        } else {
          callback(null); // No card details found for this user
        }
      },
      (_, error) => {
        console.error("Error fetching card details: ", error);
      }
    );
  });
};

// get card detail by ID
export const getCardDetailsById = (cardId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM cardDetails WHERE id = ?;", // Fetch card by its unique cardId
      [cardId],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(rows._array[0]); // Return the specific card record
        } else {
          callback(null); // No card details found for this id
        }
      },
      (_, error) => {
        console.error("Error fetching card details by ID: ", error);
      }
    );
  });
};

export const deleteCardById = (cardId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM cardDetails WHERE id = ?;",
      [cardId],
      (_, result) => {
        callback(result);
      },
      (_, error) => {
        console.error("Error deleting card: ", error);
      }
    );
  });
};
