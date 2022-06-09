import * as command from './Command.js'
import {loadContentHeader} from "./class/ContentHeeader.js";
import {CURRENT_SCREEN, LIST_ORDER, LIST_TEMPORARY_ORDER, loadScreenBody} from "./class/screen/ScreenValue.js";
import {createLeftMenuItem} from "./class/LeftMenuItem.js";

command.saveTokenToLocalStorage("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGJjQGdtYWlsLmNvbSIsImlkIjoxMjEsImVtYWlsIjoiYWRiY0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoiQWRtaW4gSGnhur91IDIxMzEyMyIsInVzZXJuYW1lIjoiYWRtaW5oaWV1IiwiZXhwIjoxNjU0NjI2NDM2fQ.2iekGbVgYHI059mWNvanx-X2QWGFJUqTgDN1bRGFVIU")
createLeftMenuItem()
loadOrderChildS1WithFilter(CURRENT_SCREEN);
loadLeftMoneyClick()

export function loadOrderChildS1WithFilter(screen = CURRENT_SCREEN){
    loadContentHeader(screen, -1, -1)
    loadScreenBody(screen, -1, -1);
}

function loadLeftMoneyClick(){
    let leftMenuChildren = document.querySelectorAll("ul.left-menu__child li")
    leftMenuChildren[0].onclick = function (){
        loadOrderChildS1WithFilter(LIST_ORDER)
    }
    leftMenuChildren[1].onclick = function (){
        loadOrderChildS1WithFilter(LIST_TEMPORARY_ORDER)
    }
}
