import { Dispatch, SetStateAction } from "react";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SearchBarProps{
    filterValue:string ,
    setFilterValue:Dispatch<SetStateAction<string>>,
    setFilterType:Dispatch<SetStateAction<string>>
}

export function UsersSearchbar({ filterValue, setFilterValue, setFilterType }:SearchBarProps){
    
    return (
        <div className="flex flex-row w-full pl-2 bg-[rgba(28, 26, 39, 0.27)] rounded-[3px] border-[2px] border-[#1C1A27] gap-[10px]">
            <img src="/assets/icons/search_icon.svg" alt="search" className="object-contain max-w-[26px] max-sm:hidden"/>
            <Input value={ filterValue } onChange={e => { setFilterValue(e.target.value) }} className="border-none rounded-[2px]"></Input>  
            <Select onValueChange={ setFilterType }>  
                <SelectTrigger className="border-none">
                    <SelectValue placeholder="Filter by" className="max-sm:hidden"/>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value='Name'>Name</SelectItem>
                <SelectItem value='Email'>Email</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}