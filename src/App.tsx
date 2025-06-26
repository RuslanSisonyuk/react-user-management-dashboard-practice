import './App.css';
import Navbar from './components/ui/Navbar';
import { Toaster } from 'sonner';
import UsersTable from './components/UsersTable';
import { parsedUsers } from './data/user_data';
import { useEffect  } from 'react';
import { fillUsers } from './state/users/usersSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fillUsers(parsedUsers));
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
