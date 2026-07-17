export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-8 px-6 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#E2E8F0]/60">
        <p>© {new Date().getFullYear()} IDEAS X LUXE. All rights reserved.</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">
            Privacy
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
}