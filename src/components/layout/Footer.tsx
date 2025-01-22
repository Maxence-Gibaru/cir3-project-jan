

export default function Footer() {


    return (
        <>
            <section className="h-screen bg-darkBlueBg flex flex-col text-white justify-between items-center px-6">
                <div className="flex flex-col flex-grow justify-center items-center">
                    <h1 className="text-9xl uppercase font-bold">Junia</h1>
                    <p className="text-md font-bold italic uppercase">corporation</p>
                </div>
                <div className="flex flex-col flex-grow justify-center items-center gap-10">
                    <div className="flex flex-col gap-5 bg-white rounded-lg text-gray-700 p-5">
                        <h2 className="font-bold text-xl uppercase">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h2>
                        <p>
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </div>
                    <div className="flex flex-row  text-lg gap-10">
                        <div className="flex flex-col gap-5">
                            <p className="font-bold text-xl">Backend</p>
                            <ul className="list-disc">
                                <li>MATHIEU Paul</li>
                                <li>GIBARU Maxence</li>
                                <li>FATRAS Edgar</li>
                                <li>HU Lucas</li>
                                <li>LAMOUR Jeremy</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="font-bold text-xl">Frontend</p>
                            <ul className="list-disc">
                                <li>DELRUE Cyprien</li>
                                <li>BOSSUT Siméon</li>
                                <li>THEPKAISONE Louis</li>
                                <li>LEGRAND Julien</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}