const LinkedList = require('./LinkedList.js');
const ListNode = require('./LinkedList.js');

class Room {
    constructor() {
       /*
        [
            {
                mode: {
                    props: {},
                    x: [],
                    y: [],
                }
            }, ...
        ]
        */
        this.drawnData = [];

        /*
        [
            {
                base64: ,
                width: ,
                height: ,
                x: ,
                y: ,
            }, ...
        ]
        */
        this.imageData = [];

        this.users = new LinkedList();
        /*
            Map<socketId, userId>
        */
        this.userIdMap = new Map();
    }

    get data() {
        let obj = {
            'drawnData': this.drawnData,
            'imageData': this.imageData,
            'users': this.users
        }

        return obj;
    } 

    updateImage(imageData) {
        // TODO: Deal with how to update with image based on object structure from client
        console.log("DEBUG::image update received %s", imageData.index);
        this.imageData[imageData.index] = imageData.data;
    }

    addImage(imageData) {
        // TODO: Deal with how to update with image based on object structure from client
        console.log("DEBUG::image update received");
        
        this.imageData.push(imageData);
        console.log(imageData);
    }

    isDataValid(drawData) {
        if (drawData.x.length < 1 && drawData.y.length < 1) {
            return false;
        }

        return true;
    }

    addDraw(drawData) {
        // TODO: figure out way to set different props for each drawing
        // Package props and coordinates (x,y) as an object
        // Each appended to array in mode
        console.log("DEBUG::draw add received:  %s", JSON.stringify(drawData));
        
        for (const [mode, data] of Object.entries(drawData)) {
            if (this.isDataValid(data)) { 
                let obj = {};
                obj[mode] = data;
                this.drawnData.push(obj);
            }
        }
        
        console.log(Object.values(this.drawnData));
    }

    addUser(userId) {
        this.users.set(userId);
    }

    removeUser(userId) {
        this.users.remove(userId);
    }

    
};

module.exports = Room;
