export const getVnDateFormat = (date: Date) => {
    const _date = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month < 10 ? '0' + month : month}-${_date < 10 ? '0' + _date : _date}`
}

export const getDateRangeFromVnStringFormat = (sDate: string) => {
    const [_year, _month, _date] = sDate.split('-')
    const date = parseInt(_date)
    const month = parseInt(_month) - 1
    const year = parseInt(_year)

    const startDate = new Date(year, month, date)
    const endDate = new Date(new Date(year, month, date + 1).getTime() - 1)
    return { startDate, endDate }
}

const getDateFromVnStringFormat = (sDate: string) => {
    const [_year, _month, _date] = sDate.split('-')
    const date = parseInt(_date)
    const month = parseInt(_month) - 1
    const year = parseInt(_year)
    return new Date(year, month, date)
}

export const getRangeDateString = (sStartDate: string, sEndDate: string) => {
    let dates = [sStartDate]

    const startTime = getDateFromVnStringFormat(sStartDate).getTime()
    const endTime = getDateFromVnStringFormat(sEndDate).getTime()

    let tempTime = startTime + 86400000

    while (tempTime < endTime) {
        let date = new Date(tempTime)
        dates.push(getVnDateFormat(date))
        tempTime += 86400000
    }
    if(sEndDate != sStartDate) dates.push(sEndDate)
    return dates
}
