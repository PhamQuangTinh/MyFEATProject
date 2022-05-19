

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


