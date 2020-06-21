export interface Note {
    id: number;
    title: string;
}

export interface State {
    notes: Note[];
    loadingNotes: boolean;
}

export const State: State = {
    notes: [],
    loadingNotes: false
}
