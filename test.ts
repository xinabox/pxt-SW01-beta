basic.forever(function () {
    SW01.powerOn()
    basic.showNumber(SW01.temperature(BME280_T.T_C))
    basic.showNumber(SW01.temperature(BME280_T.T_F))
    basic.showNumber(SW01.humidity(BME280_H.rh))
    basic.showNumber(SW01.pressure(BME280_P.hPa))
    basic.showNumber(SW01.pressure(BME280_P.mbar))
    basic.showNumber(SW01.dewpoint(BME280_D.T_C))
    basic.showNumber(SW01.altitude(LENGTH_U.METER))
    SW01.powerOff()
    basic.pause(100)
})

