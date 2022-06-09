import * as command from "../../Command.js";
import {getDateFromMillisecond} from "../../util/DateUtil.js";
import {ApiUtil} from "../../util/api/ApiUtil.js";
import {GET_LIST_ORDER_S1, GET_ORDER_DETAIL, GET_ORDER_TEMPORARY_DETAIL} from "../../util/api/GetMapping.js";
import * as Filter from "../Filter.js";
import {ScreenBody} from "./ScreenBody.js";

const filterUser = Filter.FilterType.USER_AGENCY;
const filterDate = Filter.FilterType.FILTER_DATE;
const filterSearch = Filter.FilterType.FILTER_SEARCH;

export class AdminTemporaryOrder extends ScreenBody{


    constructor(id, name) {
        super(id, name);
    }

    loadPage(page, previousPage) {
        if (previousPage === undefined || previousPage !== page) {
            super.removeCurrentScreenElement(false, false)
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let content = document.getElementsByClassName("content__table");
                    // command.removeElementsByClassName("content__table__body", "pagination__children")
                    const response = JSON.parse(this.responseText);
                    if (response.code === 1) {
                        let pageSize = response.data.size;
                        let totalRecord = response.data.total;
                        let resultLength = response.data.list_order.length
                        for (let i = 0; i < resultLength; i++) {
                            let item = response.data.list_order[i];
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
                                    <span>${item.shop_name}</span>
                                </td>
                                <td>
                                    <span>${item.dms_code}</span>
                                </td>
                                <td>
                                    <span>${item.membership_name}</span>
                                </td>
                                <td>
                                    <span>${item.saff_name}</span>
                                </td>
                                <td>
                                    <span>${item.phone}</span>
                                </td>
                                <td>
                                    <span>${item.total_money}</span>
                                </td>
                                <td>
                                    <span>${item.note}</span>
                                </td>
                            `
                            let entry = command.htmlToElement(value, "tr", "content__table__body");
                            content[0].appendChild(entry)
                        }
                        command.loadPagination(totalRecord, pageSize, page);
                    } else {
                        console.log(response.error)
                    }
                }
            };
            const userId = filterUser.getFilterValue()
            const dates = filterDate.getFilterDate()
            const dateFrom = dates.dateFrom
            const dateTo = dates.dateTo
            const keySearch = filterDate.getSearchValue()
            const params = new Map();
            params.set("date_from", dateFrom)
            params.set("date_to", dateTo)
            params.set("page", page)
            params.set("key_word", keySearch)
            params.set("user_id", userId)
            params.set("note", "")
            let url = ApiUtil.getAPIUrlGetMethod(GET_ORDER_TEMPORARY_DETAIL, params)
            command.sendGetMethod(xhttp, url);
        }
    }

    loadPageWidthDefaultFilter() {
        let content = document.getElementsByClassName("content__table");
        super.removeCurrentScreenElement(true,true)
        this.createTitleBody(content)
        this.loadDefaultFilter();
        this.loadPage(1, undefined);
        command.setWidthForColumnTable();
    }


    loadDefaultFilter() {
        filterDate.loadFilterChild();
        this.loadFilterUserAgency();
        filterSearch.loadFilterChild()
    }

    loadFilterUserAgency(){
        const params = new Map();
        params.set("id_agency", 0)
        filterUser.api = ApiUtil.getAPIUrlGetMethod(GET_LIST_ORDER_S1, params);
        filterUser.loadFilterChild()
    }


    createTitleBody(element) {
        const title = `
                        <th>
                            <div class="content__table__header__button-all">
                                <label class="checkbox-button">
                                    <input type="checkbox" class="checkbox-button__input">
                                    <span class="checkbox-button__control"></span>
                                </label>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">STT</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Ngày tạo</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Tên ĐLC1</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Mã ĐLC1</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Cấp bậc</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Người tạo đơn</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Số điện thoại</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Tổng tiền</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Ghi chú</span>
                            </div>
                        </th>
        `
        let entry = command.htmlToElement(title, "tr", "content__table__header");
        element[0].appendChild(entry)
    }
}