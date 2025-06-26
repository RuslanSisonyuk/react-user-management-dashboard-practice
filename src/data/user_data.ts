import { User, userRoles, userSchema } from "@/types/userType" 

const users:User[] = [
    {
        "id": "invalid-idlmao",
        "name": "Grigore Ceban",
        "email": "mylongEmail@gmail.com",
        "role": "Editor"
    },
    {
        "id": "4a9c54a0-4eed-454b-9485-4baba9826f83",
        "name": "Grigore Mocan",
        "email": "GRMocan@gmail.com",
        "role": "Admin"
    },
    {
        "id": "96a43428-8842-42ec-ac8c-e8aa89a42137",
        "name": "Hristo Horus",
        "email": "Localyahoo@yahoo.com",
        "role": "Editor"
    },
    {
        "id": "013380ef-af83-47ff-908a-72bffcfa5011",
        "name": "Grigore Ceban",
        "email": "mylongEmail@gmail.com",
        "role": "Viewer"
    },
    {
        "id": "414e298e-151a-4ecf-8f5c-025ed50b07af",
        "name": "E",
        "email": "mylonEmailmail.com",
        "role": "Viewer"
    },
    {
        "id": "375a23ab-92fb-485f-b466-56bc6f2cd455",
        "name": "Arthur Logan",
        "email": "ArthurLogan2@gmail.com",
        "role": "Admin"
    },
    {
        "id": "f88f50f0-d3e3-4a6d-bdb5-97eb036d9262",
        "name": "name2",
        "email": "mylongEmail@gmail.com",
        "role": "Admin"
    },
    {
        "id": "8ccaad75-19cc-4d8b-9020-6bc916a154f2",
        "name": "name3",
        "email": "mylongEmail@gmail.com",
        "role": "Viewer"
    },
    {
        "id": "01416178-706b-4db1-8aeb-9575a584e017",
        "name": "Edinor Mike",
        "email": "mylongEmail@gmail.com",
        "role": "Editor"
    },
    {
        "id": "414e298e-151a-4ecf-8f5c-025ed50b07af",
        "name": "E",
        "email": "mylonEmailmail.com",
        "role": "Viewer"
    },
    {
        "id": "375a23ab-92fb-485f-b466-56bc6f2cd455",
        "name": "Arthur Logan",
        "email": "ArthurLogan2@gmail.com",
        "role": "Admin"
    },
    {
        "id": "f88f50f0-d3e3-4a6d-bdb5-97eb036d9262",
        "name": "name2",
        "email": "mylongEmail@gmail.com",
        "role": "Viewer"
    },
    {
        "id": "8ccaad75-19cc-4d8b-9020-6bc916a154f2",
        "name": "name3",
        "email": "mylongEmail@gmail.com",
        "role": "Viewer"
    }
]

function resolveDuplicateId(user:User, currentIndex:Number){
    if( users.findIndex( User => User.id == user.id ) != currentIndex ) {
      console.warn("Duplicate Id at Index: " + currentIndex);
      return { ...user, id: crypto.randomUUID() }
    }
    return user;
  }
  function parseUsers(){
    return users.filter((user)=>{
      const result = userSchema.safeParse(user);
      return result.success;
    })
  }

export const parsedUsers:User[] = parseUsers().map( (user,index) => resolveDuplicateId(user, index));