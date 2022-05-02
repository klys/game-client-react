import { createContext, useReducer } from "react"
import io from "socket.io-client"
import Ship from "../components/game/Ship"

export type Player = { // unused
    playerId: string
    x: number
    y: number
    angle: number
}

export type InitialStateType = {
    socket: any
    players: any[]
    playersIds: {}
}

const InitialState = {
    socket: io('http://localhost:3001'),
    players: [],
    playersIds: {}
}

enum actions {
    CONNECT = "CONNECT",
    ADD_PLAYER = "ADD_PLAYER",
    REMOVE_PLAYER = "REMOVE_PLAYER",
    MOVE_PLAYER = "MOVE_PLAYER"
}

// Actions are handle on this reducer

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case actions.CONNECT:
            return {
                ...state,
                socket: io('http://localhost:3001')
            }
        case actions.ADD_PLAYER:
            console.log("action.playerData:", action.playerData);
            console.log("state.playersIds[action.playerData.playerId]: ", state.playersIds[action.playerData.playerId])

            if (state.playersIds[action.playerData.playerId] === undefined) {
                state.players.push({jsx:<Ship playerInfo={action.playerData} key={action.playerData.playerId} />, ...action.playerData})
                state.playersIds[action.playerData.playerId] = state.players.length - 1;
            }
            console.log("state.players: ", state.players);
            console.log("state.playersIds: ", state.playersIds);
            return {
                ...state,
                players: state.players,
                playersIds: state.playersIds
            }
        case actions.REMOVE_PLAYER:
            console.log("action on REMOVE_PLAYER: ", action)
            if (state.playersIds[action.playerId] !== undefined) {
                console.log("REMOVE_PLAYER SUCCESFULL")
                state.players.splice(state.playersIds[action.playerId], 1)
                delete state.playersIds[action.playerId]
            }
            return {
                ...state,
                players: state.players,
                playersIds: state.playersIds
            }
        case actions.MOVE_PLAYER:
            if (state.playersIds[action.playerData.playerId] !== undefined) {
                state.players.splice(state.playersIds[action.playerData.playerId], 1, {jsx:<Ship playerInfo={action.playerData} key={action.playerData.playerId} />, ...action.playerData})
            }
            return {
                ...state,
                players: state.players
            }
    }
}

// Context and Provider
export const AppContext = createContext<any>({});

export const Provider = ({ children }:{children:any}) => {
    const [state, dispatch] = useReducer(reducer, InitialState);

    const api = {
        socket: state.socket,
        players: state.players,
        playersIds: state.playersIds,
        connect: () => {
            dispatch({ type: actions.CONNECT })
        },
        addPlayer: (playerData:any) => {
            dispatch({ type: actions.ADD_PLAYER, playerData })
            console.log("players map: ", state.players)
        },
        removePlayer: (playerId:any) => {
            dispatch({ type: actions.REMOVE_PLAYER, playerId })
        },
        movePlayer: (playerData:any) => {
            dispatch({ type: actions.MOVE_PLAYER, playerData })
        }
    }

    return (
        <AppContext.Provider value={api}>
            {children}
        </AppContext.Provider>
    )
}

