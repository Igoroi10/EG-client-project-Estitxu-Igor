
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
        "imgURL": ""
    },
    search: "searching",
    artifacts: [],
    userList:[],
    rest: false,
    crypt: ["closed","closed","closed","closed"],
    insideCrypt: true
}

export default globalStateModel;