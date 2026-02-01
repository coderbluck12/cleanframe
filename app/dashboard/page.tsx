'use client';

import { useState, useEffect } from 'react';
import VideoEditor from '../components/VideoEditor';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Upload, Video, Clock, Download, LogOut, CreditCard, Settings, Menu, X, Check } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<'overview' | 'videos' | 'pricing' | 'settings' | 'upload'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Mock data
  const recentVideos = [
    { id: 1, name: 'product_demo.mp4', date: '2 hours ago', status: 'completed' },
    { id: 2, name: 'tutorial_video.mov', date: '1 day ago', status: 'completed' },
    { id: 3, name: 'promotional_clip.mp4', date: '3 days ago', status: 'completed' },
  ];

  const stats = {
    videosProcessed: 12,
    totalSaved: '2.4 GB',
    avgProcessTime: '18s',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <MoonLoader color="#161616" size={100} />
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting is handled in useEffect
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Work Sans', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Crimson Pro', serif;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-stone-900 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b-2 border-stone-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="font-bold ml-2">CleanFrame</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              <button
                onClick={() => setActivePage('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors ${
                  activePage === 'overview' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Video className="w-5 h-5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActivePage('videos')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors ${
                  activePage === 'videos' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>Recent Videos</span>
              </button>

              <button
                onClick={() => setActivePage('pricing')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors ${
                  activePage === 'pricing' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Pricing</span>
              </button>

              <button
                onClick={() => setActivePage('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors ${
                  activePage === 'settings' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t-2 border-stone-900">
              <div className="flex items-center gap-3 mb-4 p-3 bg-stone-50">
                <div className="w-10 h-10 bg-purple-600 flex items-center justify-center text-white font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-100 font-medium transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-white border-b-2 border-stone-900 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-stone-600 hover:text-stone-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">
                {activePage === 'overview' && 'Dashboard'}
                {activePage === 'videos' && 'Recent Videos'}
                {activePage === 'pricing' && 'Pricing Plans'}
                {activePage === 'settings' && 'Settings'}
                {activePage === 'upload' && 'Upload New Video'}
              </h1>
            </div>
            <button 
              onClick={() => setActivePage('upload')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 font-bold transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">New Video</span>
            </button>
          </header>

          {/* Upload Page */}
          {activePage === 'upload' && (
            <div className="p-8">
              <VideoEditor />
            </div>
          )}

          {/* Overview Page */}
          {activePage === 'overview' && (
            <div className="p-8 space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-stone-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider">Videos Processed</p>
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-4xl font-bold">{stats.videosProcessed}</p>
                  <p className="text-sm text-stone-500 mt-2">This month</p>
                </div>

                <div className="bg-white border-2 border-stone-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider">Total Saved</p>
                    <Download className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-4xl font-bold">{stats.totalSaved}</p>
                  <p className="text-sm text-stone-500 mt-2">Storage space</p>
                </div>

                <div className="bg-white border-2 border-stone-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-stone-600 uppercase tracking-wider">Avg Process Time</p>
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-4xl font-bold">{stats.avgProcessTime}</p>
                  <p className="text-sm text-stone-500 mt-2">Per video</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setActivePage('upload')}
                    className="bg-white border-2 border-stone-900 p-8 hover:bg-purple-50 transition-colors group text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    <Upload className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Upload New Video</h3>
                    <p className="text-stone-600">Remove watermarks from a new video file</p>
                  </button>

                  <button 
                    onClick={() => setActivePage('videos')}
                    className="bg-white border-2 border-stone-900 p-8 hover:bg-purple-50 transition-colors group text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    <Clock className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">View Recent Videos</h3>
                    <p className="text-stone-600">Access your previously processed videos</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
                <div className="bg-white border-2 border-stone-900 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-stone-100 border-b-2 border-stone-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Video Name</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-stone-900 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-stone-200">
                        {recentVideos.map((video) => (
                          <tr key={video.id} className="hover:bg-stone-50 transition-colors">
                            <td className="px-6 py-4 font-medium">{video.name}</td>
                            <td className="px-6 py-4 text-stone-600">{video.date}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 bg-green-100 border border-green-300 px-3 py-1 text-xs font-semibold text-green-900 uppercase">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                {video.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Page */}
          {activePage === 'videos' && (
            <div className="p-8">
              <div className="mb-8">
                <p className="text-stone-600">All your processed videos in one place</p>
              </div>

              <div className="bg-white border-2 border-stone-900 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-100 border-b-2 border-stone-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Video Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Date Processed</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">File Size</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-stone-900 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-stone-900 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-stone-200">
                      {recentVideos.map((video) => (
                        <tr key={video.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 border-2 border-purple-600 flex items-center justify-center">
                                <Video className="w-5 h-5 text-purple-600" />
                              </div>
                              <span className="font-medium">{video.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-stone-600">{video.date}</td>
                          <td className="px-6 py-4 text-stone-600">24.5 MB</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 bg-green-100 border border-green-300 px-3 py-1 text-xs font-semibold text-green-900 uppercase">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                              {video.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-bold transition-colors">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Page */}
          {activePage === 'pricing' && (
            <div className="p-8">
              <div className="mb-12 max-w-3xl">
                <p className="text-stone-600 text-lg mb-8">Choose the plan that fits your needs</p>
                <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 px-4 py-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-xs font-semibold text-green-900 uppercase tracking-wider">Currently on Free Plan</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
                {/* Free Plan */}
                <div className="bg-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-8 border-b-2 border-stone-900">
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">$0</span>
                      <span className="text-stone-600 ml-2">/ month</span>
                    </div>
                    <p className="text-stone-600">Perfect for trying out the service</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">5 videos per month</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Max 100MB per video</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">720p output quality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Standard processing speed</span>
                      </li>
                    </ul>
                    <button className="w-full bg-stone-200 text-stone-600 px-6 py-3 font-bold uppercase tracking-wide cursor-not-allowed">
                      Current Plan
                    </button>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-white border-4 border-purple-600 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
                    Popular
                  </div>
                  <div className="p-8 border-b-2 border-purple-600">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">$19</span>
                      <span className="text-stone-600 ml-2">/ month</span>
                    </div>
                    <p className="text-stone-600">For professionals and creators</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">50 videos per month</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Max 500MB per video</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">1080p output quality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Priority processing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Batch processing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Email support</span>
                      </li>
                    </ul>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-bold uppercase tracking-wide transition-colors">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-8 border-b-2 border-stone-900">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">$99</span>
                      <span className="text-stone-600 ml-2">/ month</span>
                    </div>
                    <p className="text-stone-600">For teams and businesses</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Unlimited videos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">No file size limit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">4K output quality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Fastest processing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">API access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Priority support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">Custom integrations</span>
                      </li>
                    </ul>
                    <button className="w-full bg-stone-900 hover:bg-purple-600 text-white px-6 py-3 font-bold uppercase tracking-wide transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Page */}
          {activePage === 'settings' && (
            <div className="p-8">
              <div className="max-w-2xl space-y-8">
                {/* Profile Settings */}
                <div className="bg-white border-2 border-stone-900 p-8">
                  <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.displayName || ''}
                        className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                      />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-bold transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Password Settings */}
                <div className="bg-white border-2 border-stone-900 p-8">
                  <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                      />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-bold transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white border-2 border-red-600 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-red-600">Danger Zone</h2>
                  <p className="text-stone-600 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}