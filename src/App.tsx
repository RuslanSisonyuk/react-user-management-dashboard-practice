import { useEffect, useState } from 'react';
import './App.css';
import usersJson from './data/users.json';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'; 
import Navbar from './components/ui/Navbar';
import UserFormDialog from './components/ui/UserFormDialog';
import {user} from './types/userType';
import TableRowActions from './components/ui/TableRowActions';


function App() {
  const [users, setUsers] = useState<user[]>(usersJson);

  let test:user = {id:"",name:"",email:"",role:""};  

  const onSubmitAddUser = (values: user) => {
    let randomUserId = crypto.randomUUID();
    setUsers([...users,{...values,id:randomUserId}]);
  }

  useEffect(()=>{
    localStorage.setItem("users",JSON.stringify(users));
  },[users]);

  const updateUser = (values: user) => {
    let tempUsers = users;
    let index = tempUsers.findIndex(user => user.id == values.id);
    tempUsers[index].id = values.id;
    tempUsers[index].name = values.name;
    tempUsers[index].email = values.email;
    tempUsers[index].role = values.role;
    setUsers([...tempUsers]);
  }

  return(
    <>
    <Navbar/>

    <div className='flex flex-col px-9'>
      <div className='flex flex-row'>
        <UserFormDialog onSubmit={onSubmitAddUser} userAttributes={test} type='add'/>
      </div>

      <Table>
        <TableCaption>My table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={users[1].id}>
              <TableCell>{users[1].id}</TableCell>
              <TableCell>{users[1].name}</TableCell>
              <TableCell>{users[1].email}</TableCell>
              <TableCell>{users[1].role}</TableCell>
              <TableRowActions userUpdater={updateUser} user={users[1]}/>
          </TableRow>
          {users.map(user=>{
            return(<TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <img src="src/assets/icons/dotsIcon.png" alt="Actions" className='size-[20px] cursor-pointer'/>
                </Button>
              {/* <div className='flex flex-col absolute bottom-[-15] right-0 z-10 rounded-sm bg-[#f0f0f0] p-1'>
                <Button variant="secondary">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div> */}
              </TableCell>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>
  </>
  );
}

export default App
