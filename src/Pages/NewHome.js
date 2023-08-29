//import 
/*
function NewHome() {
    const [gameLobby, setGameLobby] = useState(false)
    const [ready, setReady] = useState(false)
    const [isHost, setIsHost] = useState(false)

    //only need a component for lobby, everything else can be done right here
    return (
        <div>
            <h1 className="header">Uninformed Reckoning</h1>
            <div className="home-body">
                {gameLobby ? (
                    <Lobby
                        setGameLobby={setGameLobby}
                    />
                ) : (
                    <>
                    hi
                    </>
                )}
            </div>
        </div>>
    );
}


/*
//don't do user/initializing room stuff in lobby component aside from name and round and time
//player stuff in utils

export const HomePage

export const Lobby = (setGameLobby, isHost, handle navigating, setName, setTime, setRounds) => {
    const [numReady, setNumReady] = useState(?)
    const [numPlayers, setNumPlayers] = useState(?)
    return (
        <div>
            <div className="ready-info"
            {(numReady === numPlayers) ? (
                <div>Waiting for host</div>
            ) : (
                <div>(numReady + "/" numPlayers) ready}</div>
            )}
            </div>
            <div className="name-form">
            {isHost? (
                slider stuff eventually, for now do forms
            ) : ()}
                <div>
                    {(isHost && (numReady === numPlayers) ? (
                        button
                    ) : (
                        <form (if isready = true do grayed out className, if not, do different classnamed)>
                            <input onEnter(how do i do this)(if ready equals false)>Enter Name</input>
                        </form>
                    )}
                </div>
            </div>
        <div>
    )
}


*/

export default NewHome;