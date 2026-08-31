export default function Footer() {
  return (
    <footer className="bg-[#090909] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Futé Services</p>
        <p>Build what moves people.</p>
      </div>
    </footer>
  );
}
