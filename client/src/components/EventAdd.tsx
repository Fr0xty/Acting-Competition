import '../styles/EventAdd.scss';

interface EventAddProperties {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<'list' | 'add'>>;
}

const EventAdd = ({ setCurrentSubPage }: EventAddProperties) => {
    return <div className="event-add">adding</div>;
};

export default EventAdd;
