"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  {
    value: 50,
    suffix: "K+",
    label: "Active Developers",
  },
  {
    value: 120,
    suffix: "K+",
    label: "Projects Created",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
  },
  {
    value: 45,
    suffix: "+",
    label: "Countries",
  },
];

function Counter({
  value,
  suffix,
  prefix = "",
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [rounded, suffix, prefix]);

  return <span ref={ref}>0{suffix}</span>;
}

const Stats = () => {
  return (
    <section className="relative py-10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-linear(circle, #00ff95 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Trusted by Developers
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join a thriving community of developers who are building the future
            together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-linear-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl backdrop-blur-sm w-full"
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </motion.div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center gap-8 p-6 bg-linear-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl backdrop-blur-sm">
            <div className="text-left">
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-left">
              <div className="text-3xl font-bold text-cyan-400 mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-left">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                &lt;100ms
              </div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Stats;
