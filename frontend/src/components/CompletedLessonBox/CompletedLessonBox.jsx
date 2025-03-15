import React from "react";
import "./CompletedLessonBox.css";

const CompletedLessonBox = ({lessonName, progress, nextLessonUrl}) => {
    return (
        <div className={`lesson`}>
            <h2>{lessonName}</h2>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <a 
                href={nextLessonUrl}
                className="next-button"
                aria-label="Go to lesson"
            >
                <svg className="next-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
                </svg>
            </a>
        </div>
    );
}
export default CompletedLessonBox;