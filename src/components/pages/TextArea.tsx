import { Textarea } from "@heroui/react";


export default function CodeArea({value, onChange,classname}) {
    return (
        <Textarea
        /* disableAutosize */
        validationBehavior="native"
        className={classname}
        value={value}
        onChange={onChange}
        />
    );
}