export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Méthodes HTTP possibles
    headers?: { [key: string]: string };        // En-têtes HTTP personnalisés
    body?: unknown;                                 // Corps de la requête pour POST/PUT
};



export async  function fetchApi(
    endpoint: string,
    options: FetchOptions = {}
) {
    const defaultHeaders = {
        'Content-Type': 'application/json', // En-tête par défaut
        ...options.headers,                 // Fusionne avec les en-têtes personnalisés
    };

    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: options.method || 'GET',
            headers: defaultHeaders,
            body: options.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.error || `HTTP error! Status: ${response.status}`;
            const errorDetails = errorResponse.details || 'No details available';
            throw new Error(`${errorMessage}. Details: ${errorDetails}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch API error : ', error);
        throw error;
    }
}