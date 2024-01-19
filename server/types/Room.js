const LinkedList = require('./LinkedList.js');
const ListNode = require('./LinkedList.js');

class Room {
    constructor() {
        this.drawnData = null;
        this.imageBase64 = [];
        this.users = new LinkedList();
    }

    get data() {
        obj = {
            'drawnData': this.drawnData,
            'imageBase64': this.imageBase64,
            'users': this.users
        }

        return obj;
    } 

    updateDraw(data) {
        
    }

    updateImage(data) {
        this.imageBase64.push(data);
    }

    addUser(userID) {
        this.users.set(userID);
    }

    removeUser(userID) {
        this.users.remove(userID);
    }

    
};

module.exports = Room;