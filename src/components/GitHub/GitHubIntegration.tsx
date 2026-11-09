import React from 'react';
import { GitBranch, Star, GitFork, ExternalLink, Activity, Code2 } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface RepoItem {
  name: string;
  repoUrl: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  branch: string;
  lastCommitMessage: string;
}

const FEATURED_REPOS: RepoItem[] = [
  {
    name: 'BATest.AI',
    repoUrl: 'https://github.com/shubhampatel0487/BATest.AI',
    description: 'Physics-Informed Neural Network (PINN) battery digital twin enforcing Butler-Volmer kinetics and Arrhenius thermal degradation in PyTorch.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 14,
    forks: 3,
    branch: 'main',
    lastCommitMessage: 'feat(physics): add Arrhenius thermal regularization penalty'
  },
  {
    name: 'QUIZ',
    repoUrl: 'https://github.com/shubhampatel0487/QUIZ',
    description: '1QUIZ: Adaptive Computer-Based Testing engine running 3-Parameter Logistic (3PL) Item Response Theory (IRT) and dynamic Fisher Information estimation.',
    language: 'Python / Django',
    languageColor: '#092E20',
    stars: 9,
    forks: 2,
    branch: 'master',
    lastCommitMessage: 'optimize(irt): optimize Newton-Raphson theta convergence iterations'
  },
  {
    name: 'ESP32-Alcohol-Detection-Safety',
    repoUrl: 'https://github.com/shubhampatel0487/ESP32-Alcohol-Detection-Safety',
    description: 'Automotive alcohol interlock firmware with 20Hz MQ-3 moving-average ADC filter, FreeRTOS dual-core tasking, and opto-isolated ignition lock.',
    language: 'C++',
    languageColor: '#F34B7D',
    stars: 12,
    forks: 4,
    branch: 'main',
    lastCommitMessage: 'refactor(firmware): separate core0 mqtt telemetry from core1 relay isr'
  },
  {
    name: 'SECURE_AI_PROJECT',
    repoUrl: 'https://github.com/shubhampatel0487/SECURE_AI_PROJECT',
    description: 'TrustGuard cybersecurity engine detecting fraudulent SMS banking scams and malicious urgency patterns using NLP classification.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 6,
    forks: 1,
    branch: 'main',
    lastCommitMessage: 'feat(model): integrate lexical heuristics with tf-idf intent vectors'
  },
  {
    name: 'PORTFOLIO',
    repoUrl: 'https://github.com/shubhampatel0487/PORTFOLIO',
    description: 'Interactive engineering portfolio and digital identity ecosystem featuring 3D robotics lab, drone simulation, video player, and code explorer.',
    language: 'TypeScript',
    languageColor: '#3178C6',
    stars: 18,
    forks: 5,
    branch: 'master',
    lastCommitMessage: 'chore(deploy): configure automated GitHub Pages CI/CD workflow'
  }
];

export const GitHubIntegration: React.FC = () => {
  return (
    <section id="github" className="py-24 relative z-10 bg-[#070A12] border-t border-[#253247]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <GithubIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>OPEN SOURCE &amp; CODEBASE REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            GitHub Code Repositories
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Explore verified open source repositories, firmware implementations, and machine learning pipelines under{' '}
            <a
              href={personalProfile.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:underline font-mono"
            >
              @shubhampatel0487
            </a>.
          </p>
        </div>

        {/* GitHub Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-[#0D1420] border border-[#253247] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#38BDF8]">18+</span>
            <span className="text-xs font-mono text-[#94A3B8] block">Public Repositories</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D1420] border border-[#253247] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#8B5CF6]">480+</span>
            <span className="text-xs font-mono text-[#94A3B8] block">Git Commits</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D1420] border border-[#253247] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">5</span>
            <span className="text-xs font-mono text-[#94A3B8] block">Flagship Systems</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D1420] border border-[#253247] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F59E0B]">100%</span>
            <span className="text-xs font-mono text-[#94A3B8] block">Verified Authorship</span>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_REPOS.map((repo) => (
            <div
              key={repo.name}
              className="rounded-2xl bg-[#0D1420] border border-[#253247] p-6 flex flex-col justify-between hover:border-[#38BDF8]/60 transition-all duration-300 hover:-translate-y-1 group shadow-xl"
            >
              <div className="space-y-3">
                {/* Repo Top Line */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#CBD5E1]">
                    <Code2 className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-bold group-hover:text-[#38BDF8] transition-colors">{repo.name}</span>
                  </div>
                  <span className="text-[10px] text-[#64748B] px-2 py-0.5 rounded bg-[#111B2B] border border-[#253247] flex items-center gap-1">
                    <GitBranch className="w-2.5 h-2.5" />
                    {repo.branch}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#94A3B8] leading-relaxed min-h-[48px]">
                  {repo.description}
                </p>

                {/* Last commit trace */}
                <div className="p-2.5 rounded-xl bg-[#070A12] border border-[#253247] text-[11px] font-mono text-[#CBD5E1] truncate flex items-center gap-2">
                  <Activity className="w-3 h-3 text-[#38BDF8] flex-shrink-0" />
                  <span className="truncate">{repo.lastCommitMessage}</span>
                </div>
              </div>

              {/* Bottom Meta & Link */}
              <div className="pt-4 mt-4 border-t border-[#253247] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#CBD5E1]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <Star className="w-3 h-3 text-[#F59E0B]" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks}</span>
                  </div>
                </div>

                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#162338] transition-colors"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Button */}
        <div className="mt-12 text-center">
          <a
            href={personalProfile.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#111B2B] hover:bg-[#162338] text-[#F8FAFC] hover:text-[#38BDF8] border-2 border-[#253247] hover:border-[#38BDF8]/60 font-mono font-bold text-sm transition-all shadow-xl"
          >
            <GithubIcon className="w-5 h-5 text-[#38BDF8]" />
            <span>Follow @shubhampatel0487 on GitHub</span>
            <ExternalLink className="w-4 h-4 text-[#94A3B8]" />
          </a>
        </div>

      </div>
    </section>
  );
};
