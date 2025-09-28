export default function About() {
  return (
    <section className="relative bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-myColor">StayEase</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted platform for finding and booking the perfect stay,
            whether it’s a luxury resort, a cozy boutique hotel, or a quick
            budget-friendly stopover.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="/AboutImage.png"
              alt="Luxury hotel"
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl" />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At <span className="font-semibold">HotelBooking</span>, we believe
              travel should be simple, accessible, and inspiring. Our mission is
              to connect travelers with the stays that matter most — offering
              comfort, convenience, and unforgettable experiences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                Easy search and booking with real-time availability.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                Wide range of hotels: luxury, boutique, and budget.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                Trusted by thousands of travelers worldwide.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                Dedicated to secure and seamless booking experiences.
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="/hotels"
            className="inline-block px-8 py-4 bg-myColor text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-hoverColor transition"
          >
            Explore Hotels
          </a>
        </div>
      </div>
    </section>
  );
}
