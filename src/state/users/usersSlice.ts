import { User, Users } from "@/types/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

const initialState: Users = {
    users: [{
        id: "acfea263-1e51-447b-9a84-6e2ac46e6a43",
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
            state.users = action.payload;
        },
        
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },

        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index !== -1){
                state.users[index] = action.payload
            }
        },

        deleteUser: (state, action: PayloadAction<string>) => {
            let parsedId = emailSchema.safeParse(action.payload);
            if (!parsedId.success) {
                console.log("Error in user deletion: " + parsedId.error) 
                return;
            };

            state.users = state.users.filter(user => user.id !== action.payload);
        },

        sortUsers: (state, action: PayloadAction<string>) => {
            state.users = state.users.sort((a,b) => {
                switch(action.payload){
                  case "id":
                    return a.id.localeCompare(b.id);
                  case "name":
                    return a.name.localeCompare(b.name);
                  case "email":
                    return a.email.localeCompare(b.email);
                  case "role":
                    return a.role.localeCompare(b.role);
                  default:
                    return a.name.localeCompare(b.name);
                }
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