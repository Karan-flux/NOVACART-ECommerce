import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How fast will my order arrive?',
      a: 'All standard orders ship via insured express courier within 24 hours. Transit to North America and Europe averages 2–4 business days. You will receive a tracking link as soon as your package leaves our fulfillment hub.',
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 30-day no-questions-asked return policy on all unworn items in their original packaging. Return shipping is free for all customers within the US and EU.',
    },
    {
      q: 'How do I track my package?',
      a: 'Once dispatched, you will receive an SMS and email notification with your live courier tracking link. You can also view active order statuses via your order confirmation email.',
    },
    {
      q: 'Can I cancel or modify an order after placing it?',
      a: 'Because our warehouse team fulfills orders quickly, modifications must be submitted within 2 hours of checkout by contacting support@novacart.shop.',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#FF5A36] block">
            Customer Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111]">
            We're Always Here To Help
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] max-w-xl mx-auto">
            Have questions about an order, sizing, or capsule releases? Our concierge team responds in under 2 hours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Contact Information & Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold text-[#FF5A36] tracking-wider block mb-1">
                Direct Channels
              </span>
              <h2 className="text-2xl font-black text-[#111111]">
                Reach Out Anytime
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-2 leading-relaxed">
                Connect with our concierge team across multiple channels or review our immediate self-serve FAQ below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#E8E8E8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Email Concierge</h4>
                  <p className="text-xs text-[#737373] mt-0.5">novariyanstudio@gmail.com</p>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    Avg response time: 45 minutes
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#E8E8E8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Toll-Free Phone</h4>
                  <p className="text-xs text-[#737373] mt-0.5">+91-84716282</p>
                  <span className="text-[11px] text-[#737373] block mt-1">
                    Monday–Friday: 8:00 AM – 8:00 PM EST
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white text-[#FF5A36] flex items-center justify-center shrink-0 border border-[#E8E8E8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">Global Logistics HQ</h4>
                  <p className="text-xs text-[#737373] mt-0.5">
                    100 Market St, Suite 400, San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E8E8] shadow-lg">
              <h3 className="text-xl font-black text-[#111111] mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[#737373] mb-6">
                Fill in the details and our support staff will assist you promptly.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[#111111]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#737373] max-w-sm mx-auto">
                    Thank you {name}. A ticket has been created and assigned to our senior specialist. We'll reply to {email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#111111] hover:bg-[#FF5A36] text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs text-[#111111] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs text-[#111111] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={orderNum}
                        onChange={(e) => setOrderNum(e.target.value)}
                        placeholder="e.g. NC-89421"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs text-[#111111] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs text-[#111111] bg-white outline-none"
                      >
                        <option value="Order Inquiry">Order Inquiry</option>
                        <option value="Shipping & Tracking">Shipping & Tracking</option>
                        <option value="Return / Exchange">Return / Exchange</option>
                        <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
                        <option value="Partnership / Wholesale">Partnership / Wholesale</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you today?"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:border-[#111111] text-xs text-[#111111] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#FF5A36] hover:bg-[#FF7048] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-20 pt-16 border-t border-[#E8E8E8] max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold text-[#FF5A36] tracking-wider block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#E8E8E8] rounded-2xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#111111] hover:text-[#FF5A36] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#737373] transition-transform duration-200 ${
                      activeFaq === index ? 'rotate-180 text-[#FF5A36]' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-[#737373] leading-relaxed border-t border-[#E8E8E8] pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
