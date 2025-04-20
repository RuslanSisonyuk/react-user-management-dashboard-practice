import { TableCell } from './table';
import { Button } from './button';
import UserFormDialog from './UserFormDialog';
import { user } from '@/types/userType';
import { useState } from 'react';

//props interface
interface rowProps{
    userUpdater: (values: user) => void;
    user:user;
}

export default function TableRowActions(props:rowProps){
    const [isOpen,setOpen] = useState(false);

    return(
        <TableCell>
            <Button variant="ghost" size="icon">
                <img src="src/assets/icons/dotsIcon.png" alt="Actions" className='size-[20px]'/>
            </Button>
            <div className='flex flex-col absolute bottom-[-15] right-0 z-10 rounded-[3px] bg-[#f0f0f0] p-2'>
                <UserFormDialog onSubmit={props.userUpdater} userAttributes={props.user} type='edit'/>
                <Button variant="destructive" size="sm">Delete</Button>
            </div>
        </TableCell>
    )
}

//получает польз. и функцию