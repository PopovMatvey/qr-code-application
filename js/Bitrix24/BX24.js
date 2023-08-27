import { BX24 } from 'bx24';
import { getQueryString } from './utils';
const bx24 = new BX24(window, parent);
window.bx24 = bx24;

export default new (class BX24API {
  constructor() {
    this.auth();
    const urlParams = new URLSearchParams(window.location.search);
    this.baseUrl = `https://${urlParams.get('DOMAIN')}`;
  }

  async auth() {
    if (this.session?.ACCESS_TOKEN) return this.session;
    this.session = await bx24.getAuth();
    return this.session;
  }

  async callMethod(name, params = {}) {
    await this.auth();
    params.auth = this.session.ACCESS_TOKEN;

    const queryString = getQueryString(params);

    const result = await fetch(this.baseUrl + `/rest/${name}?`, {
      method: 'POST',
      body: queryString,
    });
    // console.log("await result.json()",await result.json());
    return await result.json();
  }

  async batchMethod(params) {
    await this.auth();

    // // Правильный пример входного массива, который надо передать в метод
    // const batch1 = 'crm.contact.update?id=5&fields[NAME]=SUUUPER';
    // const batch2 = 'crm.contact.update?id=3&fields[NAME]=YEYEEEE';
    // const batch3 = 'lists.element.add?IBLOCK_TYPE_ID=lists&IBLOCK_ID=25&ELEMENT_CODE=Элемент 1&FIELDS[NAME]=Элемент 1&FIELDS[IBLOCK_SECTION_ID]=9';
    // let cmd = {
    //     cmd1: batch1,
    //     cmd2: batch2,
    //     //cmd3: batch3
    // }

    // // Тоже правильный пример массива
    // let comand = {};
    // comand.cmd1 = batch1;
    // comand.cmd2 = batch2;
    // comand.cmd3 = batch3;

    // // Правильный пример массива, созданный в цикле
    // let comandCycl = {};
    // let listID = 25;    // ID списка
    // let sectionID = 9;  // ID раздела
    // for (let i = 1; i < 551; i++){
    //   // Команда создаёт элемент списка в нужном разделе
    //   comandCycl[i] = 'lists.element.add?IBLOCK_TYPE_ID=lists&IBLOCK_ID=' 
    //   + listID + '&ELEMENT_CODE=Элемент ' + i + '&FIELDS[NAME]=Элемент ' 
    //   + i + '&FIELDS[IBLOCK_SECTION_ID]=' + sectionID;
    // }
    
    let cmd = {};
    let arrForButch = {
      auth: this.session.ACCESS_TOKEN,
      halt: 0,
      cmd: cmd
    }
    
    let n = 0;
    let k = 0;
    let result = {};
    for (let j = 0; j < Object.keys(params).length; j++) {
      n = n + 1;
      cmd[n] = params[j];
      if ((n == 50) || (j == (Object.keys(params).length - 1))) {  
        k = k + 1;
        let myPause = await myPromisePause;
        console.log(myPause, 'Уже отправлено команд = ', j + 1);
        result[k] = await fetch(this.baseUrl + `/rest/batch?`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(arrForButch),
        });
        n = 0;
        Object.keys(cmd).forEach(key => delete cmd[key]);
        let myPromisePause = new Promise((resolve, reject) => {
          setTimeout(() => resolve("Пауза в 0.5 секунды. "), 500)
        });
      }
    }
    return result;
  }

  // Отправка batch-запросом до 50-ти команд
  async batchMethodFifty(params, toWait) {
    await this.auth();  
    let arrForButch = {
      auth: this.session.ACCESS_TOKEN,
      halt: 0,
      cmd: params
    }
    if (toWait) {
      let myPromisePause = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Пауза в 0.5 секунды. "), 500)
      });
      let myPause = await myPromisePause;
      // console.log(myPause, 'Отправлено команд без паузы = ', Object.keys(params).length);
    }
    // else console.log('Отправлено команд = ', Object.keys(params).length);
    
    let result = await fetch(this.baseUrl + `/rest/batch?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(arrForButch),
    });
    
    return result.json();
  }
  
  async getAll(name, params = {}) {
    const response = await this.callMethod(name, params);

    if (response.result.length < response.next) {
      return response;
    }

    for (let i = 1; i < Math.ceil(response.total / response.next); i++) {
      params.start = i * response.next;
      const tmpResponse = await this.callMethod(name, params);
      response.result = [...response.result, ...tmpResponse.result];
    }
    return response;
  }
})();
