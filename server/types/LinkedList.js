const ListNode = require('./ListNode.js');
class LinkedList {
    constructor(head = null) {
        this.head = head
    }

    size() {
        if (!this.head) return 0;

        let count = 1;
        let node = this.head;

        while (node.next) {
            count++;
            node = node.next;
        }

        return count;
    }

    clear() {
        this.head = null;

        return ;
    }

    set(val) {

        if (!this.head) {
            this.head = new ListNode(val);
            return ;
        }

        if (!this.contains(val)) {
            let node = this.getLast();
            node.next = new ListNode(val);
        }

        return ;
    }

    remove(val) {
        let prev_node = null;
        let current_node = this.head;

        while (current_node) {
            if (current_node.val == val) {
                prev.next = current_node.next;
                
                return;
            }

            else {
                prev = current_node;
                current_node = current_node.next;
            }
        }

        return;
    }

    getLast() {

        if (!this.head) return null;

        let node = this.head;

        while (node.next) {
            node = node.next;
        }

        return node;
    }

    getFirst() {
        return this.head;
    }

    contains(val) {
        let node = this.head;
        
        while (node && node.val != val) {
            node = node.next;
        }

        if (!node) return false;

        if (node.val == val) return true;

        return false;
    }
}

module.exports = LinkedList;
