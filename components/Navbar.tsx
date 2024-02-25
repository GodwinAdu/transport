
import Image from 'next/image';
import NavLinks from './NavLinks';
import { currentProfile } from '@/lib/helpers/current-profile';

const Navbar = async () => {
  const user = await currentProfile();
  
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-2 border-b shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <div className="h-12 w-12">
            <Image 
                src="/logo.png"
                height={100}
                width={100}
                alt="logo"
             />
          </div>
        </div>
        <div>

          <div className="flex gap-3">
          <NavLinks user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
