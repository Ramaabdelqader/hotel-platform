export default function Contact() {
  return (
    <section className="relative bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need help with your booking? Our team is here to
            assist you anytime.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-2">
                Our support team is available 24/7 to help you with inquiries,
                bookings, and more.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a
                    href="tel:+123456789"
                    className="text-blue-600 hover:underline"
                  >
                    +1 (234) 567-89
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:support@hotelbooking.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@hotelbooking.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Address:</span> 123 Main
                  Street, Amman, Jordan
                </li>
              </ul>
            </div>

            {/* Map (optional static embed) */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="HotelBooking Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.9774178592166!2d35.930359!3d31.963158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca08efc1ab6a7%3A0x67e496e7b8b3f7a5!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1695829045875!5m2!1sen!2sjo"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
