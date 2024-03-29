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
        
        this.userNameMap = new Map();
    }

    get data() {

        let obj = {
            'drawnData': this.drawnData,
            'imageData': this.imageData
        }

        return obj;
    } 


    get userSize() {

        return this.userNameMap.size;

    }

    updateImage(imageData) {
        
        this.imageData[imageData.index] = imageData.data;

    }

    addImage(imageData) {
        
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
        
        for (const [mode, data] of Object.entries(drawData)) {
            if (this.isDataValid(data)) { 
                let obj = {};
                obj[mode] = data;
                this.drawnData.push(obj);
            }
        }

    }

    joinUser(socketId, userName) {

        this.userNameMap.set(socketId, userName);

    }

    leaveUser(socketId) {
        
        this.userNameMap.delete(socketId);

    }
};

module.exports = Room;
