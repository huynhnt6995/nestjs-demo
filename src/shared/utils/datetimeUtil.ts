export const getVnDateFormat = (date: Date) => {
    const _date = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${_date < 10 ? '0' + _date : _date}_${month < 10 ? '0' + month : month}_${year}`
}

export const getDateRangeFromVnStringFormat = (sDate: string) => {
    const [_date, _month, _year] = sDate.split('_')
    const date = parseInt(_date)
    const month = parseInt(_month) - 1
    const year = parseInt(_year)

    const startDate = new Date(year, month, date)
    const endDate = new Date(new Date(year, month, date + 1).getTime() - 1)
    return { startDate, endDate }
}