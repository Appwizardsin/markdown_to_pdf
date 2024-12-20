"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }
    `}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              MD2PDF
            </span>
          </Link>

          {/* Navigation - only essential links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/convert"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Start Converting
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-100/20 to-blue-100/20 dark:from-purple-900/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 group-hover:opacity-90 transition-opacity">
                MD2PDF
              </span>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm">
              Transform your markdown documents into beautifully formatted PDFs with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#how-it-works">How It Works</FooterLink>
            <FooterLink href="/convert" className="relative">
              <span className="relative inline-flex">
                Try Now
                <span className="flex absolute h-2 w-2 top-0 right-0 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              </span>
            </FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} MD2PDF. Made with 💜 for the community.
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Free and Open Source
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Update the FooterLink component
function FooterLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`
        px-4 py-2 text-gray-600 dark:text-gray-400 
        hover:text-blue-600 dark:hover:text-blue-400 
        transition-colors duration-200 rounded-full
        hover:bg-blue-50 dark:hover:bg-blue-900/20
        ${className}
      `}
    >
      {children}
    </a>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-24 pb-20 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div
              className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/30 to-purple-100/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left animate-fadeIn">
              <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  ✨ Simple & Powerful
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight">
                Transform Your Markdown to Beautiful PDFs
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                A powerful, free tool to convert your Markdown documents into
                professionally formatted PDFs. Perfect for documentation,
                reports, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/convert"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Converting →
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative hidden lg:block animate-fadeIn">
              <div className="relative">
                {/* Browser mockup */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform perspective-1000 rotate-y-[-8deg] rotate-z-2">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-6"></div>
                  </div>
                  <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 p-4 h-full">
                      <div className="space-y-3">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-2xl shadow-lg animate-float"></div>
                <div className="absolute -bottom-12 -left-8 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full shadow-lg animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100/40 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp delay-100">
            <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                🎯 Everything You Need
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Powerful Features for Your Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to transform your markdown documents into
              professional PDFs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="animate-fadeInUp delay-100">
              <EnhancedFeatureCard
                icon="👁️"
                title="Live Preview"
                description="See your markdown rendered in real-time as you type, ensuring your document looks perfect before conversion."
                highlights={[
                  "Real-time rendering",
                  "Side-by-side view",
                  "Instant feedback",
                ]}
              />
            </div>

            <div className="animate-fadeInUp delay-200">
              <EnhancedFeatureCard
                icon="✨"
                title="Rich Formatting"
                description="Support for headers, lists, code blocks, blockquotes, images, and more - all beautifully formatted in your PDF."
                highlights={[
                  "Markdown syntax",
                  "Code highlighting",
                  "Image support",
                ]}
              />
            </div>

            <div className="animate-fadeInUp delay-300">
              <EnhancedFeatureCard
                icon="🚀"
                title="Easy Export"
                description="Convert and download your PDF with a single click. No sign-up required, completely free to use."
                highlights={[
                  "One-click export",
                  "Free to use",
                  "No registration",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp delay-100">
            <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                🎯 Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Convert your markdown to PDF in three simple steps
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/30 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="animate-fadeInUp delay-100">
                <EnhancedStep
                  number="1"
                  title="Write or Paste"
                  description="Enter your markdown content or paste it from another source"
                  icon="✍️"
                />
              </div>

              <div className="animate-fadeInUp delay-200">
                <EnhancedStep
                  number="2"
                  title="Preview"
                  description="Check the live preview to ensure everything looks correct"
                  icon="👁️"
                />
              </div>

              <div className="animate-fadeInUp delay-300">
                <EnhancedStep
                  number="3"
                  title="Download"
                  description="Click the download button to get your beautifully formatted PDF"
                  icon="⬇️"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                💝 User Love
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Loved by Content Creators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their
              markdown documents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              name="Sarah Johnson"
              role="Technical Writer"
              image="https://randomuser.me/api/portraits/women/1.jpg"
              content="This tool has completely transformed my documentation workflow. The live preview and instant PDF generation save me hours every week."
            />
            <TestimonialCard
              name="Michael Chen"
              role="Software Developer"
              image="https://randomuser.me/api/portraits/men/2.jpg"
              content="The code block formatting is perfect for technical documentation. I use it for all my project documentation now."
              featured={true}
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Content Manager"
              image="https://randomuser.me/api/portraits/women/3.jpg"
              content="Simple, fast, and reliable. The export quality is exceptional, and it handles complex markdown perfectly."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{ opacity: 0.1 }}
        ></div>

        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 py-24 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-white/90 font-semibold">
                  ⚡️ No Sign-up Required
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your{" "}
                <span className="relative">
                  <span className="relative z-10">Documents?</span>
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-blue-400/20 -rotate-1"></span>
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Join thousands of users who trust our tool for their markdown to
                PDF conversion needs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/convert"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
                >
                  Try It Now - It's Free!
                  <svg
                    className="ml-2 -mr-1 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Learn More
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-12 mt-12 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                  <TrustItem number="10k+" label="Users" />
                  <TrustItem number="50k+" label="Conversions" />
                  <TrustItem number="4.9/5" label="Rating" />
                  <TrustItem number="100%" label="Free" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function EnhancedFeatureCard({ icon, title, description, highlights }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-xl opacity-50"></div>
        <div className="relative text-4xl mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl shadow-inner">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

      {/* Highlights */}
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <svg
              className="w-4 h-4 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EnhancedStep({ number, title, description, icon }) {
  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative group z-10 hover:scale-105">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Number badge */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
          {number}
        </div>

        {/* Icon with gradient background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-xl opacity-50"></div>
          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl shadow-inner flex items-center justify-center">
            <span className="text-3xl">{icon}</span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        {/* Decorative arrow for desktop */}
        {number !== "3" && (
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 hidden md:block text-gray-300 dark:text-gray-600 text-2xl">
            →
          </div>
        )}
      </div>
    </div>
  );
}

function TrustItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-white mb-1">{number}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

function TestimonialCard({ name, role, image, content, featured = false }) {
  return (
    <div
      className={`
      relative p-8 rounded-2xl transition-all duration-300 animate-fadeInUp
      ${
        featured
          ? "bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-xl scale-105"
          : "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl"
      }
    `}
    >
      {/* Quote mark */}
      <div
        className={`
        absolute top-4 right-4 text-6xl leading-none
        ${featured ? "text-white/20" : "text-gray-200 dark:text-gray-700"}
      `}
      >
        "
      </div>

      {/* Content */}
      <div className="relative">
        <p
          className={`
          mb-6 text-lg
          ${featured ? "text-white/90" : "text-gray-600 dark:text-gray-300"}
        `}
        >
          {content}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div
              className={`
              font-semibold
              ${featured ? "text-white" : "text-gray-900 dark:text-white"}
            `}
            >
              {name}
            </div>
            <div
              className={`
              text-sm
              ${featured ? "text-white/70" : "text-gray-500 dark:text-gray-400"}
            `}
            >
              {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
