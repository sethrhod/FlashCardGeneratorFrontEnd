export default function NavOptions() {
  return (
    <nav className="flex flex-col gap-4 mb-4">
      <h1 className="text-2xl font-black leading-8 text-blue-300">
        <a href="/">AnkiGPT</a>
      </h1>
      <a
        href="/generate"
        className="font-bold text-gray-300 hover:text-blue-300"
      >
        Generate deck
      </a>
    </nav>
  );
}
