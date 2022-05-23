export class ApiUtil {

    static getAPIUrlGetMethod(url,params = new Map()) {
        let result = url
        let i = 0;
        for (let [key, value] of params) {
            if (i === 0) {
                result += "?" + key + "=" + value
            } else {
                result += "&" + key + "=" + value
            }
            i++
        }
        return result
    }
}