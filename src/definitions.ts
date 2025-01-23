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