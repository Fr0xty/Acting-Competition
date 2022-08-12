import '../styles/UserList.scss';
import '../styles/Table.scss';
import { useEffect, useState } from 'react';

interface UserListProperties {
    filterText: string;
}

const UserList = ({ filterText }: UserListProperties) => {
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [users, setUsers] = useState([
        { user_id: 'loading..', name: 'loading..', phone_number: 'loading..', user_type: 'loading..' },
    ]);

    /**
     * fetch users on initial load
     */
    useEffect(() => {
        (async () => {
            const usersReq = await fetch('/api/resource/user-list');
            if (usersReq.status !== 200) return;

            setUsers(await usersReq.json());
        })();
    }, []);

    /**
     * update filteredUsers state variable onChange of filterText
     */
    useEffect(() => {
        if (!users.length) return;
        if (filterText === '') setFilteredUsers(users);

        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name.includes(filterText) ||
                    user.user_id.includes(filterText) ||
                    user.phone_number.includes(filterText) ||
                    user.user_type.includes(filterText)
            )
        );
    }, [users, filterText]);

    return (
        <div className="user-list">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>User Id</td>
                            <td>Name</td>
                            <td>Phone Number</td>
                            <td>User Type</td>
                        </tr>
                    </thead>
                    <tbody>
                        {!!filteredUsers.length &&
                            filteredUsers.map((user, i) => {
                                return (
                                    <tr key={i} className={`${i % 2 ? 'dark' : 'light'} ${user.user_type}`}>
                                        <td>{user.user_id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone_number}</td>
                                        <td className="user-type">{user.user_type}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
