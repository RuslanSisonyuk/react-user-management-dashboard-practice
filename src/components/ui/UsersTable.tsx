import { useState } from "react";
import TableRowActions from "./TableRowActions";
import UserFormDialog from "./UserFormDialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { user } from "@/types/userType";
import { toast } from "sonner";
import { UsersSearchbar } from "../UsersSearchbar";


interface UserTableProps{
    passedUsers: user[]
}

export default function UsersTable({ passedUsers } : UserTableProps){
    const [users, setUsers] = useState<user[]>(passedUsers);
    const [filterUsersByString, setFilterUsersByString] = useState('');
    const [filterType, setfilterType] = useState('name');
  
  
    //generates a new uuid for the new user and updates the state with the new entry
    const onSubmitAddUser = (values: user) => {
        let randomUserId = crypto.randomUUID();
        setUsers([...users,{...values,id:randomUserId}]);

        toast("New User Data Successfuly Added", {
            description: values.name+", "+values.email+", "+values.role
        });
    }

    const onSubmitUpdateUser = (values: user) => {
        setUsers(prevUsers => {
            let index = prevUsers.findIndex(user => user.id == values.id);    //finds index of the passed user, maps the array of objects, returning the users and a new user object with the passed values instead of the old object
            return prevUsers.map((user,i) => {
            if(i !== index) return user;

            return {...user, id:values.id, name:values.name, email:values.email, role:values.role};
            });
        });
    
        toast("User Data Successfuly Changed", {
            description: values.name+", "+values.email+", "+values.role
        });
    }

    //filters out the specified user and passed the result as the new list
    const onSubmitDeleteUser = (values: user) => {
        setUsers(users.filter((user) => { return user.id !== values.id; }));

        toast("User Data Successfuly Deleted", {
            description: values.name+", "+values.email+", "+values.role
        });
    }
    

    const sortUsers = (sortType:string) => {
        setUsers(prevUsers => {
            return [...prevUsers].sort((a,b) => {
              if(sortType==="id")
                return a.id.localeCompare(b.id);
              if(sortType==="name")
                return a.name.localeCompare(b.name);
              if(sortType==="email")
                return a.email.localeCompare(b.email);
              if(sortType==="role")
                return a.role.localeCompare(b.role);
              return a.name.localeCompare(b.name);
            });
          }
        );
    }
    
    const filterUser = (user:user) => {
        if(filterType == "Email")
            return user.email.toLowerCase().startsWith(filterUsersByString.toLowerCase());
        return user.name.toLowerCase().startsWith(filterUsersByString.toLowerCase());
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
                    <TableHead onClick={() => sortUsers("id")} className='hover:cursor-pointer'>Id</TableHead>
                    <TableHead onClick={() => sortUsers("name")} className='hover:cursor-pointer'>Name</TableHead>
                    <TableHead onClick={() => sortUsers("email")} className='hover:cursor-pointer'>Email</TableHead>
                    <TableHead onClick={() => sortUsers("role")} className='hover:cursor-pointer'>Role</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody  className='max-sm:text-[0.8rem]'>
                {users.filter(user => { return filterUser(user) }).map(user=>{
                    return(
                        <TableRow key={user.id}>
                            <TableCell className="overflow-x-auto max-sm:max-w-[60px]">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableRowActions onEdit={ onSubmitUpdateUser } onDelete={ onSubmitDeleteUser } user={user}/>
                        </TableRow>);
                })}
                </TableBody>
                <TableCaption className='text-xs'>ConnectSphere® ©</TableCaption>
            </Table>
        </div>
    );
} 