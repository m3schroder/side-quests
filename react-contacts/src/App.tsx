import React, { FormEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { Contact } from "./types";
import Modal from "./components/Modal";

function App() {
	const [contact, setContact] = useState<Contact | undefined>(undefined);
	const [editing, setEditing] = useState<Contact | undefined>(undefined);
	const [adding, setAdding] = useState<boolean>(false);

	const processForm = (e: FormEvent<HTMLFormElement>) => {
		setEditing(undefined)
		e.preventDefault();
		let inputs = document.querySelectorAll("#contact-form input");
		let contact: Contact = {
			name: "",
			email: "",
			number: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			isFavorite: false
		};
		inputs.forEach((input) => {
			let key = input.getAttribute("name");
			if (key)
				// @ts-ignore
				contact[key as keyof Contact] = input.getAttribute("value");
		});
		// @ts-ignore
		setContact(contact);
		setAdding(false);
	};

	return (
		<div className="App">
			<div className="">
				<div className="isolate bg-white px-6 py-12 lg:py-24 sm:py-32 gap-12 lg:px-8 grid lg:grid-cols-1 w-fit mx-auto">
					<div
						className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
						aria-hidden="true"
					>
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<ContactList contact={contact} setEditing={setEditing} setAdding={setAdding} />
					<Modal open={adding} setOpen={setAdding} onClose={() => {
						setAdding(false)
						setEditing(undefined)
					}}>
						<ContactForm onSubmit={processForm} incomingContact={editing} />
					</Modal>
				</div>
			</div>
		</div>
	);
}

export default App;
