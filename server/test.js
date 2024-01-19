
/*
    return true if size of the list matches given size
*/
function testSize(list, size) {
    
    return list.size() == size;
};

/*
    return true if head node points to null
*/
function testClear(list) {
    
    list.clear();

    return list.head == null;
};

/*
    return true if the node matches end node
*/
function testGetLast(list, node) {
    

    return list.getLast() === node;
};

/*
    return true if the node matches first node
*/
function testGetFirst(list, node) {
    
    return list.getFirst() == node;
};

/*
    return true if the list contains the given value
*/
function testContains(list, val) {
    
    return list.contains(val);
}

/*
    return true if the list set the given value
*/
function testSet(list, val) {
    
    list.set(val);

    return list.contains(val);
}


/*
    return true if the list removed the given value
*/
function testRemove(list, val) {
    
    list.remove(val);

    return !list.contains(val);
}

const ListNode = require('./types/ListNode.js');
const LinkedList = require('./types/LinkedList.js');

const list = new LinkedList();

test("********Set Test********", () => {
    expect(testSet(list,1)).toBe(true);
});

test("********Contains Test********", () => {
    expect(testContains(list,1)).toBe(true);
});

const node1 = new ListNode(1);
test("********GetFirst Test********", () => {
    expect(testGetFirst(list,node1)).toBe(false);
});

const node2 = new ListNode(1);
test("********GetLast Test********", () => {
    expect(testGetLast(list,node2)).toBe(false);
});
test("********Clear Test********", () => {
    expect(testClear(list)).toBe(true);
});
test("********Size Test********", () => {
    expect(testSet(list,1)).toBe(true);
    expect(testSet(list,2)).toBe(true);
    expect(testSet(list,3)).toBe(true);
    expect(testSet(list,4)).toBe(true);
    expect(testSet(list,5)).toBe(true);
    expect(testSize(list,5)).toBe(true);
});