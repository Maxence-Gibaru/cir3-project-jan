

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
                        <h2 className="font-bold text-xl uppercase">OnePisen vous présente sa chasse au trésor !</h2>
                        <p>
                            Rejoignez vos amis pour une chasse au trésor des plus amusantes ! Jouez des parties personnalisées avec votre propre scénario. Chaque équipe commence à un endroit différent et doit trouver tous les indices dans l'ordre. Scannez les QRcode afin d'obtenir les indices. Une fois tous les indices obtenus, un dernier indice vous sera donné afin de trouver le trésor. Soyez la première équipe à trouver le trésor pour gagner la partie !
                        </p>
                    </div>
                    <div className="flex flex-row  text-lg gap-10">
                        <div className="flex flex-col gap-5">
                            <p className="font-bold text-xl">Backend</p>
                            <ul className="list-disc">
                                <li>MATHIEU Paul</li>
                                <li>GIBARU Maxence</li>
                                <li>FATRAS Edgar</li>
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
                                <li>HU Lucas</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}