// class FlashListItem {
//   constructor(id, title, status, startDate, endDate) {
//     this.id = id
//     this.title = title
//     this.status = status
//     this.startDate = startDate
//     this.endDate = endDate
//     this.statusBoolean = !!status
//   }
// }

class Flash {
  handleFlashList(flashList) {
    flashList.forEach((item) => {
      item.startDate = item.startDate.substring(0, item.startDate.indexOf('T'))
      item.endDate = item.endDate.substring(0, item.endDate.indexOf('T'))
      item.statusBoolean = !!item.status
      item.status = item.status ? '活动未开始' : '活动已开始'
    })
  }

  handleFlashSessionList(flashSessionList) {
    flashSessionList.forEach((item) => {
      item.statusBoolean = !!item.status
    })
  }

  dateStringToDate(time) {
    const times = time.split('-')
    return new Date(times[0], times[1] - 1, times[2])
  }

  dateToTimeString(time) {
    const hour = time.getHours().toString().padStart(2, '0')
    const minute = time.getMinutes().toString().padStart(2, '0')
    const second = time.getSeconds().toString().padStart(2, '0')
    return `${hour}:${minute}:${second}`
  }

  timeStringToDate(time) {
    const times = time.split(':')
    return new Date(0, 0, 0, times[0], times[1], times[2])
  }
}

const flash = new Flash()

export { flash }
