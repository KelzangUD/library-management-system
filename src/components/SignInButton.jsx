import Overlay from 'react-overlay-component';
import AccountOverlay from '../components/overlays/AccountOverlay';
import { useState } from 'react';
const SignInButton = ({FaUser})=>{
    const [isOpen, setIsOpen] = useState(false);
    const closeOverlay = () => {
        setIsOpen(false);
    };
    const onClick =(value)=>{
        (value ==="close")?setIsOpen(false):setIsOpen(true);
    }
    return (
        <div>
            <button className='btn btn-ghost btn-sm-rounded-bth' onClick={() => {setIsOpen(true);}}><FaUser className='inline pr-2 text-3xl'/></button>
            <Overlay className="PopupBox" isOpen={isOpen} closeOverlay={closeOverlay}  >
                <AccountOverlay onClick={onClick}/>
            </Overlay>
        </div>
    )
}
export default SignInButton;