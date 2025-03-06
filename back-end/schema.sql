PRAGMA foreign_keys = ON;

CREATE TABLE users (
    username VARCHAR[20],
    fullname = VARCHAR[40] NOT NULL,    
    email VARCHAR[30] NOT NULL,
    userlevel INTEGER NOT NULL,
    password VARCHAR[50] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    cachedata TEXT
)

CREATE TABLE flashcards {
    flashcardID INTEGER PRIMARY KEY AUTOINCREMENT,
    skillLevel INTEGER NOT NULL,
    lang VARCHAR[20] NOT NULL,
    question VARCHAR[50] NOT NULL,
    answer VARCHAR[40] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
}

CREATE TABLE tests {
    
}
