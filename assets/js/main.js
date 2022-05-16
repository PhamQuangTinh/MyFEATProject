
function loadOrderChildS1(){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let content = document.getElementsByClassName("content__table__body");
            const items = JSON.parse(this.responseText);
            for(let item in items){
                var value = `
                    
                `
                content.appendChild(
                    `
                        <h1>helllo okkk</h1>
                    `
                )
            }
            console.log(items)
        }
    };
    xhttp.open("GET", "http://cmcapp.ipicorp.co:10003/adminservice/order/list_order_agency?startValue=1649955600000&endValue=1652633999999&page=1&status=0&search=&user_agency_id=0&membership_id=0&from_date_temp=1649955600000&to_date_temp=1652633999999");
    xhttp.setRequestHeader("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjAzQGdtYWlsLmNvbSIsImlkIjozLCJlbWFpbCI6ImFkbWluMDNAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmFtZSI6ImFkbWluMDMiLCJ1c2VybmFtZSI6ImFkbWluMDMiLCJleHAiOjE2NTI3MTk0NTR9.D4wuKelPj2c1GIU9nWoi9RuJEQOvVR07-gukDwSh_4o-/order/list_order_agency");
    xhttp.send();
}

loadOrderChildS1();


