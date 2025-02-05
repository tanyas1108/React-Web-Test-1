import React, { useState, useRef } from 'react';

const NoteInput = ({ onAddNote }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const recognitionRef = useRef(null);

  
  if (!recognitionRef.current && typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
  }

  
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

  
    setIsRecording(!isRecording);
  };

  
  const handleSpeechResult = (event) => {
    const result = event.results[0][0].transcript;
    setTranscribedText(result);
  };


  const handleSpeechError = (event) => {
    console.error('Speech recognition error:', event.error);
    setIsRecording(false);
  };

  const handleSpeechEnd = () => {
    setIsRecording(false);
  };

  if (recognitionRef.current) {
    recognitionRef.current.onresult = handleSpeechResult;
    recognitionRef.current.onerror = handleSpeechError;
    recognitionRef.current.onend = handleSpeechEnd;
  }

  const handleSubmit = () => {
    const noteContent = transcribedText || text; 
    if (noteContent) {
      onAddNote({
        id: Date.now(),
        content: noteContent,
      });
      setText('');
      setTranscribedText('');
    }
  };

  return (
    <div className="note-input">
      <h2>Create a Note</h2>
      <textarea
        placeholder="Type or speak to create a note..."
        value={transcribedText || text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Note</button>

      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default NoteInput;
