import * as command from './Command.js'
import {FILTER_DATE_DISTANCE} from "./util/Detail.js";
import {getDateFromMillisecond, plusDateMillisecond} from "./util/DateUtil.js";
import Api from "./util/api/get/Api.js";
import CURRENT_DOMAIN from "./util/Domain.js";
import {ADMIN_SERVICE} from "./util/Service.js";
import {GET_ORDER_DETAIL} from "./util/api/RequestMapping.js";

command.saveTokenToLocalStorage("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGJjQGdtYWlsLmNvbSIsImlkIjoxMjEsImVtYWlsIjoiYWRiY0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoiQWRtaW4gSGnhur91IDIxMzEyMyIsInVzZXJuYW1lIjoiYWRtaW5oaWV1IiwiZXhwIjoxNjUzMDI0MTgxfQ.MiV7ZKsquSExOuYqgier7yOhYdf_LCZEbCK7tnxgcMY")
setDefaultFilter();
loadOrderChildS1(1);

function setDefaultFilter(){
    let filterDate = document.querySelectorAll(".content__filter-date input");
    if(filterDate !== undefined && filterDate !== null){
        let dateNow = Date.now()
        filterDate[0].defaultValue = getDateFromMillisecond(dateNow, "#YYYY#-#MM#-#DD#")
        filterDate[1].defaultValue = getDateFromMillisecond(plusDateMillisecond(Date.now(), FILTER_DATE_DISTANCE), "#YYYY#-#MM#-#DD#")
    }
}

export function loadOrderChildS1(page ,previousPage) {
    if (previousPage === undefined || previousPage != page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let content = document.getElementsByClassName("content__table");
                command.removeElementsByClassName("content__table__body", "pagination__children")
                const response = JSON.parse(this.responseText);
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
        let url1 = new Api(CURRENT_DOMAIN, ADMIN_SERVICE, GET_ORDER_DETAIL)
        let url2 = url1.getAPIUrlGetMethod(params)
        command.sendGetMethod(xhttp, url2);
    }
}

function setWidthForColumnTable(){
    let elementChildren = document.getElementsByClassName("content__table__header")[0].children;
    const lengthElement = elementChildren.length;
    const withElement = 100 / lengthElement + 2 + '%';
    for(let i = 2; i < lengthElement; i++){
        elementChildren[i].style.width = withElement;
    }
}
