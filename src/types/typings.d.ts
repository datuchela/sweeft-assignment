type UserType = {
	id: number;
	name: string;
	lastName: string;
	prefix: string;
	title: string;
	imageUrl: string;
};

type DetailedUserType = UserType & {
	jobDescriptor: string;
	jobArea: string;
	jobType: string;
	email: string;
	ip: string;
	company: {
		name: string;
		suffix: string;
	};
	address: {
		zipCode: string;
		city: string;
		streetAddress: string;
		country: string;
		state: string;
	};
};

type UsersDataType = {
	pagination: {
		previousPage: number;
		current: number;
		nextpage: number;
		total: number;
		pageSize: number;
	};
	list: UserType[];
};
