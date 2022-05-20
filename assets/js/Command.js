

import {PAGINATION_NUMBER} from "./util/Detail.js";
import {FirstSitePagination, LastSitePagination, MiddleSitePagination, Pagination} from "./class/Pagination.js";

export function htmlToElement(html, tagName, ...classNames){
    let entry = document.createElement(tagName);
    let lengthClassNames = classNames.length
    for(let i = 0 ; i < lengthClassNames; i++){
        entry.className+= classNames[i] + (i == lengthClassNames - 1 ? "" : " ");
    }
    entry.innerHTML= html;
    return entry;
}

export function sendGetMethod(xhttp, api) {
    xhttp.open("GET", api);
    let token = getTokenToLocalStorage();
    token = token + "-" + api
    xhttp.setRequestHeader("token", token);
    xhttp.send();
}

export function removeElementsByClassName(...className){
    for (let i = 0; i < className.length; i++){
        let elements = document.getElementsByClassName(className[i])
        if (elements[0] !== undefined){
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    }
}

export function saveTokenToLocalStorage(token) {
    window.localStorage.setItem("token", token)
}

export function getTokenToLocalStorage() {
    return window.localStorage.getItem("token")
}

export function loadFilterChild(jsonResponse, parentIdName, fieldName){
        let content = document.getElementById(parentIdName);
        let listContent = content.getElementsByTagName("ul")
        const firstChild = htmlToElement(`
                       <span>Tất cả</span>
                   `, "li", "content__filter-child__drop-down__item"
        );
        firstChild.onclick = function (){
            chooseItem(parentIdName,"Tất cả", 0)
        }
        listContent[0].appendChild(
            firstChild
        )
        let resultLength = jsonResponse.data.order_status.length
        for (let i = 0; i < resultLength; i++) {
            let item = jsonResponse.data.order_status[i];
            let value = `
                           <span>${item[fieldName]}</span>
                       `
            let entry = command.htmlToElement(value, "li", "content__filter-child__drop-down__item");
            entry.onclick = function (){
                chooseItem(parentIdName,item[fieldName], item["id"])
            }
            listContent[0].appendChild(entry)
        }
        content.onclick = function (){
            clickDropdown(this.id)
        }
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

export function loadPagination(totalRecord, pageSize, currentPage){
    let totalPage = parseInt(totalRecord / pageSize + 0.5);
    let paginationElement = document.getElementsByClassName("pagination__parent")
    const validPageNumber = PAGINATION_NUMBER;
    let pagination;
    if (currentPage > 0 && currentPage < validPageNumber ){
        pagination = new FirstSitePagination(totalPage, currentPage);
    } else if(currentPage >= validPageNumber && currentPage <= (totalPage - (PAGINATION_NUMBER - 1))){
        pagination = new MiddleSitePagination(totalPage, currentPage);
    } else if(currentPage >= (totalPage - (PAGINATION_NUMBER - 2)) && currentPage <= totalPage){
        pagination = new LastSitePagination(totalPage, currentPage);
    }else{
        pagination = new Pagination(totalPage, currentPage);
    }
    pagination.setPagination(paginationElement);
}


