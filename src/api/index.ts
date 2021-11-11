import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: 'http://localhost:9001/'
})

export type ApiResponse<T> = Promise<AxiosResponse<T>>
type ApiMethods = 'get' | 'post'
type ApiModel = {
  [key in ApiMethods]: <T = any, D = any>(url: string, data: T) => ApiResponse<D>
}


//Модель, описывающая взаимодействие с асинхронными запросами на сервер приложения
export const Api: ApiModel = {

  //Метод Get - используется для запроса данных с сервера
  get: (url, data) => {

    //Полученную data мы трансформируем в формат строки, для этого используем цикл for с обращением к ключу и значению по ключу объекта data
    const urlData: Array<string> = []

    //Запускаю цикл, чтобы пройтись по ключам объекта data
    for(let key in data){
      //Складываю пары ключ=значение в выше созданный массив для дальнейшего склеивания
      urlData.push(`${key}=${data[key]}`)
    }

    //Склеивание полученного массива пар ключ=значение в единую строку get-запроса
    const requestUrl = urlData.length ? `${url}?${urlData.join('&')}` : url

    //Возвращаем результат выполнения асинхронного запроса
    return instance.get(requestUrl).then((r) => r).catch((e) => e)
  },

  //Метод post - используется для отправки данных на сервер.
  post: (url, data) => {

    //Просто передаю полученные данные в instance чтобы отправить их на сервер.
    return instance.post(url, data).then(r => r).catch(e => e)
  }
}