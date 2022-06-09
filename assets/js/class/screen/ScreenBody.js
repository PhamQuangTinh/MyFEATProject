import * as command from "../../Command.js";

export class ScreenBody {

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

    removeCurrentScreenElement(isNeedToRemoveHeader, isNeedToRemoveFilter){
        // if (isNeedToRemoveHeader){
        //     command.removeElementsByClassName("content__header-value")
        // }
        if(isNeedToRemoveFilter){
            command.removeElementsByClassName("content__filter-child-show")
        }

        if(isNeedToRemoveHeader){
            command.removeElementsByClassName("content__header-title-value")
        }

        command.removeElementsByClassName("content__table__body", "pagination__children")

    }

    loadPage(page, previousPage){
    }

    loadPageWidthDefaultFilter(){

    }

    loadDefaultFilter(){

    }

    createTitleBody(element){

    }
}



