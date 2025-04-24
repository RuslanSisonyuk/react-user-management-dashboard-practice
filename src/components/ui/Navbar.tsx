
export default function Navbar(){
    return(
        <nav className='flex flex-row justify-between bg-[#1C1A27] pt-4 pb-4 w-[100%] mb-[3rem] px-[3rem] border-white'>
            <div className='flex flex-row align-bottom self-center'>
                <p className='align-baseline text-[2rem] self-center font-sg max-sm:text-[1.2rem] text-left'>ConnectSphere Community</p>
            </div>
            <div className='flex flex-row gap-3 justify-items-end'>
                <img src="/assets/icons/UserIcon.png" alt="profile" className='self-center size-8' />
                <img src="/assets/icons/LogOutIcon.png" alt="log-out" className='self-center size-8'/>
            </div>
        </nav>
    );
}