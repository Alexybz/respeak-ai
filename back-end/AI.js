const { OpenAI } = require('openai');

const configuration = {apiKey: OPENAI_API_KEY};

const openai = new OpenAI(configuration);

const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the database');
    }
  });
   
async function discussion(input, learned_language, userLevel, last_chats, native_language) {
    let all_chats = "";
    let count = 1
    for(let i = last_chats.length; i >= 0; i--) {
        all_chats += count + ": " + last_chats[i] + " |";
        count++;
    }
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a going to act as a classmate to a student learning a foreign language. You will have conversation with them and help them develope thier skills.'},
            {role: 'system', content: 'The following string you will recieve is a list of all the previous chats sent by the user. Each chat will start with a number and period, with 1 being most recent. Use these chats to respond within the topic of discussion.', all_chats},
            {role: 'system', content: 'Talk to the user in the following language: ' + learned_langauge + '.'},
            {role: 'system', content: 'Assume your classmate is ' + userLevel + 'of proficiency at their language'},
            {role: 'system', content: 'Respond to the most recent message from the user, keeping in mind the topic of the conversation. If there is a mistake in the previous message, you should briefly correct the error in the users native language: ' + native_language + '.'},
            {role: 'system', content: 'Explain the grammar tool that was incorrectly used and why the correct use is good.'},
            {role: 'system', content: 'First output any corrections to the message that the user input by acknowledging you understand, but have a few changes to make. Then present your corrections and take two newlines. Then respond naturally to the message to continue the conversation'},
            {role: 'system', content: 'If you cannot understand a meaning from the user message, correct the user grammar mistakes and ask a folllow up question to get the conversation back on track'},
            {role: 'user', content: input},
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0].message.content);
}

async function teacher(userLevel, last_lessons, learned_language, native_language) {
    let all_lessons = "";
    let count = 1;
    for(let i = last_lessons.length; i >= 0; i--) {
        all_lessons += count + ": " + last_lessons[i] + " |";
        count++;
    }
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'The following string you will recieve is a list of all the previous lessons given to the user. Each chat will start with a number and period, with 1 being most recent. Use these chats to respond within the progression of your lessons.', all_lessons},
            {role: 'system', content: 'You are a world language teacher teaching ' + learned_language + ' to a student whos native language is: ' + native_language + '. These are the student’s last 5 lessons: ' + all_lessons + '. The student is ' + userLevel + ' level of proficiency. Continue teaching them' + learned_language + 'at this level.'},
            {role: 'user', content: user, last_lessons, learned_language},
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0].message.content);
}

async function test_generator(user, learned_language) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a test generating AI assistant that generates tests for foreign language learners. Generate a test for a student studying ' + learned_language + '. Generate a list of JSON objects formatted in the following way: { question : answer }. Questions can be fill in the blank or short answer.'},
            {role: 'user', content: user, learned_language},
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0].message.content);
}

async function flashcard_generator(user, learned_language, topic) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a flashcard generating AI that provides questions in different formats. Choose from the formats { statement : translation }, where the user will provide a translation for the statement you provided, or a sentence with a blank where the user’s answer should be equal to the blank’s correct response.'},
            {role: 'user', content: user, learned_language, topic},
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0].message.content);
}

async function test_checker(user, learned_language, test) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You will receive a question and answer in the format {question : answer}. Check if the answer correctly responds/fits in with the given question. If it does, return correct, if not, return incorrect.'},
            {role: 'user', content: user, learned_language, test},
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0].message.content);
}


module.exports = discussion;