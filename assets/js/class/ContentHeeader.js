import {CURRENT_SCREEN, LIST_ORDER} from "./screen/ScreenValue.js";
import * as command from "../Command.js";

export function loadContentHeader(screen = CURRENT_SCREEN){

    let header = `
                <h1 class="content__header-title">${screen.name}</h1>
                <div class="content__header-search">
                    <div class="searchbar">
                        <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                        <input class="content__header-search-input" type="text" name="" placeholder="Tìm kiếm theo mã đơn hàng, tên đại lý, mã đại lý">
                    </div>
                </div>
    `
    let entry = command.htmlToElement(header, "div", "content__header-value");
    let element = document.getElementsByClassName("content__header");
    element[0].appendChild(entry)
}