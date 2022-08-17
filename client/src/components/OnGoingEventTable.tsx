import '../styles/Table.scss';
import { useEffect, useState } from 'react';

interface OnGoingEventTableProperties {
    userType: 'admin' | 'participant' | 'judge';
    eventUsers:
        | {
              participant_id: string;
              name: string;
              phone_number: string;
              placement: string;
              total_marks: string;
          }[]
        | null
        | any[];
}

const OnGoingEventTable = ({ userType, eventUsers }: OnGoingEventTableProperties) => {
    const [itemNames, setItemNames] = useState<string[]>([]);

    useEffect(() => {
        if (!eventUsers) return;

        const tempItemNames: string[] = [];
        Object.keys(eventUsers[0])
            .filter((key) => !['participant_id', 'name', 'phone_number'].includes(key))
            .forEach((itemName) => {
                tempItemNames.push(itemName);
            });

        setItemNames(tempItemNames);
    }, [eventUsers]);

    return (
        <div className="table">
            <h2>Participants</h2>

            <table>
                <thead>
                    <tr>
                        {userType !== 'participant' && <td>Participant Id</td>}
                        <td>Name</td>
                        {userType !== 'participant' && <td>Phone Number</td>}
                        {
                            /* admin: show all items */
                            userType === 'admin' &&
                                itemNames.length &&
                                itemNames.map((itemName) => {
                                    return <td>{itemName}</td>;
                                })
                        }
                    </tr>
                </thead>
                <tbody>
                    {eventUsers &&
                        eventUsers.map((user, i) => {
                            return (
                                <tr key={i} className={i % 2 ? 'dark' : 'light'}>
                                    {userType !== 'participant' && <td>{user.participant_id}</td>}
                                    <td>{user.name}</td>
                                    {userType !== 'participant' && <td>{user.phone_number}</td>}
                                    {userType === 'admin' &&
                                        itemNames.map((itemName) => {
                                            return <td>{user[itemName] || '-'}</td>;
                                        })}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default OnGoingEventTable;
