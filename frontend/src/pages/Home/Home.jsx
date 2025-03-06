import React from "react";
import "./Home.css";
import TextBox from "../../components/TextBox/TextBox";

function Home() {
    return (
        <div className="home-container">
            <TextBox
                title = "Take Learning to New Places"
                content = "With RespeakAI, you can earn any language you choose and have it personalized to your learning"
                position = "top-right"
            />
            <TextBox
                title = "Take Learning to New Places"
                content = "With RespeakAI, you can earn any language you choose and have it personalized to your learning"
                position = "bottom-left"
            />
        </div>
    );
}

export default Home;