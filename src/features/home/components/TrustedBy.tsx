"use client";

import { motion } from "framer-motion";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Tesla",
  "Stripe",
];

const TrustedBy = () => {
  return (
    <section className="relative py-10 border-y border-white/5 bg-white/2 overflow-x-hidden w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            Trusted by developers at
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...companies, ...companies, ...companies].map(
              (company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="shrink-0 text-2xl font-bold text-gray-600 hover:text-emerald-400 transition-colors"
                >
                  {company}
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
