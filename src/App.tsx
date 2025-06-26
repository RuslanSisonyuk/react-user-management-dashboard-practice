import './App.css';
import Navbar from './components/ui/Navbar';
import { Toaster } from 'sonner';
import UsersTable from './components/UsersTable';
import { users } from './data/user_data';
import { User,userSchema } from './types/userType';
import { useEffect  } from 'react';
import { fillUsers } from './state/users/usersSlice';
import { useDispatch } from 'react-redux';

function parseUsers(users:User[]){
  return users.filter((user)=>{
    const result = userSchema.safeParse(user);
    return result.success;
  })
}

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fillUsers(parseUsers(users)));
  },[]);

  return(
    <>
    <Navbar/>
    
    <UsersTable/>

    <Toaster/>
    </>
  );
}

export default App
