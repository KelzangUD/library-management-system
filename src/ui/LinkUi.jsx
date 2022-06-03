import { Link } from "react-router-dom";
const LinkUi =({to, className, text})=>{
    return (
        <>
        <Link to={to} className={className}>{text}</Link>
        </>
    )
}
export default LinkUi;