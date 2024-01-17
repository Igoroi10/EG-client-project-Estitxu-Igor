
const globalStateModel = {
    user: {
        "name": "",
        "email": "",
        "rol": "",
        "logState": false,
        "towerAccess": false,
        "characterMainData": {},
        "characterStats": {},
        "diseases": {},
        "imgURL": "",
        "inventory": []
    },
    search: "searching",
    artifacts: [],
    userList:[],
    rest: false,
    crypt: ["opened","closed","closed","opened"],
    insideCrypt: true,
    items: []
}

export default globalStateModel;