import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, X, Check, Copy } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  summary: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'pinn_battery',
    title: 'Solving Stiff ODEs in Lithium-ion Battery State-of-Health Prediction using Physics-Informed Neural Networks (PINNs)',
    date: 'February 2026',
    readTime: '7 min read',
    category: 'Physics-Informed ML',
    tags: ['PyTorch', 'PINN', 'Lithium-ion', 'Battery Degradation', 'Differential Equations'],
    summary: 'Standard deep learning models frequently overfit or output physically impossible negative capacity loss under unseen thermal stress. By embedding Butler-Volmer kinetics directly into the loss function, we enforce thermodynamic consistency.',
    content: [
      '### The Challenge with Pure Data-Driven Battery Twins',
      'Modern Electric Vehicle (EV) battery management systems (BMS) demand millivolt-level state-of-health (SoH) tracking. Purely data-driven sequence models—such as vanilla LSTMs or GRUs—struggle when subjected to non-standard charging profiles or high C-rate bursts because they lack physical constraints.',
      'Under rapid thermal cycling, purely empirical models can output non-monotonic capacity curves or even project negative SEI (Solid Electrolyte Interphase) layer growth.',
      '### Mathematical Formulation of the Physics Residual',
      'In our BATest.AI framework, we enforce the Arrhenius chemical reaction rate coupled with the Butler-Volmer electrochemical kinetics:',
      '$$k(T) = A \\cdot \\exp\\left(-\\frac{E_a}{R \\cdot T}\\right)$$',
      'The total training loss becomes a dual-objective weighted sum:',
      '$$\\mathcal{L}_{\\text{total}} = \\lambda_{\\text{data}} \\cdot \\mathcal{L}_{\\text{MSE}}(y, \\hat{y}) + \\lambda_{\\text{physics}} \\cdot \\left\\| \\frac{\\partial \\text{SEI}}{\\partial t} - k(T) \\cdot C_{\\text{rate}}^{\\alpha} \\right\\|^2$$',
      '### Key Findings & Benchmark Results',
      'By integrating this regularizer into an Attention-LSTM backbone, we achieved a 34% reduction in root-mean-square error (RMSE) on high-temperature test cycles while ensuring the model never predicts impossible regenerative capacity anomalies.'
    ]
  },
  {
    id: 'esp32_safety',
    title: 'Architecting Deterministic Safety in Automotive Embedded Systems: ESP32 FreeRTOS Task Scheduling & MQ-3 Fusion',
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Embedded Systems',
    tags: ['ESP32', 'FreeRTOS', 'Automotive Safety', 'MQ-3', 'C++ Firmware'],
    summary: 'How we engineered a fail-safe vehicle ignition interlock that samples ethanol levels at 20Hz without blocking cloud telemetry, employing opto-isolation and dual-core task segregation.',
    content: [
      '### Hardware Architectural Boundaries',
      'In safety-critical automotive interlocks, timing jitter can cause dangerous system lockouts while driving or allow intoxicated operators to bypass the test. We utilized the ESP32-WROOM-32 dual-core Xtensa architecture to establish strict hardware privilege isolation.',
      '### Dual-Core FreeRTOS Partitioning',
      '- **Core 0 (Networking & Telemetry)**: Executes Wi-Fi connection handling, MQTT event publishing, and GPS coordinate streaming. Network stalls never affect hardware sensing.',
      '- **Core 1 (Deterministic Safety Loop)**: Dedicated strictly to 50ms periodic ADC sampling, moving-average smoothing, and opto-isolated relay control.',
      '### Opto-Isolation & Flyback Suppression',
      'Vehicle starter harnesses experience inductive voltage spikes exceeding 60V during ignition cranking. We deployed a PC817 optocoupler with reverse 1N4007 flyback diodes to ensure the microcontrollers 3.3V logic rail remained completely isolated from vehicle alternator transients.'
    ]
  },
  {
    id: 'px4_ros2',
    title: 'Autonomous Quadcopter Control Pipeline: Integrating PX4 SITL, MAVLink, and ROS 2 Humble',
    date: 'December 2025',
    readTime: '8 min read',
    category: 'Robotics',
    tags: ['ROS 2', 'PX4 Autopilot', 'SITL', 'MAVLink', 'Gazebo', 'Robotics'],
    summary: 'A step-by-step technical breakdown of configuring Software-In-The-Loop quadcopter dynamics and streaming real-time waypoint commands over the MicroXRCE-DDS agent.',
    content: [
      '### Why Simulation-First Robotics Matters',
      'Physical multi-rotor testing is hazardous and expensive during early control development. Using PX4 Software-In-The-Loop (SITL) with Gazebo allows full sensor telemetry—including IMU, barometer, and GPS—to run on a standard Linux workstation.',
      '### ROS 2 DDS Integration Architecture',
      'Instead of legacy MAVROS translation layers, modern PX4 architectures use the MicroXRCE-DDS client on the flight controller paired with an agent running in ROS 2 Humble.',
      'This allows ROS 2 nodes to subscribe directly to uORB topics such as `VehicleOdometry` and publish to `TrajectorySetpoint` with microsecond latency.',
      '### Trajectory Waypoint Generation',
      'We tested a cubic spline path planner that smooths waypoint trajectories, preventing abrupt motor saturation during high-speed autonomous survey maneuvers.'
    ]
  },
  {
    id: 'irt_testing',
    title: 'Adaptive Testing at Scale: Implementing 3-Parameter Logistic (3PL) Item Response Theory in Django',
    date: 'November 2025',
    readTime: '6 min read',
    category: 'Software & Psychometrics',
    tags: ['Django', 'Python', 'Psychometrics', 'IRT', 'Adaptive Testing'],
    summary: 'Designing 1QUIZ: How we transformed traditional static examinations into dynamic ability-targeted testing sessions using Bayesian updating and item Fisher information.',
    content: [
      '### The Inefficiency of Static Examinations',
      'Fixed-question exams present high-ability candidates with trivial items and low-ability candidates with discouraging questions. Item Response Theory (IRT) models the probabilistic relationship between a candidate latent trait ability (θ) and question parameters.',
      '### The 3-Parameter Logistic (3PL) Formulation',
      '$$P_i(\\theta) = c_i + \\frac{1 - c_i}{1 + \\exp(-a_i (\\theta - b_i))}$$',
      'Where $a_i$ represents discrimination, $b_i$ represents difficulty, and $c_i$ is the pseudo-guessing probability.',
      '### Maximizing Fisher Information',
      'After each answered item, our algorithm updates the candidate estimated $\\theta$ via Newton-Raphson iterations and searches the item pool for the question that maximizes Fisher Information $I_i(\\theta)$. This converges to an accurate ability metric in 40% fewer questions.'
    ]
  }
];

