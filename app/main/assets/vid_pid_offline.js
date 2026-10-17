
const DeviceID = [
  // { //金壹电子9800，26键无冲
  //   vendorId: 0x36ae, // 指定厂商的 VID
  //   productId: 0xfebb, // 指定产品的 PID
  //   usagePage: 0xff00,
  //   usage: 0x0002,
  // },
  { //昕恒微
    vendorId: 0x36ae, // 指定厂商的 VID
    productId: 0xfe9c, // 指定产品的 PID
    usagePage: 0xff00,
    usage: 0x0002,
  }
  // { //XH-XJ-RS6/Q6
  //   vendorId: 0x36ae, // 指定厂商的 VID
  //   productId: 0xfead, // 指定产品的 PID
  //   usagePage: 0xff00,
  //   usage: 0x0002,
  // }
];

module.exports = { DeviceID };