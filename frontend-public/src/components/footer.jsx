import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Left - Branding */}
        <div>
          <h2 className="text-lg font-semibold"><a href="/">StayEase</a></h2>
          <p className="text-sm text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Middle - Navigation */}
        <div className="flex flex-col gap-2">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/hotels" className="hover:underline">Hotels</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>

        {/* Right - Socials */}
        <div className="flex justify-center md:justify-end gap-6">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-blue-400">Facebook</a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-pink-400">Instagram</a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer" className="hover:text-sky-400">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
