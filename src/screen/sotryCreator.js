import React, { useState, useEffect, useContext } from 'react';
import { Video } from "lucide-react"
import GoogleLogin from '../component/googleLogin';
import { postData } from '../api/api';
import UrlInput from '../component/urlInput';
import SelectInput from '../component/selectInput';
import StartButton from '../component/startButton';
import TextArea from '../component/textArea';
import UpgradeButton from '../component/upgradeButton';
import FeedBack from '../component/feedback';
function StoryCreator() {
    const [videoUrls, setVideoUrls] = useState(['']);
    const [selectedOption, setSelectedOption] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [summary, setSummary] = useState('');
    const [transcript, setTranscript] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const options = [
        { value: 'summary', label: 'Create a summary', isPaid: false },
    ];

    useEffect(() => {
        const messageListener = (event) => {
            if (event.data.type === 'videoUrl' && event.data.url) {
                setVideoUrls([event.data.url]);
            } else {
                console.log("Received an irrelevant message:", event.data);
            }
        };
        window.addEventListener('message', messageListener);

        return () => {
            window.removeEventListener('message', messageListener);
        };
    }, []);

    useEffect(() => {
        if (videoUrls[0]) {
            getTranscript();
        }
    }, [videoUrls]);

    const getYouTubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(videoUrls[0]);

    const handleVideoUrlChange = (index, value) => {
        const updatedUrls = [...videoUrls];
        updatedUrls[index] = value;
        setVideoUrls(updatedUrls);
    };

    const addVideoUrl = () => {
        if (videoUrls.length < 3) setVideoUrls([...videoUrls, '']);
    };

    const removeVideoUrl = (index) => {
        const updatedUrls = videoUrls.filter((_, i) => i !== index);
        setVideoUrls(updatedUrls);
    };

    const handelSelectedOption = (e) => {
        setSelectedOption(e.target.value);
    };

    const vidoeSummary = async () => {
        try {
            const payload = {
                youtube_id: videoId,
                user_id: 'bipin',
                transcript: transcript,
            }
            const getSummary = await postData('/get-summary', payload);
            setSummary(getSummary);
        } catch (error) {
            console.error(error);
        }
    };

    const getTranscript = async () => {
        try {
            const payload = { youtube_id: videoId, };
            const getScript = await postData('/get-transcript', payload);
            if (getScript?.data) {
                setTranscript(getScript?.data);

            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleStart = () => {
        setIsProcessing(true)
        if (selectedOption === 'summary') {
            setTimeout(() => {
                setIsProcessing(false);
                vidoeSummary();
            }, 2000);
        }
    };

    const handleCopy = () => {
        if (summary) navigator.clipboard.writeText(summary);
        else if (transcript) navigator.clipboard.writeText(transcript);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);

    };

    const handleDownload = () => {
        if (summary) {
            const blob = new Blob([summary], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'summary.txt';
            link.click();
            URL.revokeObjectURL(link.href);
        } else if (transcript) {
            const blob = new Blob([transcript], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'transcript.txt';
            link.click();
            URL.revokeObjectURL(link.href);
        }
    };

    return (
        <div className="story-creator-container">
            <div className="min-vh-100 d-flex justify-content-center align-items-center p-3 main">
                <div className="card shadow-lg">
                    <div className="card-header text-white d-flex justify-content-between align-items-center py-4 px-4">
                        <h5 className="mb-0"> <Video className="text-light me-2" style={{ height: '1.5rem', width: '1.5rem' }} />YouTube Transcript</h5>
                        <GoogleLogin />
                    </div>
                    <div className="card-body py-4">
                        {/* <p className='text-muted mb-4'><small>Create new content from videos</small></p>*/}
                        {/* <UrlInput
                            videoUrls={videoUrls}
                            handleVideoUrlChange={handleVideoUrlChange}
                            removeVideoUrl={removeVideoUrl}
                            addVideoUrl={addVideoUrl}
                        /> */}
                        {/* <hr className='mx-1 border border-secondary' /> */}
                        <SelectInput
                            handelSelectedOption={handelSelectedOption}
                            selectedOption={selectedOption}
                            options={options}
                        />
                        <StartButton
                            handleStart={handleStart}
                            selectedOption={selectedOption}
                            isProcessing={isProcessing}
                            videoUrls={videoUrls}
                        />

                        {summary ? (
                            <TextArea
                                summary={summary}
                                handleCopy={handleCopy}
                                handleDownload={handleDownload}
                                isCopied={isCopied}
                            />
                        ):(
                            transcript ?(
                                <TextArea
                                    summary={transcript}
                                    handleCopy={handleCopy}
                                    handleDownload={handleDownload}
                                    isCopied={isCopied}
                                />
                            ) :("")
                        )}
                    </div>
                    <FeedBack />
                    <div className="footer-border gradient-background">
                        <div className="w-100 d-flex justify-content-center gap-3 text-muted small p-0">
                            <a href="https://trackbes.com/privacy-policy" target="_blank" rel="noreferrer" className="btn text-light">Privacy Policy</a>
                            <a href="https://trackbes.com/terms-and-conditions/" target="_blank" rel="noreferrer" className="btn text-light">Terms and Conditions</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryCreator;
