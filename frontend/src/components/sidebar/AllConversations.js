import EachConversation from './EachConversation';
import useGetAllUsers from '../../hooks/useGetAllUsers';

const AllConversations = () => {
    const { loading, allUsers } = useGetAllUsers();

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {allUsers && (
                allUsers.map((eachUser, index) => (
                    <EachConversation
                        key={eachUser._id}
                        conversation={eachUser}
                        lastIndex={index === allUsers.length-1}
                    />
            )))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};

export default AllConversations;