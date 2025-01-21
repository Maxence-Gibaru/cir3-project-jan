export const dynamic = 'force-static'
import clientPromise from '@/lib/dbConnect'


export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('sample_mflix');
        const collection = db.collection('users');
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify({ message: data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });


    } catch (error) {
        console.error('Erreur dans la récupération des données en bdd :', error);
        return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des données' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
