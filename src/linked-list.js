const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        console.log("append ok");
        var node = new Node(data);
        if (this.length) {
            this._tail.next = node;// добавление в конец списка так как длина больше 1 
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;// ссылка на один элемент 
            this._tail = node;
        }
        this.length++;
        return this;    
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var temp;
        temp = this._head;
        while(index > 0){
            index--;
            temp = temp.next;// передвигаюсь к указанному индексу и чтобы не затерлось this._head
        }
        return temp.data;
    }

    insertAt(index, data) {
        console.log("insert at ok");
        var temp;
        temp = this._head;
        while(index > 1){
            index--;
            temp = temp.next;
        }// сдвигаю на одну позицию ДО чтобы element встал в index

        var node = new Node(data);
        if(this._head.next){
            console.log("insert at ok1");
            var next_temp_ref = temp.next;// запоминаю ссылку потому что затрется 
            console.log("insert at ok2");
            temp.next = node;
            console.log("insert at ok3");
            temp.next.prev = temp;// связываю с пред элементом
            console.log("insert at ok4");
            temp.next.next = next_temp_ref;// связываю со след элементом
            console.log("insert at ok5");
            temp.next.next.prev = temp.next; // связываю след эл с текущим c помощью обратной ссылки 
            console.log("insert at ok6");
            this.length++;
        }else{
            this._head = node;// ссылка на один элемент 
            this._tail = node;
            this.length++;
        }   
       
    }

    isEmpty() {
        if(this.length) return false;
        else return true;
    }

    clear() {
        console.log("clear ok");
        this._tail.data = null;
        this._head.data = null;
        this._tail.next = null;
        this._tail.prev = null;
        this._head.next = null;
        this._head.prev = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
          console.log("deleteAt ok1");
        var temp;
        temp = this._head;
        while(index > 1){
            index--;
            temp = temp.next;
        }//также перед удаляемым
        console.log("deleteAt ok2");
        
        if(temp.next && temp.next.next){
            temp.next = temp.next.next;
            console.log("deleteAt ok3");
            temp.next.next.prev = temp;
        }else{
            this._tail.data = null;// тогада элемент один удаляю все
            this._head.data = null;
            this._tail.next = null;
            this._tail.prev = null;
            this._head.next = null;
            this._head.prev = null;
        }
        

        console.log("deleteAt ok4");
        this.length--;

        return this;   
    }

    reverse() {
        console.log("reverse ok");
        var current = this._head;// меняю местами head и tail
        this._head = this._tail;
        this._tail = current;

        var temp ;

        current = this._head;
        while (current)
        {
            temp = current.prev;// меняю местами ссылки
            current.prev = current.next;
            current.next = temp;
            current = current.next; // сдвигаюсь так как ссылки уже поменены
        }
        return this;     
    }

    indexOf(data) {
        var index = 0;
        var temp;
        var flag = false;
        temp = this._head;
        while(temp){

            if(temp.data === data){
                flag = true;
                break;
            }
            index++;
            temp = temp.next;
        }
        if(flag)
        return index;
        else return -1; 

    }
}

module.exports = LinkedList;
