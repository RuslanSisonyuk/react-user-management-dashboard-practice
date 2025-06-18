import { User, Users } from "@/types/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

const initialState: Users = {
    users: [{
        id: "4a9c54a0-4eed-454b-9485-4baba9826f83",
        name: "tempName",
        email: "tempEmail@gmail.com",
        role: "Viewer"
    },]
}

const emailSchema = z.string().uuid({
    message: "An invalid UUID was passed."
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        //fill users array with passed data, rewriting the old array 
        fillUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [];
            action.payload.map((user) => {
                state.users.push(user);
            });
        },
        
        addUser: (state, action: PayloadAction<User>) => {
            let randomUserId = crypto.randomUUID();
            state.users.push({...action.payload,id:randomUserId});
        },

        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index !== -1){
                state.users[index] = action.payload
            }
        },

        deleteUser: (state, action: PayloadAction<string>) => {
            let parsedId = emailSchema.safeParse(action.payload);
            parsedId.success ? state.users = state.users.filter(user => user.id !== action.payload) : console.log("Error in user deletion: " + parsedId.error);
        },

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