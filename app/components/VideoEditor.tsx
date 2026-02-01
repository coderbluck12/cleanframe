'use client';

import { useState, useRef } from 'react';
import { Upload, Play, Download, X, Loader2 } from 'lucide-react';
import { Client, handle_file } from "@gradio/client";

export default function VideoEditor() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done" | "error">("idle");
  const [resultVideoSrc, setResultVideoSrc] = useState<string | null>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      setStatus("idle");
      setBox({ x: 0, y: 0, w: 0, h: 0 }); 
      setResultVideoSrc(null);
      setVideoAspectRatio(null);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const getMousePos = (e: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!videoSrc || status === "processing") return;
    setIsDrawing(true);
    const pos = getMousePos(e);
    setStartPos(pos);
    setBox({ x: pos.x, y: pos.y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const currentPos = getMousePos(e);
    
    const newBox = {
      x: Math.min(startPos.x, currentPos.x),
      y: Math.min(startPos.y, currentPos.y),
      w: Math.abs(currentPos.x - startPos.x),
      h: Math.abs(currentPos.y - startPos.y)
    };
    setBox(newBox);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const processVideo = async () => {
    if (!videoRef.current || !videoFile || box.w === 0) {
      alert("Please upload a video and draw a box over the watermark first.");
      return;
    }

    setStatus("processing");
    setResultVideoSrc(null);

    try {
      const videoRealW = videoRef.current.videoWidth;
      const displayedWidth = videoRef.current.clientWidth;
      const scaleFactor = videoRealW / displayedWidth;

      const realX = Math.round(box.x * scaleFactor);
      const realY = Math.round(box.y * scaleFactor);
      const realW = Math.round(box.w * scaleFactor);
      const realH = Math.round(box.h * scaleFactor);


      // ✅ NEW (Fixes the URL Error):
      // We combine your current website URL + the rewrite path
      const proxyUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/ai-backend` 
      : "http://localhost:3000/ai-backend";

      console.log("Connecting to Tunnel:", proxyUrl); // Debug print

      
      const app = await Client.connect(proxyUrl);

      const result = await app.predict("/predict", [ 
        handle_file(videoFile), 
        realX, 
        realY, 
        realW, 
        realH
      ]) as any; 

      let videoUrl = null;
      const output = result.data ? result.data[0] : null;

      if (!output) throw new Error("Backend returned empty data.");

      if (output.video && output.video.url) {
          videoUrl = output.video.url;
      } else if (output.url) {
          videoUrl = output.url;
      } else if (output.path) {
          videoUrl = `${proxyUrl}/file=${output.path}`;
      }

      if (videoUrl) {
        setResultVideoSrc(videoUrl);
        setStatus("done");
      } else {
        throw new Error("Could not extract video URL.");
      }

    } catch (error: any) {
      console.error("❌ Error:", error);
      setStatus("error");
      alert("Error: " + (error.message || "Check console logs"));
    }
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="video/*" 
        className="hidden" 
      />
      <div className="grid lg:grid-cols-5 gap-12 mt-8">
        <div className="lg:col-span-3">
           <div 
              className="relative group cursor-crosshair w-full"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={containerRef}
              style={{ 
                  aspectRatio: videoAspectRatio ? `${videoAspectRatio}` : 'auto',
                  maxWidth: '100%' 
              }}
           >
              <div className="relative bg-stone-100 border-2 border-stone-900 overflow-hidden h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex-1 bg-stone-50 flex items-center justify-center relative overflow-hidden">
                  {!videoSrc && (
                  <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
                      <div className="absolute inset-0" 
                      style={{
                          backgroundImage: `repeating-linear-gradient(0deg, #e7e5e4 0px, #e7e5e4 1px, transparent 1px, transparent 20px),
                                          repeating-linear-gradient(90deg, #e7e5e4 0px, #e7e5e4 1px, transparent 1px, transparent 20px)`,
                          opacity: 0.3
                      }}
                      />
                      <div className="relative text-center">
                        <div className="mb-6 flex justify-center">
                          <div className="w-20 h-20 border-4 border-stone-900 rounded-full flex items-center justify-center bg-white">
                            <Play className="w-8 h-8 text-stone-900 fill-stone-900 ml-1" />
                          </div>
                        </div>
                        <p className="text-stone-400 font-medium">Drop your video here</p>
                      </div>
                  </div>
                  )}

                  {videoSrc && !resultVideoSrc && (
                  <>
                      <video 
                          ref={videoRef}
                          src={videoSrc}
                          className="w-full h-full object-contain pointer-events-none" 
                          onLoadedMetadata={(e) => {
                              setVideoAspectRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight);
                          }}
                      />
                      {box.w > 0 && (
                          <div 
                          className="absolute border-4 border-purple-600 bg-purple-600/5 z-20"
                          style={{
                              left: box.x,
                              top: box.y,
                              width: box.w,
                              height: box.h,
                              animation: 'pulse-border 2s ease-in-out infinite'
                          }}
                          >
                            <div className="absolute -top-10 left-0 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                              Target Area
                            </div>
                          </div>
                      )}
                  </>
                  )}

                  {resultVideoSrc && (
                  <video 
                      src={resultVideoSrc}
                      className="w-full h-full object-contain" 
                      controls
                      autoPlay
                      loop
                  />
                  )}
                  
                  {status === "processing" && (
                      <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-50">
                          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" strokeWidth={2.5} />
                          <p className="font-semibold text-stone-900 text-lg mb-1">Removing watermark</p>
                          <p className="text-sm text-stone-500">This usually takes 10-30 seconds</p>
                      </div>
                  )}
                </div>
              
                <div className="px-6 py-4 border-t-2 border-stone-900 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                      <p className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                          {resultVideoSrc ? "Processed" : videoSrc ? "Editor Active" : "Ready"}
                      </p>
                  </div>
                  {videoSrc && !resultVideoSrc && (
                      <button 
                          onClick={processVideo}
                          disabled={box.w === 0 || status === "processing"}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-sm font-bold uppercase tracking-wide disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                          {status === "processing" ? "Processing..." : "Remove"}
                      </button>
                  )}
                </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          {!videoSrc && (
              <div>
                  <h3 className="text-4xl font-bold mb-6 leading-tight">Upload your video</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Choose a video file from your computer to get started. We support MP4, MOV, and AVI formats.
                  </p>
                  
                  <button 
                      onClick={triggerUpload}
                      className="group relative bg-stone-900 hover:bg-purple-600 text-white px-10 py-4 font-bold transition-all duration-300 w-full mb-6"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Upload className="w-5 h-5" />
                      <span>Choose File</span>
                    </div>
                  </button>
                  
                  <div className="space-y-3 text-sm text-stone-500">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-stone-400 rounded-full mt-2"></div>
                      <p>Maximum file size: 500MB</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-stone-400 rounded-full mt-2"></div>
                      <p>All videos are automatically deleted after processing</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-stone-400 rounded-full mt-2"></div>
                      <p>Processing takes 10-30 seconds depending on video length</p>
                    </div>
                  </div>
              </div>
          )}

          {videoSrc && !resultVideoSrc && (
               <div>
                  <h3 className="text-4xl font-bold mb-6 leading-tight">Select watermark</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                      Click and drag on your video to draw a box around the watermark you want to remove.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <p className="font-semibold text-stone-900 mb-1">Step 1</p>
                      <p className="text-sm text-stone-600">Draw a rectangle over the watermark</p>
                    </div>
                    <div className="border-l-4 border-stone-300 pl-4 py-2">
                      <p className="font-semibold text-stone-900 mb-1">Step 2</p>
                      <p className="text-sm text-stone-600">Click "Remove" to process your video</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                      <button 
                          onClick={() => { setVideoSrc(null); setVideoFile(null); }}
                          className="border-2 border-stone-900 hover:bg-stone-100 text-stone-900 px-6 py-3 font-semibold transition-colors"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={processVideo}
                          disabled={box.w === 0 || status === "processing"}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                          {status === "processing" ? "Processing..." : "Remove Watermark"}
                      </button>
                  </div>
               </div>
          )}

          {resultVideoSrc && (
              <div>
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 px-4 py-2 mb-6">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-xs font-semibold text-green-900 uppercase tracking-wider">Complete</span>
                    </div>
                    
                    <h3 className="text-4xl font-bold mb-4 leading-tight">Watermark removed</h3>
                    <p className="text-stone-600 leading-relaxed">
                        Your video has been processed successfully. Download it below or process another video.
                    </p>
                  </div>
                  
                  <a 
                      href={resultVideoSrc} 
                      download="clean_video.mp4"
                      className="group relative bg-stone-900 hover:bg-purple-600 text-white px-10 py-4 font-bold transition-all duration-300 w-full mb-4 flex items-center justify-center gap-3"
                  >
                      <Download className="w-5 h-5" />
                      <span>Download Video</span>
                  </a>

                  <button 
                      onClick={() => window.location.reload()}
                      className="w-full border-2 border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 px-6 py-3 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                      <X className="w-4 h-4" /> Process Another Video
                  </button>
              </div>
          )}
        </div>
      </div>
    </>
  );
}
