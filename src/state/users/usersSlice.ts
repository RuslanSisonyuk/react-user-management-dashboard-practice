import { User, Users } from "@/types/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Users = {
    users: [{
        id: "",
        name: "",
        email: "",
        role: "Viewer"
    },]
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        //fill users
        fillUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [];
            action.payload.map((user) => {
                state.users.push(user);
            });
        },
        
        //add user
        addUser: (state, action: PayloadAction<User>) => {
            let randomUserId = crypto.randomUUID();
            state.users.push({...action.payload,id:randomUserId});
        },

        //update user
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index !== -1){
                state.users[index] = action.payload
            }
        },

        //delete user
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload);

            //add checking with zod?
        },

        //sort users
        sortUsers: (state, action: PayloadAction<string>) => {
            state.users = state.users.sort((a,b) => {
                  if(action.payload==="id")
                    return a.id.localeCompare(b.id);
                  if(action.payload==="name")
                    return a.name.localeCompare(b.name);
                  if(action.payload==="email")
                    return a.email.localeCompare(b.email);
                  if(action.payload==="role")
                    return a.role.localeCompare(b.role);
                  return a.name.localeCompare(b.name);
                });
        }
    }
});

export const { 
    fillUsers, 
    addUser, 
    updateUser, 
    deleteUser, 
    sortUsers } = usersSlice.actions;

export default usersSlice.reducer;