import ClientModel from "../models/Client.Model";

const resetAllClientsKg = async () => {
	try {
		const clients = await ClientModel.find({});
		if (clients) {
			for (let i = 0; i < clients.length; i++) {
				await ClientModel.findByIdAndUpdate(clients[i]._id.toString(), {
					totalKg: 0,
				});
				console.log(`client ${clients[i]._id.toString()} kg reseted`);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export default resetAllClientsKg;
