export enum StatusInidicator {
    GET = 'GET',
    FAILED = 'FAILED',
    LOADING = 'LOADING',
}

export type FetchAction = {
    type: StatusInidicator;
    payload: any;
}

export type TState = {
    data: [];
    isLoading: boolean;
    error?: string | null;
}

export const initialState: TState = {
    data: [],
    isLoading: false,
    error: null,
};

export type Userid = {
    id: string;
}

export default function fetchReducer(state: TState = initialState, action: FetchAction) {
    switch (action?.type) {
        case StatusInidicator.GET:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null
            };
        case StatusInidicator.FAILED:
            return {
                ...state,
                error: "An error occurred"
            };
        case StatusInidicator.LOADING:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        default:
            return state;
    }
}
