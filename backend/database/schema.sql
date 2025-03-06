PRAGMA foreign_keys = ON;
--Enter database.db: sqlite3 database/database.db
--Run setup.sql: sqlite3 database/database.db < database/schema.sql

CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR[20],
    fullname VARCHAR[40] NOT NULL,    
    email VARCHAR[30] NOT NULL,
    password VARCHAR[50] NOT NULL,
    nativeLanguage VARCHAR[20] NOT NULL,
    points INTEGER DEFAULT 0,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    cacheData TEXT
);

CREATE TABLE IF NOT EXISTS Languages (
    language VARCHAR[20] NOT NULL,
    username VARCHAR[20] NOT NULL,
    level VARCHAR[10] NOT NULL,
    sublevel INTEGER NOT NULL,
    points INTEGER NOT NULL,
    PRIMARY KEY(username, language)
);

CREATE TABLE IF NOT EXISTS Chat (
    chatID INTEGER NOT NULL,
    senderID INTEGER NOT NULL,
    receiverID INTEGER NOT NULL,
    username VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Flashcards (
    flashcardID INTEGER PRIMARY KEY AUTOINCREMENT,
    skillLevel INTEGER NOT NULL,
    lang VARCHAR[20] NOT NULL,
    question VARCHAR[50] NOT NULL,
    answer VARCHAR[40] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Tests (
    testID INTEGER NOT NULL,
    questions TEXT NOT NULL,
    skillLevel INTEGER NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Teacher (
    teacherID INTEGER NOT NULL,
    teacherLanguage VARCHAR[30] NOT NULL,
    lang VARCHAR[30] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS AnswerCheck (
    checkID INTEGER NOT NULL,
    testID INTEGER NOT NULL,
    question TEXT NOT NULL,
    providedAnswer TEXT NOT NULL,
    correctAnswer TEXT NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);