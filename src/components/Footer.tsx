function Footer() {
  return (
    <footer className="py-2 text-sm text-center bg-slate-800 dark:bg-slate-200 text-white transition-all duration-200 ease-in-out">
      <p>&copy;{new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
