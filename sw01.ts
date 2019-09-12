/**
 * XinaBox SW01 extension for makecode
 * Base on BME280 Package from microbit/micropython Chinese community.
 *   https://github.com/makecode-extensions/BME280
 */

enum Temperature {
    //% block="ºC"
    Celcius = 0,
    //% block="ºF"
    Fahrenheit = 1
}

enum Pressure {
    //% block="hPa"
    HectoPascal = 0,
    //% block="mbar"
    MilliBar = 1
}

enum Humidity {
    //% block="%RH"
    RelativeHumidity = 0
}

enum Length {
    //% block="meter"
    Meter = 0,
    //% block="feet"
    Feet = 1
}

/**
 * SW01 block
 */
//% color=#444444 icon="\uf2dc"
//% groups=['On start', 'Variables', 'Optional']
namespace SW01 {
    let SW01_ADDR = 0x76

    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(SW01_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(SW01_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(SW01_ADDR, NumberFormat.UInt8BE);
    }

    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(SW01_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(SW01_ADDR, NumberFormat.Int8LE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(SW01_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(SW01_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(SW01_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(SW01_ADDR, NumberFormat.Int16LE);
    }

    let dig_T1 = getUInt16LE(0x88)
    let dig_T2 = getInt16LE(0x8A)
    let dig_T3 = getInt16LE(0x8C)
    let dig_P1 = getUInt16LE(0x8E)
    let dig_P2 = getInt16LE(0x90)
    let dig_P3 = getInt16LE(0x92)
    let dig_P4 = getInt16LE(0x94)
    let dig_P5 = getInt16LE(0x96)
    let dig_P6 = getInt16LE(0x98)
    let dig_P7 = getInt16LE(0x9A)
    let dig_P8 = getInt16LE(0x9C)
    let dig_P9 = getInt16LE(0x9E)
    let dig_H1 = getreg(0xA1)
    let dig_H2 = getInt16LE(0xE1)
    let dig_H3 = getreg(0xE3)
    let a = getreg(0xE5)
    let dig_H4 = (getreg(0xE4) << 4) + (a % 16)
    let dig_H5 = (getreg(0xE6) << 4) + (a >> 4)
    let dig_H6 = getInt8LE(0xE7)
    setreg(0xF2, 0x04) // set Humidity oversampling to x8
    setreg(0xF4, 0x2F) // set Pressure oversampling to x1
                       // set Temperature oversampling to x4
                       // set Normal mode
    //setreg(0xF4, 0x93) // set Pressure oversampling to x8
                       // set Temperature oversampling to x8
                       // set Normal mode
    setreg(0xF5, 0x0C) // set time constant of the IIR filter to 250 ms
    let T = 0
    let P = 0
    let H = 0

    function get(): void {
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
        let t = var1 + var2
        //T = Math.idiv((t * 5 + 128) >> 8, 100)
        T = ((t * 5 + 128) >> 8) / 100
        var1 = (t >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 1)
        var2 = (var2 >> 2) + (dig_P4 << 16)
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * dig_P1) >> 15
        if (var1 == 0)
            return; // avoid exception caused by division by zero
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
        //_p = Math.idiv(_p, var1) * 2;
        _p = _p/ var1 * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
        var2 = (((_p >> 2)) * dig_P8) >> 13
        P = _p + ((var1 + var2 + dig_P7) >> 4)
        let adc_H = (getreg(0xFD) << 8) + getreg(0xFE)
        var1 = t - 76800
        var2 = (((adc_H << 14) - (dig_H4 << 20) - (dig_H5 * var1)) + 16384) >> 15
        var1 = var2 * (((((((var1 * dig_H6) >> 10) * (((var1 * dig_H3) >> 11) + 32768)) >> 10) + 2097152) * dig_H2 + 8192) >> 14)
        var2 = var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * dig_H1) >> 4)
        if (var2 < 0) var2 = 0
        if (var2 > 419430400) var2 = 419430400
        H = (var2 >> 12) >> 10
    }

    /**
     * The atmospheric pressure in hPa or mbar
     * https://en.wikipedia.org/wiki/Atmospheric_pressure
     * @param u the pressure unit
     */
    //% blockId="SW01_GET_PRESSURE" block="SW01 pressure %u"
    //% group="Variables"
    //% weight=84 blockGap=8
    export function pressure(u: Pressure): number {
        get();
        return fix(P / 100);
    }

    /**
     * The temperature in degrees Celcius or Fahrenheit
     * https://en.wikipedia.org/wiki/Temperature
     * @param u the temperature unit
     */
    //% blockId="SW01_GET_TEMPERATURE" block="SW01 temperature %u"
    //% group="Variables"
    //% weight=88 blockGap=8
    export function temperature(u: Temperature): number {
        get();
        if (u == Temperature.Celcius) return fix(T);
        else return fix(32 + T * 9 / 5);
    }

    /**
     * The relative humidity in percent
     * https://en.wikipedia.org/wiki/Relative_humidity
     * @param u the relative humidity unit
     */
    //% blockId="SW01_GET_HUMIDITY" block="SW01 humidity %u"
    //% group="Variables"
    //% weight=86 blockGap=8
    export function humidity(u: Humidity): number {
        get();
        return fix(H);
    }

    /**
     * Turn the SW01 on or off
     * @param on power on or off
     */
    //% blockId="SW01_POWER" block="SW01 power $on"
    //% group="Optional"
    //% weight=98 blockGap=8
    //% on.shadow="toggleOnOff"
    export function onOff(on: boolean) {
        if (on) setreg(0xF4, 0x93);
        else setreg(0xF4, 0)
    }

    //% blockId="SW01_POWER_ON" block="SW01 power on"
    //% group="Optional"
    //% weight=98 blockGap=8
    //% deprecated=true
    export function powerOn() {
        setreg(0xF4, 0x93)
    }

    /**
     * turn the SW01 off
     */
    //% blockId="SW01_POWER_OFF" block="SW01 power off"
    //% group="Optional"
    //% weight=96 blockGap=8
    //% deprecated=true
    export function powerOff() {
        setreg(0xF4, 0)
    }

    /**
     * The calculated dew point in temperature unit 
     * https://en.wikipedia.org/wiki/Dew_point
     * The dew point is calculated following this formula  
     * proposed in a 2005 article by Mark G. Lawrence in 
     * the Bulletin of the American Meteorological Society:
     * dew point = temperature - ((100 - relative humidity)/5)
     * @param u the dew point temperature unit
     */
    //% block="SW01 dew point %u"
    //% group="Variables"
    //% weight=76 blockGap=8
    export function dewpoint(u: Temperature): number {
        get();
        if (u == Temperature.Celcius) return fix(T - ((100 - H) / 5));
        else return fix(32 + ((T - ((100 - H)/ 5)) * 9/ 5));
    }

    /**
     * The density altitude in meter or feet
     * https://en.wikipedia.org/wiki/Density_altitude
     * @param u the density altitude unit
     */
    //% block="SW01 density altitude %u"
    //% group="Variables"
    //% weight=74 blockGap=8
    export function densityAltitude(u: Length): number {
        get()
        let alt = (apow(101325 / P, 1 / 5.257) - 1.0) * (T + 273.15) / 0.0065
        if (u == Length.Meter) return fix(alt);
        else return fix(alt * 3.28084);
    }

    /**
    * The pressure altitude in meter or feet
    * https://en.wikipedia.org/wiki/Pressure_altitude
    * @param u the pressure altitude unit
    */
    //% block="SW01 pressure altitude %u"
    //% group="Variables"
    //% weight=74 blockGap=8
    export function pressureAltitude(u: Length): number {
        get()
        let alt = (1 - apow(P/101325, 0.190284)) * 145366.45
        if (u == Length.Feet) return fix(alt);
        else return fix(alt * 0.3048);
    }

    /**
    * The estimated cloud base in meter or feet
    * A cloud base (or the base of the cloud) 
    * is the lowest altitude of the visible portion of a cloud.
    * https://en.wikipedia.org/wiki/Cloud_base
    * @param u the cloud base unit
    */
    //% block="SW01 cloud base %u"
    //% group="Variables"
    //% weight=74 blockGap=8
    export function cloudBase(u: Length): number {
        get()
        let base = (T - (T - ((100 - H)/ 5)))/2.5 * 1000
        if (u == Length.Feet) return fix(base);
        else return fix(base * 0.3048);
    }

    // power function approximate calculation for (1+x)^n, x~0
    function apow(x: number, n: number): number {
        let d = x - 1
        return 1 + (n * d) + (n * (n - 1) * d * d) / 2
    }

    /**
     * Set I2C address
     * On:  0x76
     * Off: 0x77
     * @param on on is I2C address 0x76, off is 0x77
     */
    //% blockId="SW01_SET_ADDRESS" block="SW01 address %on"
    //% group="Optional"
    //% weight=50 blockGap=8
    //% on.shadow="toggleOnOff"
    export function address(on: boolean) {
        if (on) SW01_ADDR = 0x76
        else SW01_ADDR = 0x77
    }

    function fix(x: number) {
        return Math.round(x * 100) / 100
    }
    
}
