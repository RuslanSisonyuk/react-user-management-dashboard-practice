import { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Button } from './button';
import { user, userSchema } from '@/types/userType';

enum FormType {
  edit = "EDIT",
  add = "ADD"
}
interface UserProps{
    onSubmit: (values:user) => void;
    type?: string;
    userAttributes?: user;
}
const defaultUser:user = {id:"4a9c54a0-4eed-454b-9485-4baba9826f83",name:"",email:"",role:"Viewer"};  
const defaultType:string = FormType.add;

//form defaults to the "add user" form
export default function UserFormDialog({onSubmit,userAttributes=defaultUser,type=defaultType}:UserProps){
    const [isOpen,setOpen] = useState(false);

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
          id:userAttributes.id,
          name:userAttributes.name,
          email:userAttributes.email,
          role:userAttributes.role
        }
    });
    
    //executes the provided function passing the values from the form, rests the form fields and closes the form
    function handleFormSubmit(values:z.infer<typeof userSchema>){
        onSubmit({...values,id:userAttributes.id});
        if(type!=FormType.edit) form.reset();
        setOpen(false);
    }


    //settings of the form depending on the provided form type
    function getButton(){
        return type == FormType.edit ? <Button variant="secondary" size="sm">Edit</Button> : <Button>New User</Button>
    }
    function getTitle(){
        return type == FormType.edit ? "Edit Profile" : "Add New Profile"
    }
    function getDescription(){
        return type == FormType.edit ? "Make changes to the profile here. Click submit when you're done." : "Add in the details of the new profile. Click submit when you're done.";
    }

    return(
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogTrigger>
            { getButton() }
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{ getTitle() }</DialogTitle>
              <DialogDescription>
                { getDescription() }
              </DialogDescription>
            </DialogHeader>
            <Form { ...form }>
              <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
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
    );
}