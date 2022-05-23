import {htmlToElement} from "../Command.js";
import {loadOrderChildS1} from "../Main.js";
import {PAGINATION_NUMBER} from "../util/Detail.js";

export class Pagination {

    constructor(totalPage, currentPage) {
        this._totalPage = totalPage;
        this._currentPage = currentPage;
        this._validPageNumber = PAGINATION_NUMBER;
    }

    setPagination(element) {
        this.setFirstElement(element)
        this.setLastElement(element)
    }

    setFirstElement(element) {
        let value =
            `
                        <a href="javascript:void(0)" class="pagination__children-page">
                            <i>
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1em"
                                 height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
                                </path>
                            </svg>
                            </i>
                        </a>
            `
        let elementChild = htmlToElement(value, "li", 'pagination__children');
        let currentPage = this.currentPage;
        let index = currentPage - 1;
        if(index <= 0) index = 1
        elementChild.onclick = function (){
            loadOrderChildS1(index, currentPage)
        }
        element[0].appendChild(elementChild)
    }

    setLastElement(element) {
        let value =
            `
                        <a href="javascript:void(0)" class="pagination__children-page">
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em"
                                 height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z">
                                </path>
                            </svg>
                        </a>
            `
        let elementChild = htmlToElement(value, "li", 'pagination__children');
        const currentPage = this.currentPage;
        let index = currentPage + 1;
        if(index > this.totalPage) index = this.totalPage
        elementChild.onclick = function (){
            loadOrderChildS1(index, currentPage)
        }
        element[0].appendChild(elementChild)
    }

    setElement(element, index) {
        let value =
                `
                        <a href="javascript:void(0)" class="pagination__children-page">
                            ${index}
                        </a>
                `
        let elementChild = htmlToElement(value, "li", 'pagination__children');
        elementChild.title = index
        let currentPage = this.currentPage
        elementChild.onclick = function (){
            loadOrderChildS1(index, currentPage)
        }
        element[0].appendChild(elementChild)
    }


    setLoadMoreMultiElement(element) {
        let value =
                `
                        <a href="javascript:void(0)" class="pagination__children-page">
                            <i aria-label="icon: double-right"
                               class="anticon anticon-double-right ant-pagination-item-link-icon">
                                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="double-right"
                                     width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z">

                                    </path>
                                </svg>
                            </i>
                            <span>•••</span>
                        </a>
                `
        let elementChild = htmlToElement(value, 'li', 'pagination__children load-more');
        const currentPage = this.currentPage;
        let index = currentPage + this.validPageNumber;
        if (index > this.totalPage) index = this.totalPage
        elementChild.onclick = function (){
            loadOrderChildS1(index, currentPage)
        }
        element[0].appendChild(elementChild)
    }

    setLoadLessMultiElement(element) {
        let value =
            `
                        <a href="javascript:void(0)" class="pagination__children-page">
                            <i aria-label="icon: double-left" class="anticon anticon-double-left ant-pagination-item-link-icon">
                                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z">
                                    </path>
                                </svg>
                            </i>
                            <span>•••</span>
                        </a>
                `
        let elementChild = htmlToElement(value, 'li', 'pagination__children load-more');
        const currentPage = this.currentPage;
        let index = currentPage - this.validPageNumber;
        if (index < 0) index = 1
        elementChild.onclick = function (){
            loadOrderChildS1(index, currentPage)
        }
        element[0].appendChild(elementChild)
    }

    setChoseItem(element, index){
        let childElements = element[0].children;
        childElements[index].className += " pagination__chose-item"
    }

    get totalPage() {
        return this._totalPage;
    }

    get currentPage() {
        return this._currentPage;
    }

    get validPageNumber() {
        return this._validPageNumber;
    }
}

export class FirstSitePagination extends Pagination {
    constructor(totalPage, currentPage, validPageNumber) {
        super(totalPage, currentPage, validPageNumber);
    }

    setPagination(element) {
        if (this.totalPage > 0) {
            this.setFirstElement(element);
            if (this.totalPage > this.validPageNumber) {
                let isLastPage = this.currentPage == this.validPageNumber - 1;
                for (let i = 1; i <= this.validPageNumber; i++) {
                    this.setElement(element, i)
                }
                if (isLastPage) {
                    this.setElement(element, this.validPageNumber + 1)
                }
                this.setLoadMoreMultiElement(element)
                this.setElement(element, this.totalPage)
            } else {
                for (let i = 1; i <= this.totalPage; i++) {
                    this.setElement(element, i)
                }
            }
            this.setChoseItem(element, this.currentPage)
            this.setLastElement(element);
        }
    }
}

export class MiddleSitePagination extends Pagination {

    setPagination(element) {
        this.setFirstElement(element);
        this.setElement(element, 1)
        this.setLoadLessMultiElement(element)

        let dividePageNumber = parseInt(this.validPageNumber / 2)
        let leftPage = this.currentPage - dividePageNumber
        let rightPage = this.currentPage + dividePageNumber;
        for (let i = leftPage; i < this.currentPage; i++) {
            this.setElement(element, i)
        }

        for (let i = this.currentPage; i <= rightPage; i++) {
            this.setElement(element, i)
        }
        this.setLoadMoreMultiElement(element)
        this.setElement(element, this.totalPage)
        this.setLastElement(element);
        this.setChoseItem(element, dividePageNumber + 3)
    }
    constructor(totalPage, currentPage, validPageNumber) {
        super(totalPage, currentPage, validPageNumber);
    }
}

export class LastSitePagination extends Pagination {
    setPagination(element) {
        this.setFirstElement(element);
        this.setElement(element, 1)
        this.setLoadLessMultiElement(element)
        let isFirstPage = this.currentPage == this.totalPage - (this.validPageNumber - 2);
        let currentPage = !isFirstPage ? (this.totalPage - (this.validPageNumber - 1)) : (this.totalPage - this.validPageNumber)
        for (let i = currentPage; i <= this.totalPage; i++) {
            this.setElement(element, i)
        }
        this.setLastElement(element);
        let ok = (this.validPageNumber + 2 + (isFirstPage ? 1 : 0)) - (this.totalPage - this.currentPage)
        this.setChoseItem(element, ok)
    }

    constructor(totalPage, currentPage, validPageNumber) {
        super(totalPage, currentPage, validPageNumber);
    }
}