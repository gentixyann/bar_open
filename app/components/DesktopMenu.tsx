export default function DesktopMenu() {
  const menuItems = ["About", "Menu", "Access", "Contact"];

  return (
    <ul className="hidden md:flex gap-8">
      {menuItems.map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase()}`}
            className="font-motor tracking-widest text-foreground hover:text-accent transition-colors duration-300 px-4 py-2 rounded border border-transparent hover:border-accent"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
