import { useState } from 'react';
import '../styles/Hero.scss';

const Hero = () => {
    const [titleFontSize, setTitleFontSize] = useState(3.5);
    const [subTitleFontSize, setSubTitleFontSize] = useState(1.5);
    const [titleColor, setTitleColor] = useState('var(--primary-color)');

    const zoomIn = () => {
        if (titleFontSize > 4.2) return;

        setTitleFontSize(titleFontSize + 0.3);
        setSubTitleFontSize(subTitleFontSize + 0.05);
    };

    const zoomDown = () => {
        if (titleFontSize < 2.6) return;

        setTitleFontSize(titleFontSize - 0.3);
        setSubTitleFontSize(subTitleFontSize - 0.05);
    };

    const changeColor = () => {
        const colors = ['var(--primary-color)', '#71ff54', '#82daff', '#9582ff', '#f582ff', '#82ffb2'];

        let nextIndex = colors.indexOf(titleColor) + 1;
        if (nextIndex > colors.length - 1) nextIndex = 0;

        setTitleColor(colors[nextIndex]);
    };

    return (
        <div className="hero">
            <div className="background" />

            <h1 style={{ fontSize: `${titleFontSize}em`, color: `${titleColor}` }}>Welcome to Acting Competition!</h1>
            <p style={{ fontSize: `${subTitleFontSize}em` }}>
                Login into your account and start competing! You can get all the latest information regarding us here
                and get along with the community.
            </p>

            <div className="buttons no-select">
                <div className="top">
                    <button onClick={zoomIn}>Zoom In</button>
                    <button onClick={zoomDown}>Zoom Out</button>
                </div>
                <div className="bottom">
                    <button onClick={changeColor}>Change Color</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
