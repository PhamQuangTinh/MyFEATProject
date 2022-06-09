import {ScreenBody} from "./ScreenBody.js";
import {AdminOrder} from "./AdminOrder.js";
import {AdminTemporaryOrder} from "./AdminTemporaryOrder.js";

export function loadScreenBody(screen = new ScreenBody(), page, previousPage){
    if (page === -1 && previousPage === -1){
        screen.loadPageWidthDefaultFilter()
    }else {
        if (screen == CURRENT_SCREEN) {
            if (page === undefined){
                screen.loadPage(1, undefined)
            }else {
                screen.loadPage(page, previousPage)
            }
        } else {
            screen.loadPageWidthDefaultFilter()
        }
    }
}

export const LIST_ORDER = new AdminOrder(1, "Danh sách đơn hàng ĐLC1")
export const LIST_TEMPORARY_ORDER = new AdminTemporaryOrder(2, "Danh sách đơn hàng tạm ĐLC1")

export let CURRENT_SCREEN = LIST_ORDER