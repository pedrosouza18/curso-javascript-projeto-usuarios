class DateHelper {

    constructor() {}

    static textToDate(text) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error('A data deve estar no formato yyyy-MM-dd!');
        
        return new Date(...text.split('-').map((item, idx) => item - idx % 2));
    }

    static dateToText(date) {
        return `${date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`}/${date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`;
    }
}