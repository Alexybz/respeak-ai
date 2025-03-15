import React from "react";
import CompletedLessonBox from "../../components/CompletedLessonBox/CompletedLessonBox";
import "./Learn.css";
function Learn() {
    //sample data, call from db
    const lessons = [
        {
            id: 1,
            name: "Lesson 1 - My",
            progress: 100,
            nextUrl: "/learn/lesson2"
        },
        {
            id: 2,
            name: "Lesson 2 - Greetings",
            progress: 75,
            nextUrl: "/learn/lesson3"
        },
        {
            id: 3,
            name: "Lesson 3 - Basic Phrases",
            progress: 50,
            nextUrl: "/learn/lesson4"
        },
        {
            id: 4,
            name: "Lesson 4 - Numbers",
            progress: 25,
            nextUrl: "/learn/lesson5"
        },
        {
            id: 5,
            name: "Lesson 5 - Colors",
            progress: 0,
            nextUrl: "/learn/lesson6"
        }
    ];
    return (  
        <div className="learn-container">
            <h1>Time to Learn!</h1>

            <div className="lessons-container">
                <h1>Completed Lessons</h1>
                {lessons.map(lesson =>(
                    <CompletedLessonBox
                        lessonName={lesson.name}
                        progress={lesson.progress}
                        nextLessonUrl={lesson.nextUrl}
                    />
                ))}
            </div>
        </div>
        
    );
}

export default Learn;