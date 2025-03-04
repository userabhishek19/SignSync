import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  CameraOff, 
  Copy, 
  Download, 
  Mic, 
  MicOff, 
  RefreshCw, 
  Settings, 
  Share, 
  Volume2, 
  VolumeX,
  Check
} from 'lucide-react';

export const TranslatorView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{text: string, timestamp: string}[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // Mock function to simulate AI translation
  const mockTranslation = () => {
    const phrases = [
      "Hello, how are you?",
      "My name is John",
      "Nice to meet you",
      "Thank you",
      "I am learning sign language",
      "Can you help me?",
      "Where is the bathroom?",
      "I need water",
      "What time is it?",
      "Good morning"
    ];
    
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const randomConfidence = 70 + Math.floor(Math.random() * 30);
    
    setTranslatedText(randomPhrase);
    setConfidence(randomConfidence);
    
    // Add to history
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    setHistory(prev => [{text: randomPhrase, timestamp}, ...prev].slice(0, 10));
  };
  
  // Start/stop webcam
  const toggleRecording = async () => {
    if (isRecording) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsRecording(false);
      setTranslatedText('');
      setConfidence(0);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: !isMuted 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsRecording(true);
        
        // Mock translation after 2 seconds
        setTimeout(() => {
          mockTranslation();
          
          // Continue mock translations every 5 seconds
          const interval = setInterval(() => {
            mockTranslation();
          }, 5000);
          
          return () => clearInterval(interval);
        }, 2000);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadHistory = () => {
    const historyText = history.map(item => `[${item.timestamp}] ${item.text}`).join('\n');
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sign-language-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Draw hand landmarks on canvas (mock implementation)
  useEffect(() => {
    if (isRecording && canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      const drawFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        // Match canvas size to video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        // Draw video frame
        ctx.drawImage(
          videoRef.current, 
          0, 0, 
          videoRef.current.videoWidth, 
          videoRef.current.videoHeight
        );
        
        // Mock hand tracking visualization
        if (isRecording && Math.random() > 0.3) {
          ctx.strokeStyle = '#4f46e5';
          ctx.lineWidth = 3;
          
          // Draw random "hand landmarks"
          const centerX = canvasRef.current.width / 2 + (Math.random() * 50 - 25);
          const centerY = canvasRef.current.height / 2 + (Math.random() * 50 - 25);
          
          // Draw palm
          ctx.beginPath();
          ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Draw fingers
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI / 2.5) - 0.5;
            const length = 40 + Math.random() * 20;
            
            const endX = centerX + Math.cos(angle) * length;
            const endY = centerY + Math.sin(angle) * length;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw joints
            const midX = centerX + Math.cos(angle) * (length * 0.5);
            const midY = centerY + Math.sin(angle) * (length * 0.5);
            
            ctx.beginPath();
            ctx.arc(midX, midY, 3, 0, 2 * Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(endX, endY, 3, 0, 2 * Math.PI);
            ctx.stroke();
          }
        }
        
        requestAnimationFrame(drawFrame);
      };
      
      const frameId = requestAnimationFrame(drawFrame);
      return () => cancelAnimationFrame(frameId);
    }
  }, [isRecording]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Feed */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Sign Language Input</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Settings"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
            {isRecording ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 w-full h-full"
                />
              </>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500 p-8">
                <Camera size={48} className="mx-auto mb-4 opacity-50" />
                <p>Camera is off. Click the button below to start.</p>
              </div>
            )}
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span>Recording</span>
              </div>
            )}
          </div>
          
          <div className="p-4 flex justify-center">
            <button
              onClick={toggleRecording}
              className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
              }`}
            >
              {isRecording ? (
                <>
                  <CameraOff size={18} />
                  <span>Stop Camera</span>
                </>
              ) : (
                <>
                  <Camera size={18} />
                  <span>Start Camera</span>
                </>
              )}
            </button>
          </div>
          
          {/* Settings panel */}
          {showSettings && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3">Camera Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Detection Sensitivity
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="7"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Language Model
                  </label>
                  <select className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>American Sign Language (ASL)</option>
                    <option>British Sign Language (BSL)</option>
                    <option>Auslan</option>
                    <option>Indian Sign Language (ISL)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Translation Output */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Translation Output</h2>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Text to Speech"
              >
                {false ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Share"
              >
                <Share size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            {translatedText ? (
              <>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-medium mb-4">{translatedText}</div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <span>Confidence: {confidence}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Recent Translations</h3>
                    <button 
                      onClick={downloadHistory}
                      className="text-sm text-blue-600 dark:text-blue-400 flex items-center space-x-1"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {history.map((item, index) => (
                      <div 
                        key={index} 
                        className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex justify-between"
                      >
                        <span>{item.text}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-gray-400 dark:text-gray-500 p-8">
                <div>
                  <RefreshCw size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Waiting for sign language input...</p>
                  <p className="text-sm">Start the camera to begin translation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">AI Model Information</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Current Model</div>
              <div>SignSync AI v2.5 (CNN+LSTM)</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Supported Languages</div>
              <div>ASL, BSL, Auslan, ISL</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
              <div>June 15, 2025</div>
            </div>
            <div className="pt-2">
              <button className="text-sm text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                <RefreshCw size={14} />
                <span>Check for Updates</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Ensure good lighting for better recognition</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Keep your hands within the camera frame</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Make deliberate, clear gestures</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Try the Learning section to improve your signing</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Upgrade to Pro</h3>
          <p className="mb-4">Get access to advanced features and improved AI accuracy.</p>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-start space-x-2">
              <span className="mt-0.5">✓</span>
              <span>Higher accuracy AI model</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="mt-0.5">✓</span>
              <span>Offline mode support</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="mt-0.5">✓</span>
              <span>Multi-language translation</span>
            </li>
          </ul>
          <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-medium">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};