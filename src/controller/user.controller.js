import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OPTIONS } from "../constants.js";
import { generateAccessAndRefreshToken } from "../utils/generateTokens.js";

// register user controller post request api/v1/user/register
const registerUser = asyncHandler(async (req, res) => {
	// access data from the form-data
	const [firstName, lastName, userName, email, password] = [
		req.body.firstName,
		req.body.lastName,
		req.body.userName,
		req.body.email,
		req.body.password,
	];
    console.log(email, password);
	if (email && password) {
		try {
			const customer = new Customer({
				email,
				password,
			});
			const result = await customer.save();
			const createdUser = await Customer.findById(result._id).select(
				"-password -email"
			);

			// checking if user created or not
			if (!createdUser) {
				throw new ApiError(
					500,
					"Something went wrong while registering the user"
				);
			}

			// return res
			return res
				.status(201)
				.json(
					new ApiResponse(
						200,
						createdUser,
						"User Registered Successfully"
					)
				);
		} catch (error) {
			throw new ApiError(400, error.message);
		}
	} else {
		return res
				.status(401)
				.json(
					new ApiResponse(
						401,
						 "",
						"All field are required"
					)
				);
	}
});

export { registerUser };
