import React from 'react';
import {Video, X, Plus } from "lucide-react"
const UrlInput = (props) => {
    const {videoUrls, handleVideoUrlChange, removeVideoUrl, addVideoUrl} = props;
    return (
        <div className='url-input-holder py-4 px-3 mb-3 rounded'>
            {videoUrls.map((url, index) => (
                <div key={index} className="input-group mb-3">
                    <div className="position-absolute start-0 top-0 bottom-0 d-flex align-items-center ps-3 pointer-events-none">
                        <Video className="text-muted" style={{ height: '16px', width: '16px' }} />
                    </div>
                    <input
                        type="text"
                        className="form-control ps-5 pe-5"
                        placeholder="YouTube Video URL"
                        value={url}
                        onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                    />
                    {index > 0 && (
                        <div className="position-absolute end-0 d-flex align-items-center justify-content-center" style={{ top: "20%", width: "2.5rem", color: "#6B7280" }}>
                            <button className="btn p-0 border-0 bg-transparent" style={{ color: "inherit" }} onFocus="this.style.outline='none';" onBlur="this.style.outline='';"
                                onClick={() => removeVideoUrl(index)}> <X style={{ height: '1rem', width: '1rem' }} /></button>
                        </div>
                        // <button className="" type="button" onClick={() => removeVideoUrl(index)}> <X style={{ height: '1rem', width: '1rem' }}/></button>
                    )}
                </div>
            ))}
            {videoUrls.length < 3 && (
                <button className="btn addVideoBtn w-100 rounded" onClick={addVideoUrl}>
                    <Plus className="me-2" style={{ height: '1rem', width: '1rem' }} /> Get Summary
                </button>
            )}
        </div>
    );
}

export default UrlInput;