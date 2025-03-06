PRAGMA foreign_keys = ON;

CREATE TABLE users (
    username VARCHAR[20],
    fullname VARCHAR[40] NOT NULL,    
    email VARCHAR[30] NOT NULL,
    password VARCHAR[50] NOT NULL,
    nativeLanguage VARCHAR[20] NOT NULL,
    points INTEGER DEFAULT 0,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    cacheData TEXT
)

CREATE TABLE language (
    language VARCHAR[20] NOT NULL,
    username VARCHAR[20] NOT NULL,
    level VARCHAR[10] NOT NULL,
    sublevel INTEGER NOT NULL,
    points INTEGER NOT NULL
    PRIMARY KEY(username, language)
)

CREATE TABLE chat (
    chatID INTEGER NOT NULL,
    senderID INTEGER NOT NULL,
    receiverID INTEGER NOT NULL,
    username VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE flashcards (
    flashcardID INTEGER PRIMARY KEY AUTOINCREMENT,
    skillLevel INTEGER NOT NULL,
    lang VARCHAR[20] NOT NULL,
    question VARCHAR[50] NOT NULL,
    answer VARCHAR[40] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE tests {
    testID INTEGER NOT NULL,
    questions TEXT NOT NULL,
    skillLevel INTEGER NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
}

CREATE TABLE teacher {
    teacherID INTEGER NOT NULL,
    teacherLanguage VARCHAR[30] NOT NULL,
    lang VARCHAR[30] NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
}


CREATE TABLE answerCheck {
    checkID INTEGER NOT NULL,
    testID INTEGER NOT NULL,
    question TEXT NOT NULL,
    providedAnswer TEXT NOT NULL,
    correctAnswer TEXT NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
}