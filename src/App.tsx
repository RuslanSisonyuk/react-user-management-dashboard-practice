import './App.css';
import Navbar from './components/ui/Navbar';
import { Toaster } from 'sonner';
import UsersTable from './components/UsersTable';
import usersJson from './data/users.json';
import { User,userRoles,userSchema } from './types/userType';
import { useMemo } from 'react';

//check for duplicate id
//findIndex always returns the first element that it finds, so if there's a dupe, the dupe's index is greater than the first found element yee 
function resolveDuplicateId(user:User, currentIndex:Number){
  if( usersJson.findIndex( User => User.id == user.id ) != currentIndex ) {
    console.warn("Duplicate Id at Index: " + currentIndex);
    return { ...user, id: crypto.randomUUID() }
  }
  return user;
}
const dummyUser:User = {id:"4a9c54a0-4eed-454b-9485-4baba9826f83",name:"DELETEME",email:"",role:userRoles.Values.Viewer};  

function parseUsers(){
  return usersJson.map((user,index)=>{
    const result = userSchema.safeParse(user);
    return result.success ? resolveDuplicateId(result.data, index)
    : dummyUser;  
  }).filter( user => user.name !== "DELETEME" )
}

function App() {
  const filteredUsers:User[] = useMemo(() => parseUsers(), []);
  return(
    <>
    <Navbar/>
    
    <UsersTable usersData={filteredUsers}></UsersTable>

    <Toaster/>
    </>
  );
}

export default App
