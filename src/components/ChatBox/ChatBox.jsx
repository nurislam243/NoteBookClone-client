import React from 'react';

const ChatBox = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <p className="text-gray-400 text-center">Ask about the document…</p>
            </div>

            <div className="p-4 border-t">
                <input
                type="text"
                placeholder="Ask about the document..."
                className="w-full border text-black rounded px-4 py-2 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default ChatBox;