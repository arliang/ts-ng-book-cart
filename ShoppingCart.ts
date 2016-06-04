/// <reference path="angular.d.ts" />
import {Book} from './Book'
import {Data} from './Data'

class Remote {
  static lists: Book[][]
  static save(list) {
    this.lists = list
  }
  static fetch(page: number): Book[] {
    return this.lists[page - 1]
  }
  constructor() {
    Remote.lists = Data
  }
}

class BookList {
  private fetchedList: Book[]
  public selectedList: Book[]
  public list: Book[]
  constructor() {
    this.list = Remote.fetch(1)
    this.selectedList = []
  }
  showPage(page: number): void {
    this.list = Remote.fetch(page)
  }
  addToSelectList(book: Book) {
    this.selectedList.push(book)
  }
  removeFromSelectList(book: Book) {
    var index:number
    this.selectedList.forEach((b, i)=>{
      if(book == b){
        index = i
      }
    })
    if(index !== null){
      this.selectedList.splice(index, 1)
    }
  }
  add(books: Book[]){
    this.list = this.list.concat(books)
  }
  save(): void {
    this.list = this.list.concat(this.selectedList)
  }
  getSeletedBookList(): Book[] {
    return this.selectedList
  }
}

class Main {
  private bookListOuter: BookList
  private bookListInner: BookList
  showBookListOuter() {
    this.bookListOuter = new BookList
  }
  showBookListInner() {
    this.bookListInner = new BookList
    this.bookListInner.showPage(1)
  }
  saveBookListInner() {
    angular.forEach(this.bookListInner.getSeletedBookList(), book => this.bookListOuter.addToSelectList(book))
    this.bookListOuter = null
  }
  saveBookBooks() {
    angular.forEach(this.bookListInner.getSeletedBookList(), book => this.bookListOuter.addToSelectList(book))
    this.bookListOuter = null
  }
}


angular.module('app', []).controller('Main', Main)

angular.bootstrap(document, ['app'])