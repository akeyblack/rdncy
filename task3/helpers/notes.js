import moment from "moment";

export const findDates = string => {
    let dates = string.match(/(0?[1-9]|[12]\d|30|31)([\/.-])(0?[1-9]|1[0-2])([\/.-])(\d{4}|\d{2})/g);
    return dates ? dates.join(" ") : "";
}

export const getDate = () => {
    try {
        return moment().format("LL");
    }
    catch (e) {
        return "Something went wrong";
    }
}