


import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <header className="px-6 py-4">
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          className="w-100 h-100 object-contain"
        />
      </a>
    </header>
  );
}
