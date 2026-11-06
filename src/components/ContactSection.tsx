import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Private Tasting Appointment',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  const BOUTIQUES = [
    {
      city: 'Paris Flagship',
      address: '28 Rue du Faubourg Saint-Honoré, 75008 Paris',
      hours: 'Mon–Sat: 10:00 – 19:30',
      phone: '+33 1 42 68 55 00',
      rawPhone: '+33142685500',
    },
    {
      city: 'Zurich Atelier',
      address: 'Bahnhofstrasse 45, 8001 Zürich',
      hours: 'Mon–Sat: 09:30 – 19:00',
      phone: '+41 44 211 88 20',
      rawPhone: '+41442118820',
    },
    {
      city: 'Tokyo Ginza Salon',
      address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061',
      hours: 'Daily: 11:00 – 20:00',
      phone: '+81 3 5537 1928',
      rawPhone: '+81355371928',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#140E0B] border-t border-[#221610] relative scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-2">
            <span>Boutiques &amp; Concierge</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Service</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FDFBF7] tracking-tight">
            Visit Our Maisons or Enquire
          </h2>
          <p className="mt-3 text-[#C4B3A3] text-sm sm:text-base leading-relaxed">
            Whether arranging a curated private tasting, commissioning bespoke corporate gifts, or requesting temperature-controlled worldwide courier dispatch, our chocolatiers are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: Flagship Boutiques */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              International Salons
            </h3>

            <div className="space-y-4">
              {BOUTIQUES.map((boutique) => (
                <div
                  key={boutique.city}
                  className="p-5 bg-[#0E0907] border border-[#221610] rounded-xl hover:border-[#3B261A] transition-colors"
                >
                  <h4 className="font-display text-lg font-medium text-[#FDFBF7]">
                    {boutique.city}
                  </h4>
                  <div className="mt-2 space-y-2 text-xs text-[#9E8C7F]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{boutique.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{boutique.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <a
                        href={`tel:${boutique.rawPhone}`}
                        className="hover:text-[#FDFBF7] transition-colors underline-offset-2 hover:underline"
                      >
                        {boutique.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#1A120D] border border-[#2D1F17] rounded-xl text-xs text-[#C4B3A3] flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <span className="text-[#8E7C6F] block">Concierge Inquiries:</span>
                <a
                  href="mailto:concierge@cacaonoir.com"
                  className="text-[#FDFBF7] font-medium font-mono hover:text-[#C5A059] transition-colors"
                >
                  concierge@cacaonoir.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Concierge Message Form */}
          <div className="lg:col-span-7 bg-[#0E0907] border border-[#221610] rounded-xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-display text-2xl font-semibold text-[#FDFBF7] mb-2">
              Send a Concierge Request
            </h3>
            <p className="text-xs text-[#9E8C7F] mb-6">
              Our chocolate sommelier will respond to your bespoke request within 24 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#140E0B] border border-[#C5A059]/40 rounded-lg animate-in fade-in" role="status">
                <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
                <h4 className="font-display text-xl font-medium text-[#FDFBF7]">
                  Thank You, {formData.name}
                </h4>
                <p className="text-xs text-[#C4B3A3] max-w-md mx-auto leading-relaxed">
                  Your message regarding "{formData.topic}" has been logged with our head atelier. We will reach out to <span className="text-[#FDFBF7] font-mono">{formData.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Private Tasting Appointment', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs uppercase tracking-wider text-[#C5A059] border border-[#3B261A] rounded hover:border-[#C5A059] transition-colors cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider text-[#8E7C6F] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 bg-[#140E0B] border border-[#2A1D15] rounded text-sm text-[#FDFBF7] placeholder-[#5C4D42] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider text-[#8E7C6F] mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#140E0B] border border-[#2A1D15] rounded text-sm text-[#FDFBF7] placeholder-[#5C4D42] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-[11px] uppercase tracking-wider text-[#8E7C6F] mb-1 font-medium">
                    Topic of Inquiry
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#140E0B] border border-[#2A1D15] rounded text-sm text-[#FDFBF7] focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    <option value="Private Tasting Appointment">Private Tasting Appointment (Paris/Zurich)</option>
                    <option value="Corporate & Wedding Gifting">Corporate &amp; Bespoke Gifting</option>
                    <option value="Order & Courier Status">Order &amp; Courier Consultation</option>
                    <option value="Sommelier Origin Consultation">Sommelier Origin Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-wider text-[#8E7C6F] mb-1 font-medium">
                    Message / Desired Dates *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your palate preferences, party size, or specific questions..."
                    className="w-full px-3.5 py-2.5 bg-[#140E0B] border border-[#2A1D15] rounded text-sm text-[#FDFBF7] placeholder-[#5C4D42] focus:outline-none focus:border-[#C5A059] resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#0E0907] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
