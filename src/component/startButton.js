import React from 'react';
import { Play } from "lucide-react"
const StartButton = (props) => {
    const {handleStart, selectedOption,  isProcessing, videoUrls} = props;
    return (
        <button
            className="btn startBtn w-100"
            onClick={handleStart}
            disabled={!selectedOption || isProcessing || videoUrls.every(url => !url)}
        >
            {isProcessing ? 'Processing...' : 'Start'}
            {!isProcessing && <Play className="ms-2" style={{ height: '1rem', width: '1rem' }} />}
        </button>
    );
}

export default StartButton;