import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { GoDependabot } from 'react-icons/go';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MdUploadFile } from 'react-icons/md';
import { FaTimesCircle } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router';
import { IoMdClose } from 'react-icons/io';
import { GrDocumentPdf } from 'react-icons/gr';

const ChatBox = ({ fileUrl, onCitationClick }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => setInputText(e.target.value);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    const loadingMessage = { sender: "bot", text: "Loading..." };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputText("");
    setIsLoading(true);

    try {
        const response = await axios.post("https://notebookclone-server.onrender.com/api/chat", {
        question: inputText,
        fileUrl,
        });

        const answer = response.data.answer;
        const page = response.data.page;
        console.log(page);

        setMessages(prev => [
          ...prev.slice(0, -1),
          { sender: "bot", text: answer, page }
        ]);
    } catch (error) {
        setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "Sorry, something went wrong." }
        ]);
    } finally {
        setIsLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };


  const handleExitChat = () => {
    MySwal.fire({
      title: `<div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                <span style="font-size: 24px;">📄</span> 
                <span style="font-size: 20px; font-weight: bold;">Upload New PDF?</span>
              </div>`,
      html: `
        <div style="font-size: 16px; color: #fff;">
          This will end your current chat session.<br/>
          Are you sure you want to upload a new PDF?
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ReactDOMServer.renderToString(
        <span className='cursor-pointer' style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MdUploadFile size={18} /> Upload New PDF
        </span>
      ),
      cancelButtonText: ReactDOMServer.renderToString(
        <span className='cursor-pointer' style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaTimesCircle size={16} /> Cancel
        </span>
      ),
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-text',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  return (
    <div className="flex bg-radial-[at_50%_75%] from-primary/35 via-primary/40 to-secondary/40 to-90% flex-col relative h-full">
      <button 
        onClick={handleExitChat}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/50 cursor-pointer hover:bg-primary transition"
      >
        <IoMdClose className="text-2xl text-gray-600 hover:text-white" />
      </button>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-100/50">
        {messages.length === 0 && (
          <div className="bg-black/30 p-5">
            <h1 className='flex items-center text-xl py-5 font-bold text-primary gap-2'><GrDocumentPdf size={28} /> Your document is ready!</h1>
            <p className='text-primary mb-3'>You can now ask questions about your document. For example:</p>
            <p className='text-primary text-sm mb-1'>-"What is the main topic of this document?"</p>
            <p className='text-primary text-sm mb-1'>-"Can you summarize the key points?"</p>
            <p className='text-primary text-sm'>-"What are the conclusions or recommendations?"</p>
          </div>
        )}

        {
          messages.map((msg, idx) => (
            <div key={idx} className="mt-5">
              {msg.sender === "user" ? (
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full px-4 py-2 rounded bg-primary/50 text-white">
                  <div className="min-w-[20px]">
                    <FaRegUser className=" w-10 h-10 bg-black/40 rounded-full p-1.5  text-secondary text-xl font-extrabold" />
                  </div>
                  <div className="w-full">{msg.text}</div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full px-4 py-2 rounded bg-black/30 text-white">
                  <div className="min-w-[20px]">
                    <GoDependabot className="w-10 h-10 bg-white/30 rounded-full p-1.5 text-primary text-xl font-extrabold" />
                  </div>
                  <div className="w-full space-y-2">
                    {
                      msg.text.split(/\n{2,}/).map((block, i) => {
                        // Bullet point detect: starts with dash, asterisk, or number
                        const lines = block.split('\n');
                        const isBulletBlock = lines.every(line =>
                          /^(\s*(-|\*|\d+[\.\)]))\s+/.test(line.trim())
                        );

                        if (isBulletBlock) {
                          const isNumbered = lines[0].trim().match(/^\d+[\.\)]/);
                          return isNumbered ? (
                            <ol key={i} className="list-decimal list-inside text-white leading-relaxed">
                              {lines.map((item, j) => (
                                <li key={j}>{item.replace(/^(\s*(-|\*|\d+[\.\)]))\s+/, '')}</li>
                              ))}
                            </ol>
                          ) : (
                            <ul key={i} className="list-disc list-inside text-white leading-relaxed">
                              {lines.map((item, j) => (
                                <li key={j}>{item.replace(/^(\s*(-|\*|\d+[\.\)]))\s+/, '')}</li>
                              ))}
                            </ul>
                          );
                        } else {
                          return (
                            <p key={i} className="text-white leading-relaxed">{block}</p>
                          );
                        }
                      })
                    }

                    {msg.page && (
                      <button
                        onClick={() => onCitationClick?.(msg.page)}
                        className="mt-2 inline-block bg-primary text-white text-xs px-3 py-1 rounded hover:outline cursor-pointer"
                      >
                        Page {msg.page}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-neutral border-t flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask about the document..."
          className="flex-grow border border-neutral-content/30 text-neutral-content rounded px-4 py-2 focus:outline-none"
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-primary hover:outline text-white cursor-pointer p-2 rounded disabled:opacity-50"
          disabled={!inputText.trim()}
          aria-label="Send message"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
