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
  const [filterUsersByString, setFilterUsersByString] = useState('');
  const [filterType, setfilterType] = useState('name');

  //check users validation on page load
  useEffect(()=>{
    setUsers(usersJson.filter((user)=>{
      const result = userSchema.safeParse(user);
      if(result.success){
        return user;
      }
    }));
    // setIsLoading(false);
  },[]);

  
  const onSubmitAddUser = (values: user) => {
    let randomUserId = crypto.randomUUID();
    setUsers([...users,{...values,id:randomUserId}]);
  }

  const onSubmitUpdateUser = (values: user) => {
    setUsers(prevUsers => {
      let index = prevUsers.findIndex(user => user.id == values.id);    //find index of the passed user, map the array of objects, returning the users and a new user object with the passed values instead of the old object
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

  const filterUser = (user:user) => {
    if(filterType == "Email")
      return user.email.toLowerCase().startsWith(filterUsersByString.toLowerCase());
    return user.name.toLowerCase().startsWith(filterUsersByString.toLowerCase());
  }

  return(
    <>
    <Navbar/>
    
    <div className='flex flex-col px-9'>
      <div className='flex flex-row w-full max-w-[1000px] gap-[15px]'>
        <Input value={filterUsersByString} onChange={e => {setFilterUsersByString(e.target.value)}}></Input>
        <Select onValueChange={setfilterType}>  
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
          <TableBody  className='max-sm:text-[0.8rem]'>
            {users.filter(user => { return filterUser(user) }).map(user=>{
              return(<TableRow key={user.id}>
                <TableCell className="overflow-x-auto max-sm:max-w-[60px]">{user.id}</TableCell>
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
