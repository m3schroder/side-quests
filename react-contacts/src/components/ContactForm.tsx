import { FormEvent, useEffect, useState } from "react";
import { Contact } from "../types";
import Modal from "./Modal";

interface ContactFormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	incomingContact: Contact | undefined;
}

const ContactForm = ({
	onSubmit,
	incomingContact = undefined,
}: ContactFormProps) => {
	const [contact, setContact] = useState<Contact>(incomingContact ?? {
		name: "",
		email: "",
		number: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		isFavorite: false
	});

	const clearContact = () => {
		let cleared = { ...contact };
		Object.entries(cleared).map(([key, val]) => {
			//@ts-ignore
			cleared[key] = '';
		});
		setContact(cleared);
	};

	const updateContact = (e: any) => {
		const { target: { name, value }, } = e;
		setContact((data) => ({ ...data, [name]: value }));
	};

	useEffect(() => {
		if (incomingContact) setContact(incomingContact);
	}, [incomingContact]);

	return (
		<div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Contact Form
				</h2>
			</div>
			<form
				id="contact-form"
				onSubmit={(e) => {
					onSubmit(e)
					clearContact()
				}}
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<label
							htmlFor="name"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								value={contact.name}
								onChange={updateContact}
								name="name"
								id="name"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								value={contact.email}
								onChange={updateContact}
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone-number"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Phone number
						</label>
						<div className="mt-2.5">
							<input
								value={contact.number}
								onChange={updateContact}
								type="tel"
								name="number"
								id="number"
								autoComplete="tel"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 grid-rows-2 col-span-2 gap-7">
						<div>
							<label
								htmlFor="address"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Address
							</label>
							<div className="mt-2.5">
								<input
									value={contact.address}
									onChange={updateContact}
									name="address"
									id="address"
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
									autoComplete="address"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="city"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								City
							</label>
							<div className="mt-2.5">
								<input
									name="city"
									onChange={updateContact}
									value={contact.city}
									id="city"
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="state"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								State
							</label>
							<div className="mt-2.5">
								<input
									name="state"
									value={contact.state}
									onChange={updateContact}
									id="state"
									autoComplete="state"
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="zip"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								ZIP
							</label>
							<div className="mt-2.5">
								<input
									name="zip"
									value={contact.zip}
									onChange={updateContact}
									id="zip"
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
									autoComplete="zip"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-slate-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
					>
						{incomingContact ? "Update" : "Add"} Contact
					</button>

				</div>
			</form>
		</div>
	);
};

export default ContactForm;
