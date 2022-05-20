import * as command from './Command.js'
import {FILTER_DATE_DISTANCE} from "./util/Detail.js";
import {getDateFromMillisecond, plusDateMillisecond} from "./util/DateUtil.js";
import Api from "./util/api/get/Api.js";
import CURRENT_DOMAIN from "./util/Domain.js";
import {ADMIN_SERVICE} from "./util/Service.js";
import {GET_ORDER_DETAIL, GET_LIST_ORDER_S1, GET_LIST_ORDER_STATUS} from "./util/api/RequestMapping.js";
import {htmlToElement} from "./Command.js";

command.saveTokenToLocalStorage("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGJjQGdtYWlsLmNvbSIsImlkIjoxMjEsImVtYWlsIjoiYWRiY0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoiQWRtaW4gSGnhur91IDIxMzEyMyIsInVzZXJuYW1lIjoiYWRtaW5oaWV1IiwiZXhwIjoxNjUzMTExMzA4fQ.ytWZq6hQmqk6ju07dXKHxLsbCXiGNijzOmhT8QZ4G50")
setDefaultFilter();
loadOrderChildS1(1);
function setDefaultFilter(){
    let filterDate = document.querySelectorAll(".content__filter-date input");
    if(filterDate !== undefined && filterDate !== null){
        let dateNow = Date.now()
        filterDate[0].defaultValue = getDateFromMillisecond(dateNow, "#YYYY#-#MM#-#DD#")
        filterDate[1].defaultValue = getDateFromMillisecond(plusDateMillisecond(Date.now(), FILTER_DATE_DISTANCE), "#YYYY#-#MM#-#DD#")
    }
    loadFilterUserAgency();
    loadFilterOrderStatus();
}

export function loadOrderChildS1(page ,previousPage) {
    if (previousPage === undefined || previousPage != page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let content = document.getElementsByClassName("content__table");
                command.removeElementsByClassName("content__table__body", "pagination__children")
                const response = JSON.parse(this.responseText);
                if (response.code === 1) {
                    let pageSize = response.data.page_size;
                    let totalRecord = response.data.total_record;
                    let resultLength = response.data.order.length
                    for (let i = 0; i < resultLength; i++) {
                        let item = response.data.order[i];
                        let value = `
                        <td>
                            <div class="content__table__header__button-all">
                                <label class="checkbox-button">
                                    <input type="checkbox" class="checkbox-button__input">
                                    <span class="checkbox-button__control"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <span>${i + 1}</span>
                        </td>
                        <td>
                            <span>${getDateFromMillisecond(item.create_date)}</span>
                        </td>
                        <td>
                            <span>${item.user_agency_name}</span>
                        </td>
                        <td>
                            <span>${item.user_agency_code}</span>
                        </td>
                        <td>
                            <span>${item.membership_name}</span>
                        </td>
                        <td>
                            <span>${item.order_code}</span>
                        </td>
                        <td>
                            <span>${item.total_money}</span>
                        </td>
                        <td>
                            <span>${item.status_name}</span>
                        </td>
                        <td>
                            <span>${getDateFromMillisecond(item.receive_order_time)}</span>
                        </td>
                        <td>
                            <span>${item.status_priority}</span>
                        </td>
                        <td>
                            <span>${item.order_creator}</span>
                        </td>
                        <td>
                            <span>${item.agency_name}</span>
                        </td>
                `
                        let entry = command.htmlToElement(value, "tr", "content__table__body");
                        content[0].appendChild(entry)
                    }
                    setWidthForColumnTable();
                    command.loadPagination(totalRecord, pageSize, page);
                }else{
                    console.log(response.error)
                }
            }
        };
        const params = new Map();
        params.set("startValue", 1649955600000)
        params.set("endValue", 1652633999999)
        params.set("page", page)
        params.set("status", 0)
        params.set("search", '')
        params.set("user_agency_id", 0)
        params.set("membership_id", 0)
        params.set("from_date_temp", 1649955600000)
        params.set("to_date_temp", 1652633999999)
        let api = new Api(CURRENT_DOMAIN, ADMIN_SERVICE, GET_ORDER_DETAIL)
        let url = api.getAPIUrlGetMethod(params)
        command.sendGetMethod(xhttp, url);
    }
}

function loadFilterUserAgency(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.code === 1) {
                let content = document.getElementById("user__input");
                let listContent = content.getElementsByTagName("ul")
                const firstChild = htmlToElement(`
                       <span>Tất cả</span>
                   `, "li", "content__filter-child__drop-down__item"
                );
                firstChild.onclick = function (){
                    chooseItem("user__input","Tất cả", 0)
                }
                listContent[0].appendChild(
                    firstChild
                )
                let resultLength = response.data.list_s1.length
                for (let i = 0; i < resultLength; i++) {
                    let item = response.data.list_s1[i];
                    let value = `
                           <span>${item["shop_name"]}</span>
                       `
                    let entry = command.htmlToElement(value, "li", "content__filter-child__drop-down__item");
                    entry.onclick = function (){
                        chooseItem("user__input" ,item["shop_name"], item["id"])
                    }
                    listContent[0].appendChild(entry)
                }
                content.onclick = function (){
                    clickDropdown(this.id)
                }
            }else{
                console.log(response.error)
            }
        }
    };
    const params = new Map();
    params.set("id_agency", 0)
    let api = new Api(CURRENT_DOMAIN, ADMIN_SERVICE, GET_LIST_ORDER_S1)
    let url = api.getAPIUrlGetMethod(params)
    command.sendGetMethod(xhttp, url);
}

function loadFilterOrderStatus(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.code === 1) {
                let content = document.getElementById("status__input");
                let listContent = content.getElementsByTagName("ul")
                const firstChild = htmlToElement(`
                       <span>Tất cả</span>
                   `, "li", "content__filter-child__drop-down__item"
                );
                firstChild.onclick = function (){
                    chooseItem("status__input","Tất cả", 0)
                }
                listContent[0].appendChild(
                    firstChild
                )
                let resultLength = response.data.order_status.length
                for (let i = 0; i < resultLength; i++) {
                    let item = response.data.order_status[i];
                    let value = `
                           <span>${item["name"]}</span>
                       `
                    let entry = command.htmlToElement(value, "li", "content__filter-child__drop-down__item");
                    entry.onclick = function (){
                        chooseItem("status__input",item["name"], item["id"])
                    }
                    listContent[0].appendChild(entry)
                }
                content.onclick = function (){
                    clickDropdown(this.id)
                }
            }else{
                console.log(response.error)
            }
        }
    };
    const params = new Map();
    let api = new Api(CURRENT_DOMAIN, ADMIN_SERVICE, GET_LIST_ORDER_STATUS)
    let url = api.getAPIUrlGetMethod(params)
    command.sendGetMethod(xhttp, url);
}


function loadFilterMembership(parentIdName, childIdName){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.code === 1) {
                command.loadFilterChild(response, parentIdName, childIdName)
            }else{
                console.log(response.error)
            }
        }
    };
    const params = new Map();
    let api = new Api(CURRENT_DOMAIN, ADMIN_SERVICE, GET_LIST_ORDER_STATUS)
    let url = api.getAPIUrlGetMethod()
    command.sendGetMethod(xhttp, url);
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
function setWidthForColumnTable(){
    let elementChildren = document.getElementsByClassName("content__table__header")[0].children;
    const lengthElement = elementChildren.length;
    const withElement = 100 / lengthElement + 2 + '%';
    for(let i = 2; i < lengthElement; i++){
        elementChildren[i].style.width = withElement;
    }
}
