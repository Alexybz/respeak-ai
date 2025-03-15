import './Lesson.css';
import React from "react";

const Lesson = ({lessonName, progress}) => {
    return (
        <div className = {'inProgressLessonBox'}>
            <div className = {'titleAndProgress'}>
                <h2>{lessonName}</h2>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className = {'enterButton'}>
                <a href={nextLessonUrl}
                   className="next-button"
                   aria-label="Go to lesson">
                    <button className = {'enterButtonObject'}> > </button>
                <a>
            </div>
        </div>
    );
}

export default InProgressLessonBox;