import {htmlToElement, getDateFromMillisecond,
    sendGetMethod, loadPagination, removeElementsByClassName} from './Command.js'
import * as url from './util/api/get/AdminApi.js'

loadOrderChildS1(1);

export function loadOrderChildS1(page){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let content = document.getElementsByClassName("content__table");
            removeElementsByClassName("content__table__body", "pagination__children")
            const response = JSON.parse(this.responseText);
            let pageSize = response.data.page_size;
            let totalRecord = response.data.total_record;
            for(let i = 0; i < pageSize; i++){
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
                            <span>${i+1}</span>
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

                let entry = htmlToElement(value, "tr", "content__table__body");
                content[0].appendChild(entry)
            }
            setWidthForColumnTable();
            loadPagination(totalRecord, pageSize, page);
        }
    };
    sendGetMethod(xhttp, url.GET_ORDER_DETAIL, 1649955600000, 1652633999999, page, 0, '', 0, 0, 1649955600000, 1652633999999);
}

function setWidthForColumnTable(){
    let elementChildren = document.getElementsByClassName("content__table__header")[0].children;
    const lengthElement = elementChildren.length;
    const withElement = 100 / lengthElement + 2 + '%';
    for(let i = 2; i < lengthElement; i++){
        elementChildren[i].style.width = withElement;
    }
}
