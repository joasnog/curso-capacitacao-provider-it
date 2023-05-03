export default function TimestampToString(timestamp) {
    const dateObj = timestamp.toDate();

    const day = dateObj.getDate().toString();
    // adiciona um zero a esquerda se o valor do mes for 1 digito
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    const hours = dateObj.getHours().toString();
    const minutes = dateObj.getMinutes().toString();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}
