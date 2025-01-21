import { Textarea } from "@heroui/react";


export default function CodeArea({value, onChange}) {
    return (
        <Textarea className="border rounded-lg w-90 h-10 text-lg max-w-xs "
            value={value}
            onChange={onChange}
        />
    );
}
