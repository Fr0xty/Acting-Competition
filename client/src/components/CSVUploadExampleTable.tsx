const CSVUploadExampleTable = () => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <td>judge_id</td>
                        <td>name</td>
                        <td>phone_number</td>
                        <td>password</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Required</td>
                        <td>Required</td>
                        <td>Required</td>
                        <td>Required</td>
                    </tr>
                    <tr>
                        <td>Length = 12</td>
                        <td>
                            0 {'<'} Length {'<'} 31
                        </td>
                        <td>
                            0 {'<'} Length {'<'} 16
                        </td>
                        <td>
                            7 {'<'} Length {'<'} 31
                        </td>
                    </tr>
                    <tr>
                        <td>only 0-9 allowed</td>
                        <td>UTF-8</td>
                        <td>only 0-9 allowed</td>
                        <td>UTF-8</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CSVUploadExampleTable;
