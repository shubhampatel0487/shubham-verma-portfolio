import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalProfile } from '../../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#38BDF8', '#8B5CF6', '#10B981']
        });
      } catch {
        // Safe fallback
      }

      setSubmitStatus('success');
      const mailtoUrl = `mailto:${personalProfile.contact.email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      
      console.log('Contact inquiry received:', formData);

      setTimeout(() => {
        const wantsMailApp = window.confirm(
          "Your message payload has been validated! Would you also like to launch your default email client to send this message directly?"
        );
        if (wantsMailApp) {
          window.location.href = mailtoUrl;
        }
      }, 800);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-[#263244]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            09 // Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Initiate Engineering Collaboration
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Whether you are discussing robotics research, technical internships, embedded projects, or AI modeling, feel free to send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#F8FAFC] font-sans">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  I typically respond within 24–48 hours for academic and engineering discussions.
                </p>
              </div>

              {/* Email Pill with One-Click Copy */}
              <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] space-y-2">
                <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Email Address</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-mono text-[#38BDF8] truncate">
                    {personalProfile.contact.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#0E1420] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] transition-colors flex items-center gap-1.5 text-xs font-mono"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Pill */}
              <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#0E1420] text-[#38BDF8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">Location</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">
                    {personalProfile.location}
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-[#141C2A]/60 border border-[#263244] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Open for opportunities in <strong>Robotics Engineering, Embedded Firmware, ROS 2 Simulation, and Applied AI</strong>.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl">
              
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#94A3B8] mb-1 uppercase">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#141C2A] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                        errors.name ? 'border-red-500' : 'border-[#263244]'
                      } focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#94A3B8] mb-1 uppercase">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#141C2A] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                        errors.email ? 'border-red-500' : 'border-[#263244]'
                      } focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#94A3B8] mb-1 uppercase">
                    Subject / Discussion Topic *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Robotics Collaboration / Research Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#141C2A] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                      errors.subject ? 'border-red-500' : 'border-[#263244]'
                    } focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all`}
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#94A3B8] mb-1 uppercase">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Describe your technical inquiry, project context, or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#141C2A] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                      errors.message ? 'border-red-500' : 'border-[#263244]'
                    } focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Feedback Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Message prepared successfully! You can also click the mail client prompt to deliver directly.
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Submission encountered an issue. Please send an email directly to {personalProfile.contact.email}.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-[#080B12] font-bold text-sm tracking-wide shadow-lg shadow-[#38BDF8]/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#080B12] border-t-transparent rounded-full animate-spin" />
                      <span>Validating Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
