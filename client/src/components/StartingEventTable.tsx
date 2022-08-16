import '../styles/Table.scss';

interface StartingEventTableProperties {
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

const StartingEventTable = ({ userType, eventUsers }: StartingEventTableProperties) => {
    return (
        <div className="table">
            <h2>Joined Participants</h2>

            <table>
                <thead>
                    <tr>
                        {userType !== 'participant' && <td>IC Number</td>}
                        <td>Name</td>
                        {userType !== 'participant' && <td>Phone Number</td>}
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
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default StartingEventTable;
