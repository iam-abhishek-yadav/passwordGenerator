import { useState, useCallback, useEffect } from "react";

const usePasswordGenerator = (
	length: number,
	numberAllowed: boolean,
	symbolsAllowed: boolean,
	upperCaseAllowed: boolean,
	lowerCaseAllowed: boolean
) => {
	const [password, setPassword] = useState<string>("");

	const generatePassword = useCallback(() => {
		let pass = "";
		let str = "";
		if (numberAllowed) str += "0123456789";
		if (symbolsAllowed) str += "!@#$%^&*-_+=[]{}~`";
		if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
		for (let i = 0; i < length; i++) {
			const char = Math.floor(Math.random() * str.length);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [
		length,
		numberAllowed,
		symbolsAllowed,
		upperCaseAllowed,
		lowerCaseAllowed,
	]);

	useEffect(() => {
		generatePassword();
	}, [generatePassword]);

	return password;
};

export default usePasswordGenerator;
