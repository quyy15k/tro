import moment from 'moment'

const formaDate = (timeObj) => {
    let day = timeObj.getDay() === 0 ? 'Chủ Nhật' : `Thứ ${timeObj.getDay() + 1}`;
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
    return `${day}, ${time} ${date}`;
}

const generateDate = () => {
    let gapExpire = Math.floor(Math.random() * 29) + 1; // Random số ngày từ 1-30
    let today = new Date();
    let expireDay = moment(today).add(gapExpire, 'days').toDate();

    return {
        today: formaDate(today),
        expireDay: formaDate(expireDay) // Sử dụng formaDate để format expireDay
    }
}

export default generateDate;
