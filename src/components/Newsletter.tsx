import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address to receive invitations.');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email format (e.g. connoisseur@domain.com).');
      return;
    }

    // Success feedback
    setStatus('success');
    setErrorMessage('');
  };

  return (
    <section className="py-20 bg-[#0E0907] border-t border-[#221610] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>The Connoisseur's Gazette</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FDFBF7] tracking-tight leading-tight">
          Privileged Access to Rare Micro-Batches
        </h2>

        <p className="mt-4 text-[#C4B3A3] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Be the first to secure our seasonal estate harvests, limited edition single-origin releases, and private chocolate tasting invitations in Paris and Zurich.
        </p>

        {status === 'success' ? (
          <div
            className="mt-8 p-6 bg-[#140E0B] border border-[#C5A059]/40 rounded-xl max-w-lg mx-auto animate-in zoom-in-95 duration-200"
            role="status"
          >
            <div className="flex items-center justify-center gap-2 text-[#C5A059] mb-2">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-display text-xl font-medium text-[#FDFBF7]">Bienvenue au Club</span>
            </div>
            <p className="text-xs text-[#C4B3A3] leading-relaxed">
              We have dispatched your private welcome dossier and complimentary tasting privilege token <strong className="text-[#C5A059]">NOIR10</strong> to <span className="text-[#FDFBF7] font-mono">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="mt-4 text-xs text-[#8E7C6F] hover:text-[#C5A059] uppercase tracking-wider underline cursor-pointer"
            >
              Register another address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto" noValidate>
            <label htmlFor="newsletter-email-input" className="sr-only">
              Email address for newsletter subscription
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className={`w-full px-4 py-3.5 bg-[#140E0B] border rounded text-sm text-[#FDFBF7] placeholder-[#6E5D52] focus:outline-none transition-colors ${
                    status === 'error'
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-[#3B261A] focus:border-[#C5A059]'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5A059] text-[#0E0907] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'error' && (
              <p id="newsletter-error" className="mt-2.5 text-xs text-rose-400 text-left sm:text-center animate-in fade-in" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#7A695C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>We honor your sanctuary. Unsubscribe in one click anytime. No third-party sharing.</span>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
