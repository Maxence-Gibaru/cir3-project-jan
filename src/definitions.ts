export type Position = {
    lat: number
    lng: number
}

export type HuntIntro = {
    text: string,
    hint: string,
    map: Position & { zoom: number },
}

export type HuntMarker = {
    position: Position,
    hint: string,
    story: string
}