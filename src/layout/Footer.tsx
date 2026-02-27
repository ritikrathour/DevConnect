"use client";
import {
  Code2,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
} from "lucide-react";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-emerald-500/20 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(#00ff9533 1px, transparent 1px),
            linear-gradient(90deg, #00ff9533 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Top gradient line */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>

      {/* Gradient orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Code2 className="w-7 h-7 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                dev
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  Connect
                </span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              The ultimate platform for developers to connect, collaborate, and
              build the future together. Join thousands of innovators worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/10 rounded-lg flex items-center justify-center transition-all group"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 rounded-lg flex items-center justify-center transition-all group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 rounded-lg flex items-center justify-center transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/10 rounded-lg flex items-center justify-center transition-all group"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-emerald-400 to-cyan-400 rounded-full"></span>
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-cyan-400 to-blue-400 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-blue-400 to-purple-400 rounded-full"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <p className="flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />{" "}
              by Ritik Rathour
            </p>
            <span className="hidden md:block">•</span>
            <p>© {new Date().getFullYear()} devConnect. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => scrollToTop()}
        className="fixed bottom-6 right-6 w-10 h-10 bg-linear-to-br from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-black" />
      </button>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-400/50 to-transparent"></div>
    </footer>
  );
};
export default Footer;
