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
        this.drawData = [];

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
        
        /*
            Map<socketId, userName>
        */
        this.userNameMap = new Map();
    }

    get data() {

        let obj = {
            'drawData': this.drawData,
            'imageData': this.imageData
        }

        return obj;
    } 


    get userSize() {

        return this.userNameMap.size;

    }

    updateImage(imageData) {
        
        this.imageData[imageData.index] = imageData.data;
        console.log(imageData);
    }

    addImage(imageData) {
        this.imageData.push(imageData);
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
                this.drawData.push(obj);
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