export const TechnicalBlog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-24 relative z-10 bg-[#0D1420] border-t border-[#253247]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>ENGINEERING PUBLICATIONS &amp; RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Technical Articles &amp; Insights
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            In-depth breakdowns on Physics-Informed Neural Networks, real-time FreeRTOS safety architecture, PX4 autonomous drone simulations, and adaptive testing psychometrics.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="rounded-3xl bg-[#090D16] border border-[#253247] p-6 sm:p-8 flex flex-col justify-between hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 group shadow-xl"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#38BDF8] bg-[#111B2B] px-3 py-1 rounded-full border border-[#38BDF8]/30">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans leading-snug">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {article.summary}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-[#CBD5E1] bg-[#111B2B] px-2.5 py-0.5 rounded-md border border-[#253247] flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#38BDF8]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#253247] flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B]">{article.date}</span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] hover:text-[#7dd3fc] group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl bg-[#090D16] border border-[#253247] p-6 sm:p-8 overflow-y-auto shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#253247] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl bg-[#111B2B] text-[#94A3B8] hover:text-white border border-[#253247] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Body */}
            <div className="space-y-4 text-sm text-[#CBD5E1] leading-relaxed font-sans">
              {selectedArticle.content.map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-base sm:text-lg font-bold text-[#F8FAFC] pt-3 font-sans">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('$$')) {
                  return (
                    <div key={idx} className="p-3.5 my-2 rounded-xl bg-[#111B2B] border border-[#253247] text-center font-mono text-[#38BDF8] overflow-x-auto">
                      {paragraph.replace(/\$\$/g, '')}
                    </div>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <p key={idx} className="pl-4 border-l-2 border-[#38BDF8] text-xs sm:text-sm">
                      {paragraph.replace('- ', '')}
                    </p>
                  );
                }
                return (
                  <p key={idx} className="text-xs sm:text-sm text-[#94A3B8]">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#253247] pt-4 flex items-center justify-between">
              <button
                onClick={() => handleCopy(window.location.href)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111B2B] text-xs font-mono text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247]"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] text-xs font-mono font-bold"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
