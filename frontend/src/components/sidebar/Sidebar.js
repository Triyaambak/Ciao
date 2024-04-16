import { useState } from "react";
import AllConversations from "./AllConversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import SpecificConversations from "./SpecificConversations";

const Sidebar = () => {
	const [searchUser, setSearchUser] = useState(""); 
	const [submittedSearch, setSubmittedSearch] = useState("");

	const handleChange = (event) => {
        const { value } = event.target;
		setSearchUser(value);
    } 
	
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!searchUser)
			setSubmittedSearch(undefined);
		else
			setSubmittedSearch(searchUser);
		setSearchUser("");
	}

	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput
				searchUser={searchUser}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
			/>
			<div className='divider px-3'></div>
			{!submittedSearch && (
                <AllConversations />
			)}
			{submittedSearch && (
                <SpecificConversations submittedSearch={submittedSearch} />
            )}
			<LogoutButton />
		</div>
	);
};
export default Sidebar;
