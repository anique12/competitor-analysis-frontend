import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarImage } from '../ui/avatar';

const UserCard = () => {
  return (
    <div className="p-3 border mx-4 rounded-sm">
      <div className="flex items-center gap-1">
        <div className="size-9 rounded-full overflow-hidden">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[14px] leading-snug tracking-tighter font-medium">
            Muhammad Abdullah
          </h1>
          <p className="text-gray-400 leading-snug tracking-tight text-[12px]">
            abdullahaha101@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
