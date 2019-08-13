basic.forever(function () {
    SW01.powerOn()
    basic.showNumber(SW01.temperature(BME280_T.T_C))
    basic.showNumber(SW01.temperature(BME280_T.T_F))
    basic.showNumber(SW01.humidity())
    basic.showNumber(SW01.pressure(BME280_P.hPa))
    basic.showNumber(SW01.pressure(BME280_P.Pa))
    basic.showNumber(SW01.dewpoint())
    basic.showNumber(SW01.altitude())
    SW01.powerOff()
    basic.pause(100)
})

