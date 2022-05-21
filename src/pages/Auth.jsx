const Auth = ()=>{
    return (
        <>
           <div>
            <form>
                <input  type='text' name='userName' placeholder="Enter User Name"/>
                <input type='password' name='password' placeholder="Enter Password"/>
                <button type="submit">Log In</button>
            </form>
            </div>
        </>
    )
}

export default Auth;