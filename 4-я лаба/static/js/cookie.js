/**
 * Устанавливает cookie с заданным именем, значением и сроком действия.
 * @param {string} name - Имя cookie.
 * @param {string} value - Значение cookie.
 * @param {number} days - Количество дней до истечения срока действия cookie.
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Получает значение cookie по его имени.
 * @param {string} name - Имя cookie.
 * @returns {string|null} Значение cookie или null, если cookie не найдено.
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}