/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState, useEffect } from 'react';
import { AppStateProvider } from './AppStateContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

const ScanModal = React.lazy(() => import('./components/ScanModal').then(module => ({ default: module.ScanModal })));
const BackgroundParticles = React.lazy(() => import('./components/BackgroundParticles').then(module => ({ default: module.BackgroundParticles })));
const CaseStudyModal = React.lazy(() => import('./components/CaseStudyModal').then(module => ({ default: module.CaseStudyModal })));
const SkillConstellation = React.lazy(() => import('./components/SkillConstellation').then(module => ({ default: module.SkillConstellation })));
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.About })));
const ExperienceTimeline = React.lazy(() => import('./components/ExperienceTimeline').then(module => ({ default: module.ExperienceTimeline })));
const Certifications = React.lazy(() => import('./components/Certifications').then(module => ({ default: module.Certifications })));
const FeaturedProjects = React.lazy(() => import('./components/FeaturedProjects').then(module => ({ default: module.FeaturedProjects })));
const ObsidianMiniBrain = React.lazy(() => import('./components/ObsidianMiniBrain').then(module => ({ default: module.ObsidianMiniBrain })));
const HireMe = React.lazy(() => import('./components/HireMe').then(module => ({ default: module.HireMe })));
const ProofContact = React.lazy(() => import('./components/ProofContact').then(module => ({ default: module.ProofContact })));
const AchievementTicker = React.lazy(() => import('./components/AchievementTicker').then(module => ({ default: module.AchievementTicker })));

// Defer component rendering until after initial paint to speed up initial load
function Deferred({ children }: { children: React.ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), 500); // Wait 500ms before mounting heavy sections
    return () => clearTimeout(timer);
  }, []);
  return shouldRender ? <>{children}</> : <div className="min-h-screen" />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-brand-black text-white relative font-sans selection:bg-brand-cyan/30 selection:text-brand-cyan">
      <Header />
      
      {/* Background Particles deferred */}
      <Deferred>
        <Suspense fallback={null}>
          <ScanModal />
          <BackgroundParticles />
          <CaseStudyModal />
        </Suspense>
      </Deferred>
      
      <main className="relative z-10 flex flex-col">
        <Hero />
        
        {/* Main Content deferred to prioritize Hero loading */}
        <Deferred>
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <SkillConstellation />
            <About />
            <ExperienceTimeline />
            <Certifications />
            <FeaturedProjects />
            <ObsidianMiniBrain />
            <HireMe />
            <ProofContact />
          </Suspense>
        </Deferred>
      </main>
      
      <Deferred>
        <Suspense fallback={null}>
          <AchievementTicker />
        </Suspense>
      </Deferred>
      
      <footer className="relative z-10 py-12 pb-24 text-center border-t border-white/5 bg-brand-black flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <a href="https://www.linkedin.com/in/aniket-dhuri-273094225?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="p-3 text-gray-500 hover:text-[#0a66c2] transition-colors" title="LinkedIn" aria-label="LinkedIn Profile">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
             </svg>
          </a>
          <a href="https://github.com/dhurianiket" target="_blank" rel="noopener noreferrer" className="p-3 text-gray-500 hover:text-white transition-colors" title="GitHub" aria-label="GitHub Profile">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
               <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
             </svg>
          </a>
          <a href="https://aegishealthai.co.in" target="_blank" rel="noopener noreferrer" className="p-3 text-gray-500 hover:text-brand-violet transition-colors font-display font-bold text-lg leading-none" title="Aegis Health AI" aria-label="Aegis Health AI Website">
             A
          </a>
        </div>
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Aniket Dhuri. All systems nominal.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
