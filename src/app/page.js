import Link from "next/link";

export default function Homepage() {
  return (
    <main>
      <nav className="flex items-center justify-between bg-linear-to-b from-gray-400 via-white to-gray-300 via-60% p-4 border border-gray-300">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-orange-500">🏢</span>
          <span className="text-blue-600 hover:text-orange-600 transition">
            VC
          </span>
          <span className="text-orange-500">Builder</span>
        </div>

        <ul className="flex items-center gap-x-9 text-orange-700 font-medium">
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Features
            </a>
          </li>
          <li className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">
            <span className="text-gray-600">🔍</span>
            <input
              type="text"
              placeholder="3D web design"
              className="outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </li>
        </ul>
        <button className="text-2xl text-orange-700 skew-y-4 hover:text-blue-600 hover:skew-y-0 border  p-0.5 rounded-lg bg-white hover:bg-slate-300 outline-none px-4">
          Login
        </button>
      </nav>
      {/* idhar hai hero section  */}
      <section className="w-full bg-linear-to-b from-gray-300 via-white to-blue-200 py-20 px-6 m-0.5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* LEFT TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Build Beautiful Pages
              <span className="text-orange-600"> Instantly</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg md:w-4/5">
              A ready to build Web builder which give variety of design .
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-green-600 transition">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-orange-600 text-orange-700 rounded-md hover:border-green-600 hover:text-green-600 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT: IMAGE + VIDEO */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
            {/* IMAGE */}
            {/* <div className="w-72 h-72 md:w-96 md:h-96 rounded-xl bg-linear-to-b from-orange-300 via-yellow-200 to-green-200 shadow-xl overflow-hidden">
              <Image
                src="/web.jpg"
                alt="Hero Image"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div> */}

            {/* VIDEO (infinite autoplay + same size) */}
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-xl shadow-xl overflow-hidden">
              <video
                src="/web1.mp4" // 🔥 apna video yahan daalna
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* idhar content section
       */}

      {/* idhar footer  */}
      <footer className="w-full bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4 text-xl">
                <Link href="https://instagram.com" className="hover:text-white">
                  📸
                </Link>
                <Link href="https://twitter.com" className="hover:text-white">
                  🐦
                </Link>
                <Link href="https://facebook.com" className="hover:text-white">
                  📘
                </Link>
                <Link href="https://youtube.com" className="hover:text-white">
                  ▶️
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 my-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-gray-400">
              © {2025} VedantaCore. All rights reserved.
            </p>

            <p className="mt-3 md:mt-0">Built with VCBuilder.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
