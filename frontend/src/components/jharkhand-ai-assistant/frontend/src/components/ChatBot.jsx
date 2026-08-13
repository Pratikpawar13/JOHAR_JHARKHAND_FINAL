// src/components/ChatBot.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./ChatBot.css";

import { FiSend } from "react-icons/fi";
import { FaMicrophone, FaStop, FaPlane } from "react-icons/fa";

// Backend API endpoint
const backendURL = "http://localhost:3000/api/chatbot";

// Predefined offline fallback Q&A
const offlineQA = [
  {
    question: "Tell me about Jharkhand culture",
    answer: "Jharkhand has a rich tribal culture with traditional dances, music, and festivals. 🌿🪘",
  },
  {
    question: "Famous tourist places in Jharkhand?",
    answer: "You must visit Ranchi waterfalls, Netarhat hills, and Betla National Park! 🏞️🐘",
  },
  {
    question: "What is Jharkhand known for?",
    answer: "Jharkhand is known for its forests, waterfalls, and tribal heritage. 🌳🌊",
  },
];

export default function ChatBot({ onClose }) {
  // -------------------------
  // State & References
  // -------------------------
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");

  const recognitionRef = useRef(null);
  const utterRef = useRef(null);
  const chatBoxRef = useRef(null);
  const recognitionTimeoutRef = useRef(null);

  // -------------------------
  // 1. Check Backend Status
  // -------------------------
  // useEffect(() => {
  //   const checkServer = async () => {
  //     try {
  //       const controller = new AbortController();
  //       const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
        
  //       const res = await fetch(backendURL, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ query: "ping" }),
  //         signal: controller.signal,
  //       });
        
  //       clearTimeout(timeoutId);
  //       setServerOnline(res.ok);
  //     } catch (error) {
  //       console.warn("Server check failed:", error.message);
  //       setServerOnline(false);
  //     }
  //   };

  //   checkServer();
  //   const interval = setInterval(checkServer, 10000); // Check every 10 seconds instead of 5
  //   return () => clearInterval(interval);
  // }, []);

  // -------------------------
  // 2. Send Messages
  // -------------------------
  const handleSend = useCallback(
    async (text, isVoice = false) => {
      const trimmedText = text?.trim();
      if (!trimmedText) return;

      setMessages((prev) => [...prev, { sender: "user", text: trimmedText }]);
      setInput("");
      setIsTyping(true);

      // Offline Fallback
      if (!serverOnline) {
        const offlineResp = offlineQA.find((q) =>
          q.question.toLowerCase().includes(trimmedText.toLowerCase())
        );
        const response = offlineResp
          ? offlineResp.answer
          : "⚠️ Server offline or unknown question. Please check your internet!";
        
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "bot", text: response }]);
          setIsTyping(false);
          if (isVoice) speakText(response);
        }, 500); // Small delay to show typing indicator
        return;
      }

      // Online Backend
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const res = await axios.post(
          backendURL,
          { query: trimmedText },
          { 
            signal: controller.signal,
            timeout: 10000 
          }
        );
        
        clearTimeout(timeoutId);
        const answer = res.data?.answer || "Sorry, I didn't receive a proper response.";
        
        setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
        setIsTyping(false);
        if (isVoice) speakText(answer);
      } catch (error) {
        console.error("Chat request failed:", error);
        const errorMessage = error.name === 'AbortError' 
          ? "⏱️ Request timed out. Please try again."
          : "⚠️ Server offline or busy.";
        
        setMessages((prev) => [...prev, { sender: "bot", text: errorMessage }]);
        setIsTyping(false);
      }
    },
    [serverOnline]
  );

  // -------------------------
  // 3. Voice Recognition
  // -------------------------
  useEffect(() => {
    // Check for Speech Recognition API support (modern browsers)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "ℹ️ Voice input is not supported in your browser. Please try using Chrome, Edge, or Safari for voice features." 
      }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
      setVoiceStatus("🎤 Listening... Speak now!");
      
      // Set a timeout to automatically stop recognition after 10 seconds
      recognitionTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && listening) {
          recognitionRef.current.stop();
          setVoiceStatus("⏰ Voice recognition timed out");
          setTimeout(() => setVoiceStatus(""), 3000);
        }
      }, 10000);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
      if (voiceStatus.includes("Listening")) {
        setVoiceStatus("");
      }
      
      // Clear the timeout
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
        recognitionTimeoutRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      
      // Clear the timeout
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
        recognitionTimeoutRef.current = null;
      }
      
      // Handle specific error cases with user-friendly messages
      let errorMessage = "Voice recognition failed. ";
      let statusMessage = "";
      
      switch (event.error) {
        case 'not-allowed':
          errorMessage += "Please allow microphone access in your browser settings.";
          statusMessage = "❌ Microphone access denied";
          break;
        case 'no-speech':
          errorMessage += "No speech detected. Please try speaking clearly.";
          statusMessage = "🔇 No speech detected";
          break;
        case 'network':
          errorMessage += "Network error. Please check your internet connection.";
          statusMessage = "🌐 Network error";
          break;
        case 'audio-capture':
          errorMessage += "Microphone not found or audio capture failed.";
          statusMessage = "🎤 Audio capture failed";
          break;
        case 'aborted':
          errorMessage = "Voice recognition was stopped.";
          statusMessage = "⏹️ Recognition stopped";
          break;
        default:
          errorMessage += "Please try again.";
          statusMessage = "❌ Recognition failed";
      }
      
      setVoiceStatus(statusMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: `⚠️ ${errorMessage}` }]);
      
      // Clear status after 3 seconds
      setTimeout(() => setVoiceStatus(""), 3000);
    };

    recognition.onresult = (event) => {
      if (event.results && event.results[0]) {
        const transcript = event.results[0][0].transcript.trim();
        const confidence = event.results[0][0].confidence;
        
        console.log("Speech recognition result:", transcript, "Confidence:", confidence);
        
        if (transcript) {
          setVoiceStatus(`✅ Heard: "${transcript}"`);
          setInput(transcript);
          handleSend(transcript, true);
          
          // Clear status after showing the result
          setTimeout(() => setVoiceStatus(""), 2000);
        } else {
          setVoiceStatus("🔇 No speech detected");
          setTimeout(() => setVoiceStatus(""), 2000);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        recognition.abort();
      }
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
      }
    };
  }, [handleSend]);

  // -------------------------
  // 4. Auto Scroll
  // -------------------------
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // -------------------------
  // 5. Text-to-Speech
  // -------------------------
  const speakText = useCallback((text) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }

    // Cancel any ongoing speech
    if (utterRef.current) {
      window.speechSynthesis.cancel();
    }

    // Clean text for better speech (remove emojis and special chars)
    const cleanText = text.replace(/[^\w\s.,!?-]/g, '').trim();
    if (!cleanText) return;

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = "en-IN";
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.volume = 0.8;
    
    utter.onend = () => {
      utterRef.current = null;
    };
    
    utter.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      utterRef.current = null;
    };

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  // -------------------------
  // 6. Plan Trip
  // -------------------------
  const handlePlanTrip = useCallback(() => {
    const target = input.trim() || "Jharkhand";
    const daysInput = window.prompt(
      "How many days do you want for the trip? (1-30 days)",
      "5"
    );
    
    const days = parseInt(daysInput);
    if (isNaN(days) || days < 1 || days > 30) {
      alert("Please enter a valid number of days (1-30)");
      return;
    }

    const planPrompt = `Create a personalized ${days}-day itinerary for ${target} in Jharkhand focusing on culture, eco-tourism, and experiences.
- For each day give 1-2 short bullet points (activities), approximate travel time, and a recommended morning/afternoon/evening activity.
- Suggest one budget-friendly accommodation type and one mid-range option.
- Include 3 quick practical tips (transport, safety, best time to visit).
- Keep the response concise and human-friendly, use emojis, and do not include raw markdown symbols.`;

    handleSend(planPrompt, false);
  }, [input, handleSend]);

  // -------------------------
  // 7. Handle Voice Toggle
  // -------------------------
  const handleVoiceToggle = useCallback(async () => {
    if (!recognitionRef.current) {
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "⚠️ Speech recognition is not supported in your browser." 
      }]);
      return;
    }

    try {
      if (listening) {
        recognitionRef.current.stop();
      } else {
        // Request microphone permission first
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop the stream immediately as we just needed permission
          stream.getTracks().forEach(track => track.stop());
          
          // Start speech recognition
          recognitionRef.current.start();
        } catch (permissionError) {
          console.error("Microphone permission denied:", permissionError);
          setMessages((prev) => [...prev, { 
            sender: "bot", 
            text: "⚠️ Microphone permission is required for voice input. Please allow microphone access and try again." 
          }]);
        }
      }
    } catch (error) {
      console.error("Voice recognition error:", error);
      setListening(false);
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "⚠️ Failed to start voice recognition. Please try again." 
      }]);
    }
  }, [listening]);

  // -------------------------
  // 8. Handle Stop Speech
  // -------------------------
  const handleStopSpeech = useCallback(() => {
    if (utterRef.current && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      utterRef.current = null;
    }
  }, []);

  // -------------------------
  // 9. Handle Enter Key
  // -------------------------
  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  }, [input, handleSend]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="chat-container" role="region" aria-label="Chatbot">
      {/* Header */}
      <div className="chat-header">
        <span className="chat-title">🤖 JHORIST - Your Jharkhand Assistant</span>
        {onClose && (
          <button
            className="chat-close-btn"
            onClick={onClose}
            aria-label="Close chat"
          >
            ✕
          </button>
        )}
      </div>

      {/* Server Status */}
      <div className={`status-bar ${serverOnline ? "online" : "offline"}`}>
        {serverOnline ? "Server Online ✅" : "Server Offline ❌"}
      </div>

      {/* Voice Status */}
      {voiceStatus && (
        <div className="voice-status-bar">
          {voiceStatus}
        </div>
      )}

      {/* Messages */}
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <span className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </span>
            Typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Jharkhand..."
          onKeyDown={handleKeyPress}
          disabled={isTyping}
        />
      </div>

      {/* Action buttons */}
      <div className="other-shorts">
        {/* Send */}
        <button
          className="icon-btn send-btn"
          onClick={() => handleSend(input)}
          aria-label="Send message"
          title="Send"
          disabled={isTyping || !input.trim()}
        >
          <FiSend size={18} />
        </button>

        {/* Microphone */}
        <button
          className={`icon-btn mic-button ${listening ? "listening" : ""}`}
          onClick={handleVoiceToggle}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start voice input"}
          title={listening ? "Stop listening" : "Speak"}
          disabled={isTyping}
        >
          <FaMicrophone size={16} />
        </button>

        {/* Stop TTS */}
        <button
          className="icon-btn stop-btn"
          onClick={handleStopSpeech}
          aria-label="Stop speech"
          title="Stop speech"
        >
          <FaStop size={16} />
        </button>

        {/* Plan Trip */}
        <button
          className="plan-btn"
          onClick={handlePlanTrip}
          aria-label="Plan trip"
          title="Plan Trip"
          disabled={isTyping}
        >
          <FaPlane size={16} />
          <span className="plan-text">Plan Trip</span>
        </button>
      </div>
    </div>
  );
}