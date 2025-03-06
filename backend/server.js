const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const discussion = require('./AI.js');
const teacher = require('./AI.js');
const test_generator = require('./AI.js');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Add new user to table
app.post('/users', (req, res) => {
    let { username, fullname, email, password, nativeLanguage, points, created, cacheData } = req.body;
    db.query("INSERT INTO users (username, fullname, email, password, nativeLanguage, points, created, cacheData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [username, fullname, email, password, nativeLanguage, points, created, cacheData], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({
                id: result.insertId,
                username,
                fullname,
                email,
                password,
                nativeLanguage,
                points,
                created,
                cacheData
            });
        });
});

//User adds a language, create new row of username...language...etc
app.post('/users/:language', (req, res) => {
    let newLanguage = req.params.language;
    let { language, username, level, sublevel, points } = req.body;
    const insertLanguageQuery = `INSERT INTO language (language, username, level, sublevel, points) VALUES (?, ?, ?, ?, ?)`;
    db.query(insertLanguageQuery,
        [language, username, level, sublevel, points], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                language: newLanguage,
                username,
                level,
                sublevel,
                points
            });
        });
});

//Fetch all users
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

//Fetch one user
app.get('/users/:username', (req, res) => {
    let username = req.params.username;
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
        if (err) {
            res.status(500).json({ error: "User not found" });
            return;
        }
        res.json(rows);
    })
});


//Update user level
app.put('/users/:username/:language/level', (req, res) => {
    let language = req.params.language;
    let newLevel = req.body.level;
    let subLevel = req.body.subLevel;
    let username = req.params.username;
    if (!newLevel || isNaN(newLevel)) {
        res.status(400).json({ error: "Invalid level" });
        return;
    }
    if (!subLevel || isNaN(subLevel)) {
        res.status(400).json({ error: "Invalid level" });
        return;
    }
    //Check if users exist in table
    db.query("SELECT * FROM language WHERE username = ?, language = ?", [username, language], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        //Update user level if user exists
        db.query("UPDATE language SET level = ?, sublevel = ? WHERE username = ?", [newLevel, subLevel, username], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "User level updated successfully" });
        });
    });
});

//Mapping different functions
const bots = {
    discussion: async (input, learned_language, userLevel, last_chats, native_language) => {
        const response = await discussion(input, learned_language, userLevel, last_chats, native_language);
        return response;
    },
    teacher: async (userLevel, last_lessons, learned_language, native_language) => {
        const response = await teacher(userLevel, last_lessons, learned_language, native_language);
        return response;
    },
    translate: async (user, learned_language) => {
        const response = await test_generator(user, learned_language);
        return response;
    }
};

//Call AI to generate next message
app.get('/next_discussion_message/:username/:bot', async (req, res) => {
    let username = req.params.username;
    let botName = req.params.bot;
    let { language, message } = req.body;

    //Selects user messages in specified language
    const last_messages = await new Promise((resolve, reject) => {
        db.query("SELECT message FROM chat WHERE username = ? AND language = ?", [username, language], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(row => row.message));
        });
    });

    // selects level/sublevel of specified user
    const { level, sub_level } = await new Promise((resolve, reject) => {
        db.query("SELECT level, sublevel FROM language WHERE username = ? AND language = ?", [username, language], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) reject(new Error("User level data not found"));
            else resolve({ level: rows[0].level, sub_level: rows[0].sublevel });
        });
    });
    const nativeLanguage = await new Promise((resolve, reject) => {
        db.query("SELECT nativeLanguage FROM users WHERE username = ?", [username], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) reject(new Error("User level data not found"));
            else resolve(rows[0].nativeLanguage);
        });
    });
    //call botmap
    const botFunction = bots[botName];
    if (!botFunction) {
        res.status(400).json({ error: `Unknown bot: ${botName}` });
        return;
    }

    //calls OpenAI API for a chosen bot
    //TODO: need to include sublevel in function params
    let response;
    if (botName === "discussion") {
        response = await botFunction(message, language, level, last_messages, nativeLanguage);
    } else if (botName === "teacher") {
        response = await botFunction(level, last_messages, language, nativeLanguage);
    } else if (botName === "translate") {
        response = await botFunction(username, language);
    }
    res.json({ response });
});



discussion("Hola, me llamo Grant. Me gustar peros.", "spanish", "beginner");