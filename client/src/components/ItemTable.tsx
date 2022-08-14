interface ItemTableProperties {
    items: {
        item_id: string;
        name: string;
        full_marks: string;
        judge_name: string;
    }[];
}

const ItemTable = ({ items }: ItemTableProperties) => {
    return (
        <div className="item-table">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>Item</td>
                            <td>Full Marks</td>
                            <td>Judge</td>
                        </tr>
                    </thead>
                    <tbody>
                        {!!items.length &&
                            items.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.full_marks}</td>
                                        <td>{item.judge_name}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemTable;
