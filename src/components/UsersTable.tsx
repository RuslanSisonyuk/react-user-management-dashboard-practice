import { useState } from "react";
import TableRowActions from "./ui/TableRowActions";
import UserFormDialog from "./ui/UserFormDialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { User } from "@/types/userType";
import { UsersSearchbar } from "./UsersSearchbar";

import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, sortUsers, updateUser } from "@/state/users/usersSlice";
import { toast } from "sonner";



export default function UsersTable(){
    const [filterUsersByString, setFilterUsersByString] = useState('');
    const [filterType, setfilterType] = useState('name');
  
    const users = useSelector((state:RootState) => state.usersState.users);
    const dispatch = useDispatch();
    
    const onSubmitAddUser = (values: User) => {
        let randomUserId = crypto.randomUUID();
        dispatch(addUser({ ...values, id:randomUserId }));

        toast("New User Data Successfuly Added", {
            description: values.name+", "+values.email+", "+values.role
        });
    }

    const onSubmitUpdateUser = (values: User) => {
        dispatch(updateUser(values));

        toast("User Data Successfuly Changed", {
            description: values.name+", "+values.email+", "+values.role
        });
    }

    const onSubmitDeleteUser = (values: User) => {
        dispatch(deleteUser(values.id));

        toast("User Data Successfuly Deleted", {
            description: values.name+", "+values.email+", "+values.role
        });
    }

    // Checks if provided user's property (name or email based on filter type) starts with string inputed by user 
    const isUserStartsWithFilterString = (user:User) => {
        return filterType == "Email" ? user.email.toLowerCase().startsWith(filterUsersByString.toLowerCase()) 
        : user.name.toLowerCase().startsWith(filterUsersByString.toLowerCase());
    }
      
    return(
        <div className='flex flex-col px-9'>
            <div className='flex flex-row w-full max-w-[1000px] gap-[15px]'>
                <UsersSearchbar filterValue={filterUsersByString} setFilterValue={setFilterUsersByString} setFilterType={setfilterType}/>
                <UserFormDialog type="ADD" onSubmit={onSubmitAddUser}/>
            </div>
    
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead onClick={() => dispatch(sortUsers("id"))} className='hover:cursor-pointer'>Id</TableHead>
                    <TableHead onClick={() => dispatch(sortUsers("name"))} className='hover:cursor-pointer'>Name</TableHead>
                    <TableHead onClick={() => dispatch(sortUsers("email"))} className='hover:cursor-pointer'>Email</TableHead>
                    <TableHead onClick={() => dispatch(sortUsers("role"))} className='hover:cursor-pointer'>Role</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody  className='max-sm:text-[0.8rem]'>
                {users.filter(user => isUserStartsWithFilterString(user)).map(user=>
                        <TableRow key={user.id}>
                            <TableCell className="overflow-x-auto max-sm:max-w-[60px]">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableRowActions user={user} onEdit={onSubmitUpdateUser} onDelete={onSubmitDeleteUser}/>
                        </TableRow>)
                }
                </TableBody>
                <TableCaption className='text-xs'>ConnectSphere® ©</TableCaption>
            </Table>
        </div>
    );
} 