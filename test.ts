basic.forever(function () {
    serial.writeValue("T", SW01.temperature())
    serial.writeValue("H", SW01.temperature())
    serial.writeValue("P", SW01.pressure())
    basic.pause(1000)
})