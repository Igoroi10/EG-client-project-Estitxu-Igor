import socket from "./socket";

const cryptButton = (num,email) => {
    console.log("emit of crypt")
    const data = {num: num, email: email}
    socket.emit("objectRetrieval", data)
}

export default cryptButton