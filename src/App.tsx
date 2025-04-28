import './App.css';
import Navbar from './components/ui/Navbar';
import { Toaster } from 'sonner';
import UsersTable from './components/ui/UsersTable';
import usersJson from './data/users.json';
import { user,userSchema } from './types/userType';


function App() {

  //check users validation on page load
  const filteredUsers:user[] = [];
  usersJson.map((user,index)=>{
    const result = userSchema.safeParse(user);
    if(result.success){
      console.log(result.data);
    
      // if( user.role!=="Viewer" && user.role!=="Edior" && user.role!=="Admin"){
      //   user.role = "Viewer"; //set default user role as viewer if role string is faulty
      // } //maybe can be rewriten with zod?
    
      //check for duplicate id
      //findIndex always returns the first element that it finds, so if there's a dupe, the dupe's index is greater than the first found element yee 
      if( usersJson.findIndex( User => User.id == user.id ) != index ) {
        user.id = crypto.randomUUID();
        console.warn("Duplicate Id at Index: "+index);
      }

      filteredUsers.push(result.data);
    }
  });


  return(
    <>
    <Navbar/>
    
    <UsersTable passedUsers={filteredUsers}></UsersTable>

    <Toaster/>
    </>
  );
}

export default App
