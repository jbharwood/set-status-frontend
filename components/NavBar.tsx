export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 h-[5%]">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="text-white text-lg font-semibold">Set Status</div>
        <div className="space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
