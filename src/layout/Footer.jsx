const Footer = ()=>{
    let footerYear = new Date().getFullYear();
    return (
        <footer className="p-10 bg-gray-700 text-white text-center">
            <div>
            <p>Cpoyright &copy; {footerYear} All right reserved</p>
            </div>
        </footer>
    )
}

export default Footer;