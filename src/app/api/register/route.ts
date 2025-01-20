export const dynamic = 'force-static'
import clientPromise from '@/lib/dbConnect'
import bcrypt from 'bcrypt';

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

        const hashedPassword = await bcrypt.hash(formData.password, 10);

        formData.password = hashedPassword;

        const result = await collection.insertOne(formData);

        console.log('Données insérées avec succès :', result);

        return new Response(JSON.stringify({ message: 'Formulaire soumis avec succès !' }), {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);

        return new Response(JSON.stringify({ error: 'Une erreur est survenue lors de la soumission.' }), {
            status: 500,
            headers,
        });
    }
}
