export const dynamic = 'force-static'
import clientPromise from '@/lib/dbConnect'
import bcrypt from 'bcrypt';


/* async function authenticateUser(email, password) {

} */


export async function POST(request: Request) {
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    });



    try {

        const formData = await request.json();

        const client = await clientPromise;
        const db = client.db('sample_mflix');
        const collection = db.collection('users');

        const { email, password } = formData;

        /* const user = await authenticateUser(email, password); */


        const user = await collection.findOne({ email });


        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Identifiants invalides.' }),
                { status: 401, headers }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return new Response(
                JSON.stringify({ message: 'Connection failed !', loggedIn: false }),
                { status: 200, headers }
            );
        }
        return new Response(
            JSON.stringify({ message: 'Connexion réussie !', loggedIn: true }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);

        // Réponse en cas d'erreur serveur
        return new Response(
            JSON.stringify({ error: 'Une erreur est survenue. Veuillez réessayer.' }),
            { status: 500, headers }
        );
    }
}
