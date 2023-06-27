module.exports = {
    /**
     * @param page - int 
     * @param date - str YYYY-MM-DD
     */
    getQueryDate(dayOffset: number = 0, monthOffset: number = 0){
        const current = new Date();

        const monthWithOffset = current.getMonth() + 1 - monthOffset;
        const month = (monthWithOffset < 10 ? '0' : '') + monthWithOffset;

        const dayWithOffset = current.getDate() - dayOffset;
        const day = (dayWithOffset < 10 ? '0' : '') + dayWithOffset;

        const date = `${current.getFullYear()}-${month}-${day}`;

        return date;
    }
}