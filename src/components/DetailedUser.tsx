type DetailedUserProps = {
	user: DetailedUserType;
};

const FieldSet = ({
	name,
	heading,
	subheading,
	data,
	flex,
}: {
	name: string;
	heading: string;
	subheading?: string;
	data: { label: string; data: string }[];
	flex?: string | number;
}) => {
	return (
		<fieldset
			className={`flex flex-col items-start gap-2 border border-black p-4 min-w-[172px]`}
			style={{ flex: flex ?? 0 }}
		>
			<legend className="px-2">{name}</legend>
			<div>
				<h1>
					<strong>{heading}</strong>
				</h1>
				{subheading && <span>{subheading}</span>}
			</div>
			<div>
				{data.map((field, idx) => {
					return (
						<Field
							key={field.label + idx}
							label={field.label}
							data={field.data}
						/>
					);
				})}
			</div>
		</fieldset>
	);
};

const Field = ({ label, data }: { label: string; data: string }) => {
	return (
		<div className="">
			<span className="underline capitalize">{`${label}:`}</span> {data}
		</div>
	);
};

export const DetailedUser = ({ user }: DetailedUserProps) => {
	const infoFieldSetData = [
		{ label: "Email", data: user.email },
		{ label: "IP Address", data: user.ip },
		{ label: "Job Descriptor", data: user.jobDescriptor },
		{ label: "Job Area", data: user.jobArea },
		{ label: "Job Type", data: user.jobType },
	];
	const addressFieldSetData = [
		{ label: "City", data: user.address.city },
		{ label: "Country", data: user.address.country },
		{ label: "State", data: user.address.state },
		{ label: "Street Address", data: user.address.streetAddress },
		{ label: "ZIP", data: user.address.zipCode },
	];

	return (
		<div className="flex items-center justify-between gap-8">
			<div className="w-64 overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src={user.imageUrl}
				/>
			</div>
			<FieldSet
				flex={1}
				name={"Info"}
				heading={`${user.prefix} ${user.name} ${user.lastName}`}
				subheading={user.title}
				data={infoFieldSetData}
			/>
			<FieldSet
				name="Address"
				heading={`${user.company.name} ${user.company.suffix}`}
				data={addressFieldSetData}
			/>
		</div>
	);
};
