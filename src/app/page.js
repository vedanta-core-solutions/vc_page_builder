"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    team: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        projects: 320,
        clients: 150,
        awards: 25,
        team: 45,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "📋" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "features", label: "Features", icon: "✨" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "testimonials", label: "Testimonials", icon: "💬" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setSidebarOpen(false);
    }
  };

  return (
    <main className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}
      >
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-linear-to-b from-blue-500 to-gray-400 text-white shadow-xl`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto ">
            <div className="flex items-center justify-between mb-8 p-2">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span>🏢 VC</span>
                <span className="text-orange-400">Builder</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="space-y-2 font-medium">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center p-2 rounded-lg w-full transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm mb-4">Our support team is available 24/7</p>
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-md transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Navigation */}
        <nav
          className={`sticky top-0 z-20 transition-all duration-300 bg-linear-b from-blue-600 to-gray-300 ${
            scrolled
              ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg"
              : " bg-linear-to-b from-blue-500 to-gray-400 "
          } `}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-black hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 text-2xl font-semibold">
                <span className="text-orange-400">🏢</span>
                <span
                  className={`${
                    scrolled
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-blue-900"
                  } hover:text-orange-400 transition`}
                >
                  VC
                </span>
                <span className="text-orange-400">Builder</span>
              </div>
            </div>

            <ul className="hidden md:flex items-center gap-x-6 text-white font-medium">
              <li>
                <a href="#home" className="hover:text-orange-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-orange-400 transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-orange-400 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition">
                  Contact
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full outline">
                <span className="text-white">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent text-blue-900 placeholder:text-white/70 text-sm"
                />
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-white hover:text-orange-400 transition"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button className="hidden md:block px-4 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-red-600 dark:text-white leading-tight mb-6">
                Build Beautiful Pages
                <span className="text-transparent bg-clip-text bg-linear-to-b from-blue-500 to-blue-900">
                  {" "}
                  Instantly
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 md:w-4/5">
                A revolutionary web builder that empowers you to create
                stunning, professional websites with ease. No coding required,
                just your creativity.
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
                <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  Get Started
                </button>

                <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-200">
                  Learn More
                </button>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-8">
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    10K+
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Users
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    50+
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Templates
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    24/7
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Support
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center z-10">
              <div className="relative w-80 h-96 md:w-96 md:h-[200px]">
                <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-yellow-200 rounded-full opacity-20 blur-2xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/retail.png"
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                About VCBuilder
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're on a mission to democratize web development by providing
                powerful tools that anyone can use to create professional
                websites.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  🚀
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Fast & Efficient
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build websites in minutes, not hours. Our optimized tools
                  ensure your site loads lightning fast.
                </p>
              </div>

              <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  🎨
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Beautiful Designs
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from dozens of professionally designed templates that
                  look great on all devices.
                </p>
              </div>

              <div className="bg-linear-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  ⚙️
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Powerful Features
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From e-commerce to booking systems, our platform has all the
                  features you need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We offer a comprehensive range of services to help you establish
                and grow your online presence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Design",
                  icon: "🎨",
                  description:
                    "Stunning, responsive designs that capture your brand's essence and engage your audience.",
                },
                {
                  title: "Development",
                  icon: "💻",
                  description:
                    "Clean, efficient code that ensures your website performs flawlessly across all platforms.",
                },
                {
                  title: "E-commerce",
                  icon: "🛒",
                  description:
                    "Complete online stores with payment integration, inventory management, and more.",
                },
                {
                  title: "SEO Optimization",
                  icon: "🔍",
                  description:
                    "Improve your search rankings and drive organic traffic to your website.",
                },
                {
                  title: "Content Creation",
                  icon: "✍️",
                  description:
                    "Compelling copy and visuals that tell your story and connect with your audience.",
                },
                {
                  title: "Hosting & Support",
                  icon: "🛠️",
                  description:
                    "Reliable hosting and ongoing support to keep your website running smoothly.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Amazing Features
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover the powerful features that make VCBuilder the best
                choice for your web development needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  {[
                    {
                      title: "Drag & Drop Builder",
                      description:
                        "Create beautiful pages with our intuitive drag and drop interface. No coding required.",
                    },
                    {
                      title: "Responsive Design",
                      description:
                        "Your website will look perfect on all devices, from desktop to mobile.",
                    },
                    {
                      title: "SEO Tools",
                      description:
                        "Built-in SEO tools to help your website rank higher in search results.",
                    },
                    {
                      title: "Analytics Dashboard",
                      description:
                        "Track your website's performance with our comprehensive analytics dashboard.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        <span className="text-xl">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="hover:bg-yellow-300 relative bg-linear-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 shadow-xl skew-y-4 hover:skew-y-0">
                  <Image
                    src="/girl.jpeg"
                    alt="Features"
                    width={500}
                    height={400}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Our Portfolio
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Take a look at some of the amazing websites we've built for our
                clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Store",
                  category: "Online Shop",
                  image: "/ecomm.jpg",
                },
                {
                  title: "Corporate Website",
                  category: "Business",
                  image: "/corporate.jpg",
                },
                {
                  title: "Restaurant Site",
                  category: "Food & Drink",
                  image: "/restaurant.jpg",
                },
                {
                  title: "Travel Agency",
                  category: "Tourism",
                  image: "/travel.jpg",
                },
                {
                  title: "Tech Startup",
                  category: "Technology",
                  image: "/startup.jpg",
                },
                {
                  title: "Creative Portfolio",
                  category: "Design",
                  image: "/portfolio.jpg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-sm">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section
          id="testimonials"
          className="py-20 px-6 bg-white dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our satisfied
                clients have to say about working with us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                  content:
                    "VCBuilder transformed our online presence. Our new website has increased conversions by 40% in just two months.",
                  avatar: "/testimonial-1.jpg",
                },
                {
                  name: "Michael Chen",
                  role: "Restaurant Owner",
                  content:
                    "I never thought I could have such a professional website without knowing how to code. VCBuilder made it possible!",
                  avatar: "/testimonial-2.jpg",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Freelance Designer",
                  content:
                    "The drag and drop interface is incredibly intuitive. I can now create beautiful websites for my clients in half the time.",
                  avatar: "/testimonial-3.jpg",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Statistics Section */}
        <section className="py-20 px-6 bg-linear-to-b from-blue-900 to-gray-300">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counters.projects}+
                </p>
                <p className="text-indigo-200">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counters.clients}+
                </p>
                <p className="text-indigo-200">Happy Clients</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counters.awards}+
                </p>
                <p className="text-indigo-200">Awards Won</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counters.team}+
                </p>
                <p className="text-indigo-200">Team Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Choose the plan that best fits your needs. All plans include our
                core features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Perfect for small projects
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">
                    $00
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      5 Pages
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Basic Templates
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Email Support
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">✗</span>
                    <span className="text-gray-400">Custom Domain</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">✗</span>
                    <span className="text-gray-400">Advanced Analytics</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-colors">
                  Choose Plan
                </button>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl p-8 transform scale-105">
                <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold inline-block px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-indigo-200 mb-6">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$19.99</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white">Unlimited Pages</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white">Premium Templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white">Priority Support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white">Custom Domain</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white">Advanced Analytics</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition-colors font-semibold">
                  Choose Plan
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  VCore
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For large organizations
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">
                    $49.99
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Unlimited Everything
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Custom Templates
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Dedicated Support
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      White Label Options
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      API Access
                    </span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-colors">
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 px-6 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our talented team is dedicated to helping you create amazing
                websites.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Founder",
                  bio: "Visionary leader with 15+ years of experience in web development.",
                  image: "/ceo.jpg",
                },
                {
                  name: "John Williams",
                  role: "Head of Design",
                  bio: "Creative genius with an eye for beautiful, functional design.",
                  image: "/man1.jpg",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Developer",
                  bio: "Full-stack wizard who turns complex problems into elegant solutions.",
                  image: "/man2.jpg",
                },
                {
                  name: "Omi Rodriguez",
                  role: "Marketing Director",
                  bio: "Strategic thinker who helps our clients reach their audience.",
                  image: "/man3.jpg",
                },
              ].map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 overflow-hidden rounded-full mx-auto w-32 h-32">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Latest From Our Blog
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Stay up to date with the latest trends in web design and
                development.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "10 Web Design Trends for 2025",
                  excerpt:
                    "Discover the latest trends that will shape the web design landscape this year.",
                  date: "March 15, 2025",
                  image: "/startup.jpg",
                },
                {
                  title: "How to Optimize Your Website for Speed",
                  excerpt:
                    "Learn the techniques to make your website load faster and improve user experience.",
                  date: "March 10, 2025",
                  image: "/travel.jpg",
                },
                {
                  title: "The Future of E-commerce",
                  excerpt:
                    "Explore the emerging technologies that will transform online shopping in the coming years.",
                  date: "March 5, 2025",
                  image: "/ecomm.jpg",
                },
              ].map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                      {post.date}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <a
                      href="#"
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-6 bg-linear-to-r from-indigo-400 to-red-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-indigo-200 mb-8">
              Subscribe to our newsletter for the latest updates, tips, and
              exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white border border-blue-800"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Have a question or want to start a project? We'd love to hear
                from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Address
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Bafna House ,401404
                        <br />
                        Palghar MH
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Phone
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        (+91)-1234567890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Email
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        info@vcbuilder.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Follow Us
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Company
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#team"
                      className="hover:text-white transition-colors"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#blog"
                      className="hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Services
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      Web Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      E-commerce
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      SEO
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 my-6"></div>

            <div className="flex flex-col md:flex-row items-center justify-between text-sm">
              <p className="text-gray-400">
                © {new Date().getFullYear()} VedantaCore. All rights reserved.
              </p>

              <div className="flex items-center gap-4 mt-3 md:mt-0">
                <p>Built with ❤️ by VCBuilder</p>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
