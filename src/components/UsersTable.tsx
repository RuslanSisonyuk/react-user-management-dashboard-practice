import { useState } from "react";
import TableRowActions from "./ui/TableRowActions";
import UserFormDialog from "./ui/UserFormDialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { User } from "@/types/userType";
import { toast } from "sonner";
import { UsersSearchbar } from "./UsersSearchbar";

import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser, sortUsers } from "@/state/users/usersSlice";



export default function UsersTable(){
    const [filterUsersByString, setFilterUsersByString] = useState('');
    const [filterType, setfilterType] = useState('name');
  
    const users = useSelector((state:RootState) => state.usersState.users);
    const dispatch = useDispatch();


    //generates a new uuid for the new user and updates the state with the new entry
    const onSubmitAddUser = (values: User) => {
        dispatch(addUser(values));

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

    //filters out the specified user and passed the result as the new list
    const onSubmitDeleteUser = (values: User) => {
        dispatch(deleteUser(values.id));

        toast("User Data Successfuly Deleted", {
            description: values.name+", "+values.email+", "+values.role
        });
    }
    

    const onClickSortUsers = (sortType:string) => {
        dispatch(sortUsers(sortType));
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
                <UserFormDialog onSubmit={ onSubmitAddUser }/>
            </div>
    
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead onClick={() => onClickSortUsers("id")} className='hover:cursor-pointer'>Id</TableHead>
                    <TableHead onClick={() => onClickSortUsers("name")} className='hover:cursor-pointer'>Name</TableHead>
                    <TableHead onClick={() => onClickSortUsers("email")} className='hover:cursor-pointer'>Email</TableHead>
                    <TableHead onClick={() => onClickSortUsers("role")} className='hover:cursor-pointer'>Role</TableHead>
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
                            <TableRowActions onEdit={ onSubmitUpdateUser } onDelete={ onSubmitDeleteUser } user={user}/> 
                            {/* do these gotta be changed as well? */}
                        </TableRow>)
                }
                </TableBody>
                <TableCaption className='text-xs'>ConnectSphere® ©</TableCaption>
            </Table>
        </div>
    );
} 