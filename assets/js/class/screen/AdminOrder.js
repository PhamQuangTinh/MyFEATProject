import * as command from "../../Command.js";
import {getDateFromMillisecond} from "../../util/DateUtil.js";
import {ApiUtil} from "../../util/api/ApiUtil.js";
import {GET_LIST_ORDER_S1, GET_ORDER_DETAIL} from "../../util/api/GetMapping.js";
import * as Filter from "../Filter.js";
import {ScreenBody} from "./ScreenBody.js";

const filterUser = Filter.FilterType.USER_AGENCY;
const filterMembership = Filter.FilterType.MEMBERSHIP;
const filterOrderStatus = Filter.FilterType.ORDER_STATUS;
const filterDate = Filter.FilterType.FILTER_DATE;
const filterSearch = Filter.FilterType.FILTER_SEARCH;

export class AdminOrder extends ScreenBody{


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
        filterOrderStatus.loadFilterChild()
        filterMembership.loadFilterChild()
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
                                <span class="content__table__header-title">Mã đơn</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Tổng tiền</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Trạng thái</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Thời gian yêu cầu</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Ưu tiên xử lý</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Người tạo</span>
                            </div>
                        </th>
                        <th>
                            <div class="content__table__header-column">
                                <span class="content__table__header-title">Đơn vị phụ trách</span>
                            </div>
                        </th>
        `
        let entry = command.htmlToElement(title, "tr", "content__table__header");
        element[0].appendChild(entry)
    }
}