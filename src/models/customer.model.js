import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const customerSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true }
);


export const Customer =
	mongoose.model.Customer || mongoose.model("Customer", customerSchema);
