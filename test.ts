basic.forever(function () {
    
    SW01.PowerOn()
    serial.writeValue("Temp (c)", SW01.temperature(BME280_T.T_C))
    serial.writeValue("Temp (F)", SW01.temperature(BME280_T.T_F))
    serial.writeValue("Humidity", SW01.humidity())
    serial.writeValue("Pressure (hPa)", SW01.pressure(BME280_P.hPa))
    serial.writeValue("Pressure (Pa)", SW01.pressure(BME280_P.Pa))
    serial.writeValue("Dewpoint", SW01.Dewpoint())
    serial.writeValue("altitude", SW01.altitude())
    serial.writeValue("cloudbase", SW01.cloudbase(LENGTH_U.METER))
    SW01.PowerOff()
    basic.pause(100)
    
})
