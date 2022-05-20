export default class Api{

    constructor(domain, service, url) {
        this._domain = domain;
        this._service = service;
        this._url = url;
    }


    get domain() {
        return this._domain;
    }

    get service() {
        return this._service;
    }

    get url() {
        return this._url;
    }

    getAPIUrlGetMethod(params = new Map()){
        let result = this.domain + this.service + this.url
        let i = 0;
        for(let [key, value] of params) {
            if (i === 0) {
                result += "?" + key + "=" + value
            }else{
                result += "&" + key + "=" + value
            }
            i++
        }
        return result
    }
}