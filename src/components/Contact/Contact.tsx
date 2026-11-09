import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, MapPin, MessageSquare, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalProfile } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';

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
  const [copiedType, setCopiedType] = useState<string | null>(null);

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

  const handleCopy = (text: string, type: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundFX.playBeep(300, 0.1);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));

      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
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

      setTimeout(() => {
        const wantsMailApp = window.confirm(
          "Your message is validated! Would you also like to open your default email app to send it immediately?"
        );
        if (wantsMailApp) {
          window.location.href = mailtoUrl;
        }
      }, 700);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-[#253247]/40 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Direct Engineering Contact &amp; Messaging
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Reach out directly via WhatsApp, email, or send a detailed technical inquiry using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1220] border border-[#253247] shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#F8FAFC] font-sans">
                  Direct Contact Channels
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Active for technical discussions, robotics research, internships, and embedded systems prototyping.
                </p>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={personalProfile.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-emerald-100 font-mono">Immediate Chat</span>
                    <span className="text-sm font-bold">WhatsApp: {personalProfile.contact.phone}</span>
                  </div>
                </div>
                <span className="text-xs font-mono bg-white/20 px-2.5 py-1 rounded-md">Open App →</span>
              </a>

              {/* Email Pill with One-Click Copy */}
              <div className="p-4 rounded-xl bg-[#111B2B] border border-[#253247] space-y-2">
                <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Email Address</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${personalProfile.contact.email}`}
                    className="text-xs sm:text-sm font-mono text-[#38BDF8] truncate hover:underline"
                  >
                    {personalProfile.contact.email}
                  </a>
                  <button
                    onClick={() => handleCopy(personalProfile.contact.email, 'email')}
                    className="p-2 rounded-lg bg-[#0C1220] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors flex items-center gap-1.5 text-xs font-mono"
                    aria-label="Copy Email Address"
                  >
                    {copiedType === 'email' ? (
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

              {/* Phone Pill with One-Click Copy */}
              <div className="p-4 rounded-xl bg-[#111B2B] border border-[#253247] space-y-2">
                <span className="text-[11px] font-mono text-[#94A3B8] uppercase">Mobile Number</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono text-[#F8FAFC] truncate">
                    {personalProfile.contact.phone}
                  </span>
                  <button
                    onClick={() => handleCopy(personalProfile.contact.phone, 'phone')}
                    className="p-2 rounded-lg bg-[#0C1220] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors flex items-center gap-1.5 text-xs font-mono"
                    aria-label="Copy Phone Number"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Pill */}
              <div className="p-4 rounded-xl bg-[#111B2B] border border-[#253247] flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#0C1220] text-[#38BDF8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                    {personalProfile.location}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1220] border border-[#253247] shadow-xl">
              
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#111B2B] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                        errors.name ? 'border-red-500' : 'border-[#253247]'
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#111B2B] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                        errors.email ? 'border-red-500' : 'border-[#253247]'
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
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#111B2B] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                      errors.subject ? 'border-red-500' : 'border-[#253247]'
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
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#111B2B] text-sm text-[#F8FAFC] placeholder-[#64748B] border ${
                      errors.message ? 'border-red-500' : 'border-[#253247]'
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
                      Submission encountered an issue. Please contact directly via WhatsApp or email.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-[#070A12] font-bold text-sm tracking-wide shadow-lg shadow-[#38BDF8]/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#070A12] border-t-transparent rounded-full animate-spin" />
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
