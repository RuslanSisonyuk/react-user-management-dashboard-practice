import { useEffect, useState } from 'react';
import './App.css';
import usersJson from './data/users.json';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import Navbar from './components/ui/Navbar';
import UserFormDialog from './components/ui/UserFormDialog';
import { user,userSchema } from './types/userType';
import TableRowActions from './components/ui/TableRowActions';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';


function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [inputValue, setInputValue] = useState('');

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
    // bro is mutating the fucking state . . .
    // let tempUsers = users;
    // let index = tempUsers.findIndex(user => user.id == values.id);
    // tempUsers[index].id = values.id;
    // tempUsers[index].name = values.name;
    // tempUsers[index].email = values.email;
    // tempUsers[index].role = values.role;
    
    // well shit this does that too, still referencing the original array
    // setUsers(prevUsers => {
    //   let index = prevUsers.findIndex(user => user.id == values.id);
    //   prevUsers[index].id = values.id;
    //   prevUsers[index].name = values.name;
    //   prevUsers[index].email = values.email;
    //   prevUsers[index].role = values.role;
    //   return [...prevUsers];
    // });

    //there we go! now it creates and passes a new object
    setUsers(prevUsers => {
      let index = prevUsers.findIndex(user => user.id == values.id);
      return prevUsers.map((user,i) => {
        if(i !== index) return user;

        return {...user, id:values.id, name:values.name, email:values.email, role:values.role};
      });
    });
  }

  const onSubmitDeleteUser = (values: user) => {
    setUsers(users.filter((user) => { return user.id !== values.id; }));
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

  return(
    <>
    <Navbar/>
    
    <div className='flex flex-col px-9'>
      <div className='flex flex-row w-full max-w-[1000px] gap-[15px]'>
        <Input onChange={sortUsers}></Input>
        <Select onValueChange={sortUsers}>  
          {/* onValueChange={field.onChange} defaultValue={field.value} */}
            <SelectTrigger>
              <SelectValue placeholder="Filter by"/>
            </SelectTrigger>
          <SelectContent>
            <SelectItem value='Name'>Name</SelectItem>
            <SelectItem value='Email'>Email</SelectItem>
          </SelectContent>
        </Select>
        <UserFormDialog onSubmit={onSubmitAddUser}/>
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
