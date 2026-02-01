'use client';

import Link from 'next/link';
import VideoEditor from './components/VideoEditor';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Work Sans', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Crimson Pro', serif;
        }
        
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(3deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
        }
        
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(168, 85, 247, 0.4); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        
        .animate-drift {
          animation: drift 20s ease-in-out infinite;
        }
      `}</style>

      {/* Abstract background shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute top-10 right-10 w-96 h-96 text-purple-200/30 animate-drift" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.9,76.1C26,83.2,9.2,84.8,-6.5,84.3C-22.2,83.8,-36.8,81.2,-49.7,73.8C-62.6,66.4,-73.8,54.2,-80.4,40C-87,25.8,-89,9.6,-87.3,-6.1C-85.6,-21.8,-80.2,-37,-71.4,-49.8C-62.6,-62.6,-50.4,-72.9,-36.8,-80.3C-23.2,-87.7,-8.2,-92.2,5.4,-91.5C19,-90.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-20 left-10 w-80 h-80 text-orange-200/20 animate-drift" style={{animationDelay: '-8s'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M41.3,-71.8C54.4,-64.4,66.3,-54.5,73.8,-41.8C81.3,-29.1,84.4,-13.6,83.8,1.7C83.2,17,78.9,32.2,70.8,45.3C62.7,58.4,50.8,69.4,37.3,75.9C23.8,82.4,8.7,84.4,-5.9,83.1C-20.5,81.8,-34.6,77.2,-47.5,69.8C-60.4,62.4,-72.1,52.2,-78.9,39.1C-85.7,26,-87.6,10,-85.2,-5.3C-82.8,-20.6,-76.1,-35.2,-66.8,-47.4C-57.5,-59.6,-45.6,-69.4,-32.5,-76.7C-19.4,-84,-6.5,-88.8,5.4,-87.2C17.3,-85.6,28.2,-79.2,41.3,-71.8Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-2 h-2 bg-purple-600 rounded-full group-hover:scale-125 transition-transform"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-125 transition-transform" style={{transitionDelay: '50ms'}}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full group-hover:scale-125 transition-transform" style={{transitionDelay: '100ms'}}></div>
              <span className="text-xl font-bold tracking-tight ml-2">CleanFrame</span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
              <a href="#how-it-works" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">How it works</a>
              <a href="#faq" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">FAQ</a>
            </div>

            <Link href="/signin" className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2 text-sm font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 border border-stone-300 px-4 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">Free Watermark Removal</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
            Clean your
            <br />
            <span className="italic">videos</span>
          </h1>
          
          <p className="text-xl text-stone-600 mb-12 max-w-2xl leading-relaxed">
            Remove watermarks, logos, and text overlays from your videos. Professional results in seconds, completely free.
          </p>
        </div>

        {/* Video Editor Component */}
        <VideoEditor />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 bg-stone-100 border-y-2 border-stone-900 py-24 mt-32">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-6xl font-bold mb-6">How it works</h2>
            <p className="text-xl text-stone-600">Simple three-step process to get professional results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl">
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 border-4 border-stone-900 flex items-center justify-center bg-white font-bold text-2xl">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Upload</h3>
              <p className="text-stone-600 leading-relaxed">
                Choose your video file. We accept all common formats including MP4, MOV, and AVI up to 500MB.
              </p>
            </div>

            <div>
              <div className="mb-6">
                <div className="w-12 h-12 border-4 border-stone-900 flex items-center justify-center bg-white font-bold text-2xl">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Select</h3>
              <p className="text-stone-600 leading-relaxed">
                Draw a box around the watermark or logo you want to remove. Be as precise as possible for best results.
              </p>
            </div>

            <div>
              <div className="mb-6">
                <div className="w-12 h-12 border-4 border-stone-900 flex items-center justify-center bg-white font-bold text-2xl">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Download</h3>
              <p className="text-stone-600 leading-relaxed">
                Wait a few seconds while we process your video, then download the clean result with no watermark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 container mx-auto px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-bold mb-6">Frequently asked questions</h2>
            <p className="text-xl text-stone-600">Everything you need to know about our watermark removal tool</p>
          </div>

          <div className="space-y-6">
            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>What video formats do you support?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                We support all major video formats including MP4, MOV, AVI, MKV, and WebM. The maximum file size is 500MB. For best results, we recommend using MP4 format with H.264 encoding.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>How long does processing take?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                Processing typically takes between 10-30 seconds depending on your video length and resolution. Shorter videos (under 30 seconds) usually process in about 10 seconds, while longer videos may take up to a minute.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>Is my video data secure and private?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                Yes, absolutely. All uploaded videos are encrypted during processing and automatically deleted from our servers within 24 hours. We never store, share, or use your videos for any purpose other than watermark removal.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>Will the video quality be affected?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                No, we preserve your original video quality. The output video maintains the same resolution, frame rate, and bitrate as your input file. Only the selected watermark area is modified using advanced inpainting technology.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>Can I remove multiple watermarks from one video?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                Currently, you can select one watermark area per processing session. To remove multiple watermarks, you'll need to process the video multiple times, selecting each watermark individually. We're working on multi-selection in a future update.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>Is this service really free?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                Yes, completely free. No hidden fees, no credit card required, and no account registration needed. Simply upload your video, select the watermark, and download the clean result.
              </div>
            </details>

            <details className="group border-2 border-stone-900 bg-white">
              <summary className="flex justify-between items-center cursor-pointer px-8 py-6 font-bold text-xl hover:bg-stone-50 transition-colors">
                <span>What if the watermark is moving or animated?</span>
                <div className="w-6 h-6 border-2 border-stone-900 flex items-center justify-center group-open:rotate-45 transition-transform">
                  <span className="text-2xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-8 pb-6 pt-2 text-stone-600 leading-relaxed border-t-2 border-stone-900">
                Our tool works best with static watermarks that stay in one position throughout the video. For moving or animated watermarks, results may vary. We recommend drawing the box to cover the watermark's full range of motion for best results.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Start cleaning your videos today
          </h2>
          <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto">
            No sign up required. No credit card needed. Just upload and remove.
          </p>
          <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block bg-stone-900 hover:bg-purple-600 text-white px-16 py-5 text-lg font-bold transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] hover:translate-x-1 hover:translate-y-1"
          >
            Upload Your Video
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-stone-900 bg-white py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="font-bold ml-2">CleanFrame</span>
            </div>
            
            <div className="flex gap-8 text-sm text-stone-600">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Support</a>
            </div>
            
            <p className="text-sm text-stone-500">
              © 2026 CleanFrame
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}