import "./globals.css"
let error = ()=>{
    return(
        <>
       
	<div class="error-container"> 
		<h1> 404 </h1> 
		<p> 
			Oops! The page you're 
			looking for is not here. 
		</p> 
		<a href="https://www.geeksforgeeks.org/"> 
			Go Back to Home 
		</a> 
	</div> 
        </>
    )
}

export default error;