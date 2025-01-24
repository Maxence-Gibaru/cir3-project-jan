export type Position = {
    lat: number
    lng: number
}

export type HuntInit = {
    id: string,
    name: string,
    teams: string[][],
    stories: string[],
    markers: string[],
    hintsRevealed: string[],
    maxGuests: number,
    map: Position & { zoom: number },
}

export type Marker = {
    id?: string; // Identifiant unique pour le qr_code
    position: {
        lat: number;
        lng: number;
    };
    hint: string;
}

export type LeaderBoard = {
    teamIndex: string[],
    teamTime: number,
}