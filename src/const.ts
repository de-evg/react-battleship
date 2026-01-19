export const appRoute = {
    MAIN: `/`,
    SINGLE: `/single`
} as const;

export const GameMode = {
    IN_MENU: `IN_MENU`,
    SINGLE_ON_START: `SINGLE_ON`,
    SINGLE_SHIPS_READY: `SINGLE_SHIPS_READY`,
    ARRAGMENT: `ARRAGMENT`,
    GAME: `GAME`,
    GAME_OVER: `GAME_OVER`
} as const;

export const ShotStatus = {
    HIT: `HIT`,
    DESTROY: `DESTROY`,
    MISS: `MISS`
} as const;

export const Winner = {
    FIRST_PLAYER: `FIRST_PLAYER`,
    SECOND_PLAYER: `SECOND_PLAYER`
} as const;

export type GameModeType = typeof GameMode[keyof typeof GameMode];
export type ShotStatusType = typeof ShotStatus[keyof typeof ShotStatus];
export type WinnerType = typeof Winner[keyof typeof Winner];
