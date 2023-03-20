

// LoadingPage.tsx
import React from 'react';
import { MoonLoader, ClipLoader, CircleLoader, RingLoader, BeatLoader } from 'react-spinners';
import './LoadingPage.css';
import logo from "../../assets/logo3.png";

interface LoadingPageProps {
    logoSrc: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ logoSrc }) => {
    return (<>
        <div className="loader-container">
            <div className="loader-logo-container">
                <ClipLoader size={250} color={"#4caf50"} />
                <img className="loader-logo" src={(logoSrc.length < 2) ? logo : logoSrc} alt="Logo" />
                <BeatLoader size={20} color={"#fff8f8"}  style={{position: "absolute", bottom: -40 }}/>

            </div>

        </div>
        </>
);
};

export default LoadingPage;
