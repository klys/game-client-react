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
    projectiles: any[]
    mouse: {}
    map:any
    pointerAngle:number
}

const InitialState = {
    socket: io('http://localhost:3001'),
    players: [],
    playersIds: {},
    projectiles:[],
    mouse:{x:-1,y:-1},
    map:undefined,
    pointerAngle: 0,
    life: 0,
    waiting:false
}

enum actions {
    CONNECT = "CONNECT",
    ADD_PLAYER = "ADD_PLAYER",
    REMOVE_PLAYER = "REMOVE_PLAYER",
    MOVE_PLAYER = "MOVE_PLAYER",
    ADD_PROJECTIL = "ADD_PROJECTIL",
    REMOVE_PROJECTIL = "REMOVE_PROJECTIL",
    MOVE_PROJECTIL = "MOVE_PROJECTIL",
    SET_MOUSE = 'SET_MOUSE',
    SET_MAP = 'SET_MAP',
    SET_POINTERANGLE = 'SET_POINTERANGLE',
    SET_LIFE = 'SET_LIFE',
    START_WAIT = 'START_WAIT',
    STOP_WAIT = 'STOP_WAIT'
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
        case actions.ADD_PROJECTIL:
            if(state.projectiles.find((projectil: { id: any }) => projectil.id == action.projectilData.id) == undefined) {
                // not projectil with such id found
                // so we proceed to add it
                state.projectiles.push(action.projectilData)
            }
            return {
                ...state,
                projectiles:state.projectiles
            }
        case actions.MOVE_PROJECTIL:
            const projIndex = state.projectiles.findIndex((projectil: { id: any }) => projectil.id == action.projectilData.id); 
            if(projIndex != -1) {
                state.projectiles[projIndex] = action.projectilData;
            }
            return {
                ...state,
                projectiles:state.projectiles
            }
        case actions.REMOVE_PROJECTIL:
            const delIndex = state.projectiles.findIndex((projectil: { id: any }) => projectil.id == action.projectilData.id);
            if(delIndex != -1) {
                state.projectiles.splice(delIndex,1);
            }
            return {
                ...state,
                projectiles:state.projectiles
            }
        case actions.SET_MOUSE:
            return{
                ...state,
                mouse:action.mouseData
            }
        case actions.SET_MAP: // unused
            return{
                ...state,
                map:action.mapRef
            }
        case actions.SET_POINTERANGLE:
            return {
                ...state,
                pointerAngle:action.pointerAngle
            }
        case actions.SET_LIFE: // not working
            console.log("action.SET_LIFE on execution! ", action.life)
            return {
                ...state,
                life:action.life
            }
        case actions.START_WAIT:
            return{
                ...state,
                waiting:true
            }
        case actions.STOP_WAIT:
            return {
                ...state,
                waiting:false
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
        projectiles: state.projectiles,
        mouse:state.mouse,
        map:state.map,
        pointerAngle:state.pointerAngle,
        life:state.life ?? 100,
        waiting:state.waiting ?? false,
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
        },
        addProjectil: (projectilData:any) => {
            console.log("projectil add")
            dispatch({type: actions.ADD_PROJECTIL, projectilData})
        },
        moveProjectil: (projectilData:any) => {
            dispatch({type: actions.MOVE_PROJECTIL, projectilData})
        },
        removeProjectil: (projectilData:any) => {
            dispatch({type: actions.REMOVE_PROJECTIL, projectilData})
        },
        setMouse: (mouseData:{}) => {
            dispatch({type: actions.SET_MOUSE, mouseData})
        },
        setMap: (mapRef:any) => { // unused
            dispatch({type: actions.SET_MAP, mapRef})
        },
        setPointerAngle: (pointerAngle:number) => {
            dispatch({type: actions.SET_POINTERANGLE, pointerAngle})
        },
        setLife: (life:number) => {
            console.log("Dispatching setLife")
            dispatch({type: actions.SET_LIFE, life})
        },
        startWait: () => {
            dispatch({type: actions.START_WAIT})
        },
        stopWait: () => {
            dispatch({type: actions.STOP_WAIT})
        }
    }

    return (
        <AppContext.Provider value={api}>
            {children}
        </AppContext.Provider>
    )
}

