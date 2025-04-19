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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

interface user{
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must have at least 2 characters"
  }),
  email: z.string().email({
    message: "Enter a valid email address"
  }),
  role: z.string().min(2, {
    message: "Role must have at least 2 characters"
  }),
})


function App() {
  const [newUser, setNewUser] = useState<user>();
  const [existingUser, setExistingUser] = useState<user>();
  const [users, setUsers] = useState<user[]>(usersJson);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email:"",
      role:""
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    let randomUserId = crypto.randomUUID();
    setUsers([...users,{...values,id:randomUserId}]);
    form.reset()
  }

  useEffect(()=>{
    localStorage.setItem("users",JSON.stringify(users));
  },[users]);

  function updateUser(){
    let tempUsers = users;
    let index = tempUsers.findIndex(user => user.id == existingUser?.id);
    tempUsers[index].id = existingUser?.id;
    tempUsers[index].name = existingUser?.name;
    tempUsers[index].email = existingUser?.email;
    tempUsers[index].role = existingUser?.role;
    setUsers([...tempUsers]);
  }

  function addNewUser(){
    let newId = crypto.randomUUID();
    setUsers([...users,{...newUser, id: newId}]);
    setNewUser({id:"",name:"",email:"",role:""});
  }



  return(
    <>
    <Navbar/>

    <div className='flex flex-col px-9'>
      <div className='flex flex-row'>
        <Dialog>
          <DialogTrigger>
            <Button>New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Profile</DialogTitle>
              <DialogDescription>
                Add in the details of the new profile. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form { ...form }>
              <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={ form.control }
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input { ...field }></Input>
                      </FormControl>
                      <FormMessage/>
                    </FormItem> 
                  )}
                />
                <FormField
                  control={ form.control }
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input { ...field }></Input>
                      </FormControl>
                      <FormMessage/>
                    </FormItem> 
                  )}
                />
                <FormField
                  control={ form.control }
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Viewer'>Viewer</SelectItem>
                          <SelectItem value='Editor'>Editor</SelectItem>
                          <SelectItem value='Admin'>Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem> 
                  )}
                />
              <DialogFooter>
                <Button type='submit' onClick={()=>{console.log("Form errors:", form.formState.errors)}}>Submit</Button>
              </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
              <TableCell><img src="src/assets/icons/dotsIcon.png" alt="Actions" className='size-[20px]'/>
              <div className='flex flex-col absolute bottom-[-15] right-0 z-10 rounded-[3px] bg-[#f0f0f0] p-2'>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="secondary" size="sm" onClick={()=>{setExistingUser(users[1])}}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to the profile here. Click submit when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="Name" className="text-right">
                          Name
                        </label>
                        <Input id="Name" value={existingUser?.name} className="col-span-3" onChange={e=>{setExistingUser({...existingUser, name:e.target.value})}}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="Email" className="text-right">
                          Email
                        </label>
                        <Input id="Email" value={existingUser?.email} className="col-span-3"  onChange={e=>{setExistingUser({...existingUser, email:e.target.value})}}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="Role" className="text-right">
                          Role
                        </label>
                        <Input id="Role" value={existingUser?.role} className="col-span-3"  onChange={e=>{setExistingUser({...existingUser, role:e.target.value})}}/>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type='submit' onClick={()=>updateUser()}>Submit Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
              </TableCell>
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
