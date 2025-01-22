import Image from 'next/image';



interface NavProps {
    display_name: string;
}

export default function Nav({ display_name }: NavProps) {
    return (
        <div className="bg-primary max-h-screen md:max-h-full w-full flex flex-col h-16">
            {display_name ? (
                <div className="flex items-center justify-center h-16">
                    <h1 className="text-white text-2xl">{display_name}</h1>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="flex items-center justify-center h-full w-full">
                        <Image
                            src="/logoO.png"
                            alt="Logo OnePiSeN"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </div>
                </div>
            )}
            {display_name && (
                <Image
                    src="/logoO.png"
                    alt="Logo OnePiSeN"
                    width={50}
                    height={50}
                    className="absolute mx-auto top-2 right-4 rounded-full "
                />
            )}
        </div>
    );
}
