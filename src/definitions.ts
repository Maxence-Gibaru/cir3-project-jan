export type Position = {
    lat: number
    lng: number
}

export type HuntInit = {
    id: string,
    name: string,
    teams: string[][],
    introduction_story: string,
    max_guests: number,
    max_teams: number,
    map: Position & { zoom: number },
}

export type HuntMarker = {
    position: Position,
    hint: string,
    story: string
}