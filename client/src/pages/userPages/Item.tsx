import '../../styles/Item.scss';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemTable from '../../components/ItemTable';
import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';
import ItemForm from '../../components/ItemForm';

const Item = () => {
    const [searchParams] = useSearchParams();

    const [eventId, setEventId] = useState<null | string>('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        setEventId(searchParams.get('event-id'));
    }, [searchParams]);

    useEffect(() => {
        if (!eventId) return;

        (async () => {
            const itemReq = await fetch(`/api/resource/items?event-id=${eventId}`);
            if (itemReq.status !== 200) return;

            setItems(await itemReq.json());
        })();
    }, [eventId]);

    return (
        <div className="item">
            <UserNavbar />
            <UserPageNavigation userType="admin" currentPage="item" />

            {
                /* interface when event id is provided */
                eventId && (
                    <>
                        <ItemForm eventId={eventId} />
                        <ItemTable items={items} />
                    </>
                )
            }

            {
                /* event id is not provided */
                !eventId && (
                    <div className="no-event-id">
                        <h1>This page is to edit items.</h1>
                        <p>
                            Please use the <button>Edit Items</button> button in event page to edit.
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default Item;
