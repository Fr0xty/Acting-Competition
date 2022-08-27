import '../styles/CSVUpload.scss';
import CSVUploadExampleTable from './CSVUploadExampleTable';

const CSVUpload = () => {
    const fileAdded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * prepare to send to server
         */
        const formData = new FormData();
        formData.append('file', e.target.files![0]);

        /**
         * reset input
         */
        e.target.value = '';

        const csvImportReq = await fetch('/api/resource/csv-upload', {
            method: 'post',
            body: formData,
        });

        if (csvImportReq.status === 400)
            return alert('Incorrect format, please refer to the example. Or user already exists.');

        if (csvImportReq.status === 200) {
            alert('CSV file uploaded successfully.');
            return document.location.reload();
        }
    };

    return (
        <div className="csv-upload">
            <span className="upload-text">Upload Judge CSV File</span>
            <input type="file" onChange={fileAdded} />

            <span className="csv-format-text">CSV File Format:</span>
            <CSVUploadExampleTable />
        </div>
    );
};

export default CSVUpload;
