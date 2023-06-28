export function StringToDate(dataStr) {
    var dateParts = dataStr.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
}

export function DateToString(dateObject) {
    try {
        let date, month, year;

        date = dateObject.getDate() + 1;
        month = dateObject.getMonth() + 1;
        year = dateObject.getFullYear();

        date = date
            .toString()
            .padStart(2, '0');

        month = month
            .toString()
            .padStart(2, '0');

        return `${date}/${month}/${year}`;
    } catch (error) {
        return '';
    }
}

export function ConvertStringDateToIso8601(dataStr) {
    try {
        const dateObj = StringToDate(dataStr);
        return dateObj.toISOString().split('T')[0]
    } catch (error) {
        return '';
    }
}

// Converte data para o formato dd/mm/yyyy
// export function ConvertDateIso8601(dataStr) {
//     try {
//         const dateObj = StringToDate(dataStr);
//         console.log
//     } catch (error) {
//         return '';
//     }
// }