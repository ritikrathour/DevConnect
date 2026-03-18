"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "Tech Startup",
    content:
      "devConnect transformed how our team collaborates. Real-time code sharing and seamless communication have doubled our productivity.",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Engineer",
    company: "Fortune 500",
    content:
      "The best platform for remote collaboration. The interface is intuitive, and the performance is outstanding. Highly recommended!",
    rating: 5,
    avatar: "/avatars/marcus.jpg",
  },
  {
    name: "Emily Thompson",
    role: "Lead Developer",
    company: "Agency",
    content:
      "Finally, a platform that understands what developers need. The Git integration is flawless, and the security features give us peace of mind.",
    rating: 5,
    avatar: "/avatars/emily.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* linear background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full"
          >
            <span className="text-sm text-cyan-400 font-semibold">
              Testimonials
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Loved by Developers
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
              Around the World
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See what developers are saying about their experience with
            devConnect.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              whileHover={{ y: -8 }}
              className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="w-12 h-12 text-cyan-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-black font-bold">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover linear border effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Join thousands of satisfied developers
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-black font-bold text-sm"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-400 ml-2">and 50,000+ others</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Testimonials;
