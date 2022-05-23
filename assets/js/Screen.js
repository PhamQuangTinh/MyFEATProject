import {loadOrderChildS1} from "./Main.js";

class Screen{

    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }


    get name() {
        return this._name;
    }

    loadPage(){
        if (this._id == 1){
            loadOrderChildS1(1,undefined)
        }
    }
}

export const LIST_ORDER = new Screen(1, "Danh sachs đơn hàng ĐLC1")

export const CURRENT_SCREEN = LIST_ORDER



