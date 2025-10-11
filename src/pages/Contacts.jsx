import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Confetti from 'react-confetti';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formsubmit.co/ajax/tabhi2096@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success === 'true') {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else setStatus('Something went wrong. Please try again.');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Error submitting the form.');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-14 text-[#145c3e]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch with <span className="text-green-800 font-extrabold">PharmaCo</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info Card */}
          <motion.div
            className="space-y-6 bg-white/70 backdrop-blur-md border border-green-200/40 shadow-2xl rounded-2xl p-10 hover:shadow-green-200/50 transition-all duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold text-green-900">📞 Contact Information</h3>
            <p className="text-green-700">Reach out for partnerships, B2B inquiries, or product collaborations.</p>

            <div className="space-y-3 text-green-800">
              <p className="flex items-center gap-3">
                <MdLocationOn className="text-green-600 text-xl" /> Roorkee, Uttarakhand, India
              </p>
              <p className="flex items-center gap-3">
                <MdPhone className="text-green-600 text-xl" /> +91 70378 70311
              </p>
              <p className="flex items-center gap-3">
                <MdEmail className="text-green-600 text-xl" /> 
                <a href="mailto:tabhi2096@gmail.com" className="underline hover:text-green-600">
                  tabhi2096@gmail.com
                </a>
              </p>
            </div>

            {/* Social Links in Cards */}
            <div className="flex gap-4 pt-4">
              <motion.a
                href="https://linkedin.com/in/abhishrestha"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-green-50 rounded-xl shadow hover:bg-green-100 transition"
                whileHover={{ scale: 1.15 }}
              >
                <FaLinkedin className="text-green-700 text-xl" />
              </motion.a>
              <motion.a
                href="https://github.com/abhishrestha"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-green-50 rounded-xl shadow hover:bg-green-100 transition"
                whileHover={{ scale: 1.15 }}
              >
                <FaGithub className="text-green-700 text-xl" />
              </motion.a>
            </div>

            {/* Proof Badges */}
            <div className="flex gap-6 pt-6">
              <motion.img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/ISO_9001-2015.svg/2048px-ISO_9001-2015.svg.png"
                alt="ISO Certified"
                className="h-12 drop-shadow-md"
                whileHover={{ scale: 1.1 }}
              />
              <motion.img
                src="https://www.gmp-compliance.org/files/images/WHO-GMP.png"
                alt="WHO-GMP Certified"
                className="h-12 drop-shadow-md"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md border border-green-200/50 p-10 rounded-2xl shadow-2xl space-y-6 hover:shadow-green-200/40 transition duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            {/* Floating Label Inputs */}
            {['name', 'email'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                />
                <label className="absolute left-3 top-2 text-green-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">
                  {field === 'name' ? 'Name' : 'Email'}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              />
              <label className="absolute left-3 top-2 text-green-700 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-600 peer-focus:text-sm">
                Message
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all"
            >
              Send Message
            </motion.button>

            {status && (
              <motion.p
                className="text-green-700 font-medium mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ {status}
              </motion.p>
            )}
          </motion.form>
        </div>

        {/* Google Maps */}
        <motion.div
          className="mt-16 w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <iframe
            title="PharmaCo Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.3776225053644!2d77.87999981513258!3d29.85426208195159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb396c841cd25%3A0x69ab08a7e9a20ebf!2sRoorkee%2C%20Uttarakhand%2C%20India!5e0!3m2!1sen!2sin!4v1673853081909!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
