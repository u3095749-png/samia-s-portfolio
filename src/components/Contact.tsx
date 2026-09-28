import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';
import { 
  Phone, 
  Mail, 
  Github, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem('samia_contact_draft');
      return saved ? JSON.parse(saved) : { name: '', email: '', subject: '', message: '' };
    } catch {
      return { name: '', email: '', subject: '', message: '' };
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<FormData | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Auto-save form draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('samia_contact_draft', JSON.stringify(formData));
    } catch (e) {
      console.error(e);
    }
  }, [formData]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getWhatsAppUrl = (data: FormData) => {
    const text = `*New Portfolio Inquiry - Samia Siddiqui*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📌 *Subject:* ${data.subject}\n` +
      `💬 *Message:*\n${data.message}`;
    return `https://wa.me/923112537554?text=${encodeURIComponent(text)}`;
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject line is required (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please write a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const submittedData = { ...formData };

    try {
      // Direct email dispatch to user's email: u3095749@gmail.com
      await fetch('https://formsubmit.co/ajax/u3095749@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: submittedData.name,
          email: submittedData.email,
          _subject: `Portfolio Inquiry: ${submittedData.subject} (from ${submittedData.name})`,
          subject: submittedData.subject,
          message: submittedData.message,
          _template: 'table'
        })
      });
    } catch (err) {
      console.log('Direct email service notified:', err);
    } finally {
      setIsSubmitting(false);
      setLastSubmitted(submittedData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('samia_contact_draft');

      // Also automatically open WhatsApp with the filled details for immediate delivery
      const waUrl = getWhatsAppUrl(submittedData);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white/70">
      {/* Soft gradient ambient */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries &amp; Teaching Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Get In Touch
          </h2>
          <p className="text-base text-slate-600">
            Have a project in mind, want to discuss tutoring / teaching sessions, or connect regarding web development? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <Interactive3DCard
              maxTilt={4}
              className="glass-panel p-5 rounded-2xl border border-white hover:border-blue-200 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Direct Mobile &amp; WhatsApp</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors font-mono"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedType === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`https://wa.me/923112537554`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Open in WhatsApp"
                    aria-label="Open in WhatsApp"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Interactive3DCard>

            {/* Email Card */}
            <Interactive3DCard
              maxTilt={4}
              className="glass-panel p-5 rounded-2xl border border-white hover:border-blue-200 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 font-medium">Email Address</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Interactive3DCard>

            {/* GitHub Card */}
            <Interactive3DCard
              maxTilt={4}
              className="glass-panel p-5 rounded-2xl border border-white hover:border-blue-200 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">GitHub Profile</div>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      github.com/{personalInfo.githubUsername}
                    </a>
                  </div>
                </div>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  aria-label="Visit GitHub Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Interactive3DCard>

            {/* Notice / Availability Box */}
            <div className="glass-panel p-5 rounded-2xl border border-blue-100 bg-blue-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Teaching &amp; Development Inquiries</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Currently open for teaching assignments, student mentoring in programming foundations, and freelance web development projects. Quick response time guaranteed!
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white shadow-md">
              {submitSuccess && lastSubmitted ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                      Aapki information direct <strong>u3095749@gmail.com</strong> aur WhatsApp <strong>03112537554</strong> par bhej di gayi hai.
                    </p>
                  </div>

                  {/* Summary of sent info */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500 font-medium">Name:</span>
                      <span className="font-semibold text-slate-800">{lastSubmitted.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500 font-medium">Email:</span>
                      <span className="font-semibold text-slate-800">{lastSubmitted.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500 font-medium">Subject:</span>
                      <span className="font-semibold text-slate-800">{lastSubmitted.subject}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block mb-1">Message:</span>
                      <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 italic">
                        "{lastSubmitted.message}"
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={getWhatsAppUrl(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(lastSubmitted.subject)}&body=${encodeURIComponent(`Hi Samia,\n\nName: ${lastSubmitted.name}\nEmail: ${lastSubmitted.email}\n\n${lastSubmitted.message}`)}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Gmail / Email</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setLastSubmitted(null);
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      &larr; Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                    Send a Direct Message
                  </h3>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Sarah Khan"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/90 border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/90 border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, subject: e.target.value }));
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: undefined }));
                      }}
                      placeholder="e.g. Teaching Opportunity / Web Development"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/90 border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        errors.subject ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/90 border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                        errors.message ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Direct Delivery Notice */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[12px] text-blue-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Your message will be sent directly to <strong>u3095749@gmail.com</strong> &amp; <strong>WhatsApp (03112537554)</strong>.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-200 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Email &amp; WhatsApp</span>
                        </>
                      )}
                    </button>

                    {/* Quick WhatsApp Send Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!validate()) return;
                        const waUrl = getWhatsAppUrl(formData);
                        window.open(waUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-xs hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp Directly</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    Draft is automatically saved in your browser storage.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
