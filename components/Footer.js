import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section - Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold tracking-wide">
              Tipu Sultan
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex gap-8">
            <a
              href="https://github.com/Tipu-Sultan?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition-all duration-300"
            >
              <Github/>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tipu-sultan-47b4221b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition-all duration-300"
            >
              <Linkedin/>
              LinkedIn
            </a>
            <a
              href="https://instagram.com/pathan__sultan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition-all duration-300"
            >
              <Instagram/>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}