

import {PAGINATION_NUMBER} from "./util/detail.js";
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


export function getDateFromMillisecond(millisecond){
    return new Date(millisecond).customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" );
}

function getAPIUrlGetMethod(api,...param){
    let apiResult = api;
    param = param[0]
    for(let i = 1; i <= param.length; i++){
        apiResult = apiResult.replace("param" + i, param[i - 1])
    }
    return apiResult;
}

export function sendGetMethod(xhttp, api, ...param) {
    xhttp.open("GET", getAPIUrlGetMethod(api, param));
    xhttp.setRequestHeader("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGJjQGdtYWlsLmNvbSIsImlkIjoxMjEsImVtYWlsIjoiYWRiY0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoiQWRtaW4gSGnhur91IDIxMzEyMyIsInVzZXJuYW1lIjoiYWRtaW5oaWV1IiwiZXhwIjoxNjUyOTI4MTMyfQ.CQQeIAup6Oy6dKKoq8jsetrUVuAXP2bC_cN6Y9Up2co-/order/list_order_agency\n");
    xhttp.send();
}

export function loadPagination(totalRecord, pageSize, currentPage){
    let totalPage = parseInt(totalRecord / pageSize);
    let paginationElement = document.getElementsByClassName("pagination__parent")
    const validPageNumber = PAGINATION_NUMBER;
    let pagination;
    if (currentPage > 0 && currentPage < validPageNumber ){
        pagination = new FirstSitePagination(totalPage, currentPage, PAGINATION_NUMBER);
    } else if(currentPage >= validPageNumber && currentPage <= (totalPage - PAGINATION_NUMBER - 1)){
        pagination = new MiddleSitePagination(totalPage, currentPage, Pagination);
    } else if(currentPage >= (totalPage - PAGINATION_NUMBER - 1) && currentPage < PAGINATION_NUMBER){
        pagination = new LastSitePagination(totalPage, currentPage, Pagination);
    }else{
        pagination = new Pagination(totalPage, currentPage, PAGINATION_NUMBER);
    }
    pagination.setPagination(paginationElement);
}

Date.prototype.customFormat = function(formatString){
    let YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

