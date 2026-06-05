function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Extensio.ai</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Build Chrome extensions using plain English. Generate, edit and
              manage your AI-powered extensions easily.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Generator</a></li>
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="mt-4 text-sm text-slate-400">
              Get updates about new features and premium tools.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;