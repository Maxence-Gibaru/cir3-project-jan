

export default function Footer() {


    return (
        <>
            <section className="h-screen bg-darkBlueBg flex flex-col text-white justify-center items-center">
                <h1>Logo Junia</h1>
                <div className="flex flex-col flex-grow justify-center items-center">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                    <div className="flex flex-row font-bold text-lg">
                        <ul className="list-disc">
                            <li>MATHIEU Paul</li>
                            <li>GIBARU Maxence</li>
                            <li>FATRAS Edgar</li>
                            <li>HU Lucas</li>
                            <li>LAMOUR Jeremy</li>
                        </ul>
                        <ul className="list-disc">
                            <li>DELRUE Cyprien</li>
                            <li>BOSSUT Siméon</li>
                            <li>THEPKAISONE Louis</li>
                            <li>LEGRAND Julien</li>
                        </ul>

                    </div>
                </div>
            </section>
        </>
    );
}