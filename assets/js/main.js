import {htmlToElement, getDateFromMillisecond as convertMillisecond} from './command.js'
function loadOrderChildS1(){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let content = document.getElementsByClassName("content__table");
            const response = JSON.parse(this.responseText);
            let lengthResponse = response.data.order.length;
            for(let i = 0; i < lengthResponse; i++){
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
                            <span>${convertMillisecond(item.create_date)}</span>
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
                            <span>${convertMillisecond(item.receive_order_time)}</span>
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
        }
    };
    xhttp.open("GET", "http://cmcapp.ipicorp.co:10003/adminservice/order/list_order_agency?startValue=1649955600000&endValue=1652633999999&page=1&status=0&search=&user_agency_id=0&membership_id=0&from_date_temp=1649955600000&to_date_temp=1652633999999");
    xhttp.setRequestHeader("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpdEBhbmh0aW4udm4iLCJpZCI6NTYsImVtYWlsIjoiaXRAYW5odGluLnZuIiwicm9sZSI6IkFETUlOIiwibmFtZSI6IkzDqiDEkHV5biIsInVzZXJuYW1lIjoiaXQiLCJleHAiOjE2NTI4NDE1OTV9.mJJtKViXLrGiqRuJ9xrD3Bl9SNSuZQ02lUdhkMo8Wxs-/order/list_order_agency");
    xhttp.send();
}

function setWidthForColumnTable(){
    let elementChildren = document.getElementsByClassName("content__table__header")[0].children;
    const lengthElement = elementChildren.length;
    const withElement = 100 / lengthElement + 2 + '%';
    for(let i = 2; i < lengthElement; i++){
        elementChildren[i].style.width = withElement;
    }
}

loadOrderChildS1();