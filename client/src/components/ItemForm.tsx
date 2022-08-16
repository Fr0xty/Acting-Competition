import '../styles/ItemForm.scss';

import { useEffect, useState } from 'react';
import InputField from './InputField';

interface ItemFormProperties {
    eventId: string;
}

const ItemForm = ({ eventId }: ItemFormProperties) => {
    const [judges, setJudges] = useState<any[]>([]);

    const [itemName, setItemName] = useState('');
    const [fullMarks, setFullMarks] = useState('');
    const [judgeId, setJudgeId] = useState('');

    const setInputFieldError = (className: string) => {
        document.querySelector(`.item-form .input-field.${className}`)?.classList.add('error');
    };

    const addItemClicked = async () => {
        const data = {
            name: itemName,
            full_marks: fullMarks,
            judge_id: judgeId,
            event_id: eventId,
        };

        const addItemReq = await fetch('/api/resource/add-item', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        /**
         * if form error
         */
        if (addItemReq.status === 400) {
            const error = await addItemReq.json();
            setInputFieldError(error.field.replace('_', '-'));
            return alert(error.message);
        }

        /**
         * if added successfully
         */
        if (addItemReq.status === 200) {
            alert('Item added successfully.');
            return document.location.reload();
        }
    };

    /**
     * fetch judges to be selected
     */
    useEffect(() => {
        (async () => {
            const judgesReq = await fetch(`/api/resource/event-available-judges?event-id=${eventId}`);
            if (judgesReq.status !== 200) return;
            setJudges(await judgesReq.json());
        })();
    }, [eventId]);

    /**
     * for focus styling
     */
    useEffect(() => {
        const formInputs = document.querySelectorAll('.item-form .input-field input, textarea');

        formInputs.forEach((input) => {
            input.addEventListener('focus', (e) => {
                (e.target as HTMLElement).parentElement?.classList.add('focused');
            });
            input.addEventListener('focusout', (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('focused');
            });
        });
    }, []);

    return (
        <div className="item-form">
            <div className="add-item-text">Add Item</div>

            <InputField
                fieldName="Item Name"
                characterLimit={30}
                value={itemName}
                setValue={setItemName}
                className="name"
            />
            <InputField
                fieldName="Full Marks"
                characterLimit={10}
                value={fullMarks}
                setValue={setFullMarks}
                inputType="number"
                className="full-marks"
            />

            <select
                defaultValue="placeholder"
                onChange={(e) => {
                    setJudgeId(e.target.value);
                }}
            >
                <option value="placeholder" disabled={true}>
                    Select Judge
                </option>
                {judges.length &&
                    judges.map((judge, i) => {
                        return (
                            <option key={i} value={judge.judge_id}>
                                {judge.name}
                            </option>
                        );
                    })}
            </select>

            <button onClick={addItemClicked}>Add Item</button>
        </div>
    );
};

export default ItemForm;
