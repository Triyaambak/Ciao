import EachConversation from './EachConversation';
import useGetSpecificUsers from "../../hooks/useGetSpecificUsers";

const SpecificConversations = ({ submittedSearch }) => {

    const { loading, specificUsers } = useGetSpecificUsers(submittedSearch);

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {specificUsers && (
                specificUsers.map((eachUser, index) => (
                    <EachConversation
                        key={eachUser._id}
                        conversation={eachUser}
                        lastIndex={index === specificUsers.length-1}
                    />
            )))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};

export default SpecificConversations;