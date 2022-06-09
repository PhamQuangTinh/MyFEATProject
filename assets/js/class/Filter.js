import {GET_DROP_LIST_MEMBERSHIP, GET_DROP_LIST_ORDER_STATUS, GET_LIST_ORDER_S1} from "../util/api/GetMapping.js";
import * as command from "../Command.js";
import {getDateFromMillisecond, getMillisecondFromDate, minusDateMillisecond} from "../util/DateUtil.js";
import {FILTER_DATE_DISTANCE} from "../util/Detail.js";
import {CURRENT_SCREEN, loadScreenBody} from "./screen/ScreenValue.js";
export class Filter {
    constructor(dataName, parentIdName, fieldName, api) {
        this._parentIdName = parentIdName;
        this._api = api;
        this._dataName = dataName;
        this._fieldName = fieldName;
    }

    loadFilterChild(){
        if (this == FilterType.FILTER_DATE){
            this.loadFilterDate()
        } else if(this == FilterType.FILTER_SEARCH){
          this.loadFilterSearch()
        } else {
            this.filterDropdown();
        }
    }

    filterDropdown() {
        const filterName = this.getFilterName();
        let filter = `
                    <div class="content__filter-child-show">
                        <div id="${this.parentIdName}" filter-name = "${filterName}" class="content__filter-input">
                            <span title="0">Tất cả</span>
                            <div>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>

                            <ul class="content__filter-child__drop-down drop_up">
                            </ul>
                        </div>
                    </div>
        `
        let entry = command.htmlToElement(filter, "div", "content__filter-child");
        let element = document.getElementsByClassName("content__filter");
        element[0].appendChild(entry)
        const xhttp = new XMLHttpRequest();
        const dataName = this._dataName
        const parentIdName = this._parentIdName
        const fieldName = this._fieldName
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(this.responseText);
                if (response.code === 1) {
                    let listResponse = response.data[dataName]
                    let content = document.getElementById(parentIdName);
                    let listContent = content.getElementsByTagName("ul")
                    const firstChild = command.htmlToElement(
                        `
                                    <span>Tất cả</span>
                                `
                        , "li", "content__filter-child__drop-down__item"
                    );
                    firstChild.onclick = function () {
                        chooseItem(parentIdName, "Tất cả", 0)
                        loadScreenBody(CURRENT_SCREEN)
                    }
                    listContent[0].appendChild(
                        firstChild
                    )
                    let resultLength = listResponse.length
                    for (let i = 0; i < resultLength; i++) {
                        let item = listResponse[i];
                        let value = `
                           <span>${item[fieldName]}</span>
                       `
                        let entry = command.htmlToElement(value, "li", "content__filter-child__drop-down__item");
                        entry.onclick = function () {
                            chooseItem(parentIdName, item[fieldName], item["id"])
                            loadScreenBody(CURRENT_SCREEN)
                        }
                        listContent[0].appendChild(entry)
                    }
                    content.onclick = function () {
                        clickDropdown(parentIdName)
                    }
                } else {
                    console.log(response.error)
                }
            }
        };
        command.sendGetMethod(xhttp, this._api);
    }

    loadFilterSearch(){
        let keySearch = document.querySelector(".searchbar input")
        keySearch.addEventListener("keydown", event => {
            if (event.keyCode == 13){
                loadScreenBody(CURRENT_SCREEN)
            }
        });
    }

    loadFilterDate() {

        let dateNow = Date.now()
        let startDate = getDateFromMillisecond(minusDateMillisecond(dateNow, FILTER_DATE_DISTANCE), "#YYYY#-#MM#-#DD#")
        let endDate = getDateFromMillisecond(dateNow, "#YYYY#-#MM#-#DD#")
        let filterDate = `
                <div class="content__filter-child-show">
                    <span>Từ ngày</span>
                    <div class="content__filter-date">
                        <input placeholder="Start" value="${startDate}" type="date">
                    </div>
                    <span style="margin: 0px; padding: 0px 10px;">-</span>
                    <div class="content__filter-date">
                        <input placeholder="End" value="${endDate}" type="date">
                    </div>
                </div>
        `
        let entry = command.htmlToElement(filterDate, "div", "content__filter-child-show");
        let element = document.getElementsByClassName("content__filter");
        if (element[0] === undefined || element[0] === null){
            element = command.htmlToElement("", "div", "content__filter")
        }
        element[0].appendChild(entry)

        let filterDateInput = document.querySelectorAll(".content__filter-date input");
        if (filterDateInput !== undefined && filterDateInput !== null) {
            let dateNow = Date.now()
            filterDateInput[0].defaultValue = getDateFromMillisecond(minusDateMillisecond(Date.now(), FILTER_DATE_DISTANCE), "#YYYY#-#MM#-#DD#")
            filterDateInput[1].defaultValue = getDateFromMillisecond(dateNow, "#YYYY#-#MM#-#DD#")
            filterDateInput[0].onchange = function (){
                loadScreenBody(CURRENT_SCREEN)
            }
            filterDateInput[1].onchange = function (){
                loadScreenBody(CURRENT_SCREEN)
            }
        }
    }

    getFilterValue() {
        const idName = this.parentIdName
        let checkSelector = '#' + idName + " span"
        let item = document.querySelector(checkSelector)
        return item.title
    }

    getFilterDate() {
        let filterDate = document.querySelectorAll(".content__filter-date input");
        return {
            "dateFrom": getMillisecondFromDate(filterDate[0].value + " 00:00:00"),
            "dateTo": getMillisecondFromDate(filterDate[1].value + " 23:59:59")
        }
    }

    getSearchValue(){
        let keySearch = document.querySelector(".searchbar input").value
        if(keySearch === undefined || keySearch === null){
            keySearch = ''
        }
        return keySearch
    }

    getFilterName() {

        switch (this) {
            case FilterType.USER_AGENCY:
                return "Đại lý";
            case FilterType.ORDER_STATUS:
                return "Trạng thái";
            case FilterType.MEMBERSHIP:
                return "Cấp bậc"
        }
    }

    get dataName() {return this._dataName;}
    get parentIdName() {return this._parentIdName;}
    get fieldName() {return this._fieldName;}
    get api() {return this._api;}
    set api(value) {this._api = value;}
}


function clickDropdown(idName){
    const checkSelector = '#' + idName + " ul"
    let item = document.querySelector(checkSelector)
    const className = item.className
    if (className.includes("drop_down")){
        item.className = className.replace("drop_down", "drop_up")
    }else if(className.includes("drop_up")){
        item.className = className.replace("drop_up", "drop_down")
    }else{
        item.className += " drop_down"
    }

}

function chooseItem(idParent,name, idChild){
    const checkSelector = '#' + idParent + " span"
    let item = document.querySelector(checkSelector)
    item.textContent = name
    item.title = idChild
}

export const FilterType = {
    "USER_AGENCY": new Filter("list_s1","user__input", "shop_name", GET_LIST_ORDER_S1),
    "ORDER_STATUS": new Filter("order_status","status__input", "name", GET_DROP_LIST_ORDER_STATUS),
    "MEMBERSHIP": new Filter("membership","membership__input", "name", GET_DROP_LIST_MEMBERSHIP),
    "FILTER_DATE": new Filter("","", ""),
    "FILTER_SEARCH": new Filter("","", ""),
}
