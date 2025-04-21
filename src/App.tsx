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
import { user,userSchema } from './types/userType';
import TableRowActions from './components/ui/TableRowActions';


function App() {
  const [users, setUsers] = useState<user[]>([]);


  //check users validation on page load
  useEffect(()=>{
    setUsers(usersJson.filter((user)=>{
      const result = userSchema.safeParse(user);
      if(result.success){
        return user;
      }
    }));
  },[]);



  const onSubmitAddUser = (values: user) => {
    let randomUserId = crypto.randomUUID();
    setUsers([...users,{...values,id:randomUserId}]);
  }

  const onSubmitUpdateUser = (values: user) => {
    let tempUsers = users;
    let index = tempUsers.findIndex(user => user.id == values.id);
    tempUsers[index].id = values.id;
    tempUsers[index].name = values.name;
    tempUsers[index].email = values.email;
    tempUsers[index].role = values.role;
    setUsers([...tempUsers]);
  }

  const onSubmitDeleteUser = (values: user) => {
    setUsers(users.filter((user) => { return user.id !== values.id; }));
  }

  return(
    <>
    <Navbar/>
    
    <div className='flex flex-col px-9'>
      <div className='flex flex-row'>
        <UserFormDialog onSubmit={onSubmitAddUser}/>
      </div>

      <Table>
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
          {users.map(user=>{
            return(<TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableRowActions onEdit={onSubmitUpdateUser} onDelete={onSubmitDeleteUser} user={user}/>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>
  </>
  );
}

export default App
