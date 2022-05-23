import * as command from './Command.js'
import {getDateFromMillisecond} from "./util/DateUtil.js";
import {ApiUtil} from "./util/api/ApiUtil.js";
import {
    GET_ORDER_DETAIL,
    GET_LIST_ORDER_S1,
} from "./util/api/GetMapping.js";

import * as Filter from './class/Filter.js'

const filterUser = Filter.FilterType.USER_AGENCY;
const filterMembership = Filter.FilterType.MEMBERSHIP;
const filterOrderStatus = Filter.FilterType.ORDER_STATUS;
const filterDate = Filter.FilterType.FILTER_DATE;
const filterSearch = Filter.FilterType.FILTER_SEARCH;
command.saveTokenToLocalStorage("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGJjQGdtYWlsLmNvbSIsImlkIjoxMjEsImVtYWlsIjoiYWRiY0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoiQWRtaW4gSGnhur91IDIxMzEyMyIsInVzZXJuYW1lIjoiYWRtaW5oaWV1IiwiZXhwIjoxNjUzMjQxMzA5fQ.w2EQ8RofOXxkyaARzUqbA7Q3kEr_GBVD93Wdya8pn9g")
setDefaultFilter();
loadOrderChildS1(1);


function setDefaultFilter(){
    loadFilterUserAgency();
    filterDate.loadFilterChild();
    filterOrderStatus.loadFilterChild()
    filterMembership.loadFilterChild()
    filterSearch.loadFilterChild()

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
        const userId = filterUser.getFilterValue()
        const statusId = filterOrderStatus.getFilterValue()
        const membershipId = filterMembership.getFilterValue()
        const dates = filterDate.getFilterDate()
        const dateFrom = dates.dateFrom
        const dateTo = dates.dateTo
        const keySearch = filterDate.getSearchValue()
        const params = new Map();
        params.set("startValue", dateFrom)
        params.set("endValue", dateTo)
        params.set("page", page)
        params.set("status", statusId)
        params.set("search", keySearch)
        params.set("user_agency_id", userId)
        params.set("membership_id", membershipId)
        params.set("from_date_temp", dateFrom)
        params.set("to_date_temp", dateTo)
        let url = ApiUtil.getAPIUrlGetMethod(GET_ORDER_DETAIL, params)
        command.sendGetMethod(xhttp, url);
    }
}

function loadFilterUserAgency(){
    const params = new Map();
    params.set("id_agency", 0)
    filterUser.api = ApiUtil.getAPIUrlGetMethod(GET_LIST_ORDER_S1, params);
    filterUser.loadFilterChild()
}

function setWidthForColumnTable(){
    let elementChildren = document.getElementsByClassName("content__table__header")[0].children;
    const lengthElement = elementChildren.length;
    const withElement = 100 / lengthElement + 2 + '%';
    for(let i = 2; i < lengthElement; i++){
        elementChildren[i].style.width = withElement;
    }
}
