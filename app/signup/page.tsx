'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.fullName });
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(3deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
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
            <a href="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-2 h-2 bg-purple-600 rounded-full group-hover:scale-125 transition-transform"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-125 transition-transform" style={{transitionDelay: '50ms'}}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full group-hover:scale-125 transition-transform" style={{transitionDelay: '100ms'}}></div>
              <span className="text-xl font-bold tracking-tight ml-2">CleanFrame</span>
            </a>

            <a href="/" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">
              ← Back to home
            </a>
          </div>
        </div>
      </nav>

      {/* Sign Up Form */}
      <section className="relative z-10 container mx-auto px-8 py-24 flex items-center justify-center min-h-[calc(100vh-180px)]">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-bold mb-4">Create account</h1>
            <p className="text-stone-600 text-lg">Start removing watermarks for free</p>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white border-2 border-stone-900 hover:bg-stone-50 text-stone-900 px-8 py-4 font-semibold transition-colors mb-6 flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#fafaf9] text-stone-500 font-medium uppercase tracking-wider">Or sign up with email</span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={8}
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-stone-500 mt-2">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-stone-900 mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                minLength={8}
                className="w-full px-4 py-3 border-2 border-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                required
                className="w-5 h-5 border-2 border-stone-900 text-purple-600 focus:ring-purple-600 mt-0.5" 
              />
              <label htmlFor="agreeToTerms" className="text-sm text-stone-600">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 font-bold uppercase tracking-wide transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-stone-600">
              Already have an account?{' '}
              <a href="/signin" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign in
              </a>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-12 pt-8 border-t-2 border-stone-200">
            <p className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-4">What you get:</p>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>5 free video watermark removals per month</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>HD quality output up to 720p</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Fast processing in under 30 seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Secure and private - videos deleted after 24 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-stone-900 bg-white py-8">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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