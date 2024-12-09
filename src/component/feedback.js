import React, { useState, useContext } from 'react';
// import { Star, StarBorder } from "@mui/icons-material";
// import { MailCheck } from 'lucide-react';
import { postData } from '../api/api';
import { UserContext } from '../contextApi/userIdProvider';
const FeedBack = () => {
    const [isFeedback, setIsFeedBack] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const { userId } = useContext(UserContext);
    function handleComment(e) {
        setComment(e.target.value);
    }
    const submitFeedBack = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                rating: 4,
                comment: comment,
                email: userId
            };
            const sendFeedBack = await postData('/submit-feedback', payload);
            if (sendFeedBack) {
                setShowThankYou(true);
                setTimeout(() => {
                    setIsFeedBack(false);
                    setShowThankYou(false);
                },5000);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // const renderStars = () => {
    //     const stars = [];
    //     for (let i = 1; i <= 5; i++) {
    //         stars.push(
    //             <span
    //                 key={i}
    //                 onClick={() => setRating(i)}
    //                 onMouseEnter={() => setHover(i)}
    //                 onMouseLeave={() => setHover(0)}
    //                 style={{ cursor: 'pointer' }}
    //             >
    //                 {i <= (hover || rating) ? <Star style={{ color: 'gold', fontSize: '40px' }} /> : <StarBorder style={{ fontSize: '40px' }} />}
    //             </span>
    //         );
    //     }
    //     return stars;
    // };
    return (
        <div className='feedback'>
            <div className="card-footer text-center">
                <button type="button" className="btn feedbackBtn w-100" onClick={() => setIsFeedBack(true)}>Feedback</button>
            </div>
            {isFeedback && (
                <div className="feedback-popup mb-3">
                    <div className="card-header bg-transparent text-light text-center">Your opinion matters to us!</div>
                    <div className="card-body">
                        {!showThankYou ? (
                            <form onSubmit={submitFeedBack}>
                                {/* <div className="star-rating text-center mb-3"> */}
                                    {/* <h5 className="card-title text-dark">Give Us a Feedback...</h5> */}
                                    {/* {renderStars()} */}
                                {/* </div> */}
                                <div className='comment text-center mb-2'>
                                    <textarea rows="3" className="p-4 text-secondary rounded-3" placeholder="Leave a message..." value={comment} onChange={handleComment} style={{ resize: "none" }}></textarea>
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className="btn sendFeedbackBtn mx-auto w-50 text-light fw-bold">Send Feedback</button>
                                </div>
                            </form>
                        ) : (
                            <div className='thankyou-msg text-center'>
                                <h3>Thanks for Feedback!</h3>
                                <p className="text-primary">Your Feedback has been sent!</p>
                            </div>
                        )}
                    </div>
                    <div className="card-footer bg-transparent text-light text-center" onClick={() => setIsFeedBack(false)} style={{ cursor: 'pointer' }}>{!showThankYou ? "Maybe later" : ""}</div>
                </div>
            )}
        </div>
    );
}

export default FeedBack;