import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import UserList from '../../components/UserList';
import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

const Users = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="users" style={{ paddingBottom: '5em' }}>
            <UserNavbar />
            <UserPageNavigation userType="admin" currentPage="users" />
            <SearchBar value={searchText} setValue={setSearchText} />
            <UserList filterText={searchText} />
        </div>
    );
};

export default Users;
