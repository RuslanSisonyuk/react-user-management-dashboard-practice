import { TableCell } from './table';
import { Button } from './button';
import UserFormDialog from './UserFormDialog';
import { user } from '@/types/userType';
import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';

interface rowProps{
    onEdit: (values: user) => void;
    onDelete: (values: user) => void;
    user:user;
}

export default function TableRowActions(props:rowProps){
    const [isOpen,setOpen] = useState(false);
    const dropdownRef = useClickOutside<HTMLDivElement>(() => {
        setOpen(false);
    });

    return(
        <TableCell>
            <Button variant="ghost" size="icon" onClick={()=>setOpen(!isOpen)}>
                <img src="/assets/icons/dotsIcon.png" alt="Actions" className='size-[20px]'/>
            </Button>
            {/* when isOpen state is set to true, sets the Row Actions to be visible, else hides it */}
            <div ref={dropdownRef} className={ isOpen ? 'flex flex-col absolute bottom-[-15] right-0 z-10 rounded-[3px] bg-[#f0f0f0] p-2' : 'hidden' }> 
                <UserFormDialog onSubmit={props.onEdit} userAttributes={props.user} type='EDIT'/>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="destructive" size="sm">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent >
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={ ()=>props.onDelete(props.user) }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </TableCell>
    )
}