import React from 'react';
import { Download, Copy, } from "lucide-react";
const TextArea = (props) => {
    const { summary, handleCopy, handleDownload, isCopied,} = props;
    return (
        <div className="mt-4 download_sec">
            <div className="script-text p-2 bg-light border rounded" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {summary}
            </div>
            <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleCopy}><Copy className="me-2" style={{ height: '1rem', width: '1rem' }} />{isCopied ? 'Copied' : 'Copy'}</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleDownload}><Download className="me-2" style={{ height: '1rem', width: '1rem' }} />Download</button>
            </div>
        </div>
    );
}

export default TextArea;