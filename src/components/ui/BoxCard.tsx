import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useEffect } from "react";


type contentType = {
    name: string,

    text: string
}

export default function BoxCard(content: contentType) {

    useEffect(() => {
        console.log(content);
    }, [content])
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{content.name}</p>
                {/* <small className="text-default-500">{content.date}</small> */}
                <h4 className="font-bold text-large">{content.text}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={270}
                />
            </CardBody>
        </Card>
    );
}
