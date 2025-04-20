import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Button } from './button';
import { user } from '@/types/userType';

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

interface UserProps{
    onSubmit: (values:user) => void;
    type: string;
    userAttributes: user;
}



export default function UserFormDialog(props:UserProps){
    const [isOpen,setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:props.userAttributes.name,
          email:props.userAttributes.email,
          role:props.userAttributes.role
        }
    });
    
    function onSubmitt(values:z.infer<typeof formSchema>){
        props.onSubmit({...values,id:props.userAttributes.id});
        if(props.type!="edit") form.reset();
        setOpen(false);
    }

    function setButton(){
        if(props.type == "edit") return (<Button variant="secondary" size="sm">Edit</Button>);
        return (<Button>New User</Button>);
    }
    function setTitle(){
        if(props.type == "edit") return "Edit Profile";
        return "Add New Profile";
    }
    function setDescription(){
        if(props.type == "edit") return "Make changes to the profile here. Click submit when you're done.";
        return "Add in the details of the new profile. Click submit when you're done.";
    }

    return(
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogTrigger>
            {setButton()}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{setTitle()}</DialogTitle>
              <DialogDescription>
                {setDescription()}
              </DialogDescription>
            </DialogHeader>
            <Form { ...form }>
              <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmitt)}>
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