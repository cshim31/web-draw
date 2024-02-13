const LinkedList = require('./LinkedList.js');
const ListNode = require('./LinkedList.js');

class Room {
    constructor() {
        this.drawnData = {};
        this.imageData = {};
        this.users = new LinkedList();
    }

    get data() {
        obj = {
            'drawnData': this.drawnData,
            'imageData': this.imageData,
            'users': this.users
        }

        return obj;
    } 

    getImageID = (imageBase64) => {
        return imageBase64.toString(16).slice(2);
    }


    updateImage(imageData) {
        let imageID = this.getImageID(imageData.imageBase64);
        imageData[imageID] = imageData;
    }


    addDraw(data) {
        data.forEach((mode) => {
            // TODO: figure out way to set different props for each drawing
            // Package props and coordinates (x,y) as an object
            // Each appended to array in mode
            drawnData[mode].append(data);
        })
    }

    addImage(imageData) {
        let imageID = this.getImageID(imageData.imageBase64);
        this.imageData[imageID] = imageData;
    }

    addUser(userID) {
        this.users.set(userID);
    }

    removeUser(userID) {
        this.users.remove(userID);
    }

    
};

module.exports = Room;
