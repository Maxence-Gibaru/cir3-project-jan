export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Possible HTTP methods
    headers?: { [key: string]: string };        // Custom HTTP headers
    body?: unknown;                             // Request body for POST/PUT
    params?: { [key: string]: string | number }; // URL parameters
};

export async function fetchApi(
    endpoint: string,
    options: FetchOptions = {}
) {
    const defaultHeaders = {
        'Content-Type': 'application/json', // Default header
        ...options.headers,                 // Merge with custom headers
    };

    /* const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Ensure you have a base URL */
    const baseUrl = 'https://onepisen.vercel.app/';
    let url = `${baseUrl}/api/${endpoint}`;  // Full URL combining baseUrl and endpoint

    if (options.params) {
        const params = new URLSearchParams();
        for (const key in options.params) {
            params.append(key, options.params[key].toString());
        }
        url += '?' + params.toString();
    }

    try {
        const response = await fetch(url, {
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
        console.error('Fetch API error: ', error);
        throw error;
    }
}
