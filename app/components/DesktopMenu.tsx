export default function DesktopMenu() {
  const menuItems = ["About", "Menu", "Access", "Contact"];

  return (
    <ul className="hidden md:flex gap-8">
      {menuItems.map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase()}`}
            className="hover:text-white hover:bg-accent px-4 py-2 rounded transition-all duration-300"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
