import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 h-[5%]">
      <div className="container flex justify-between items-center h-full">
        <div className="text-white text-lg font-semibold">Set Status</div>
        <div className="space-x-4 flex">
          <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Contact
          </a>
          <div className="mt-0.5">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
