"use client"
import "./globals.css"
import { useDispatch, useSelector } from 'react-redux';
let error = () => {
	const role = useSelector((state) => state.Rol);
	return (
		<>

			<div class="error1-container">
				<h1 id="k1"> 404 </h1>
				<p id="k2">
					Oops! The page you're
					looking for is not here.
				</p>
				{
					role == "Admin" ?
						<a id="k3" href="http://localhost:3000/admin/delproduct">
							Go Back to Home
						</a> :
						<a id="k3" href="http://localhost:3000/customer/all">
							Go Back to Home
						</a>
				}
			</div>
		</>
	)
}

export default error;