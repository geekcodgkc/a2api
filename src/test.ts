import { hashpassword } from "./utils/bcryptUtils";

const h = async () => {
	const p = await hashpassword("27658945");
	console.log(p);
};

h();
