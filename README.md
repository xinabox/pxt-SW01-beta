# XinaBox SW01 MakeCode extension

This library provides functions to access environmental data from the XinaBox SW01.

The SW01 uses a Bosch BME280 to report:
* temperature 
* humidity 
* atmospheric pressure.

This library provides functions that give you access to these variables, as well some measures that can be derived from them:
* dewpoint
* altitude

The library is based on [BME280 Package from microbit/micropython Chinese community](https://github.com/makecode-extensions/BME280). Thanks also to ShaoZiyang for all the heavy lifting :)
  
![](sw01.jpg)

## How-to guides

A comprehensive set of How-to guides that show you how to use the blocks is available online:
* Search for SW01 on the [XinaBox website](https://xinabox.cc/)


## Core functions: Temperature:

```blocks
// Show the temperature in Celcius on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.temperature(BME280_T.T_C))

// Show the temperature in Celcius on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.temperature(BME280_T.T_F))

```


## Core functions: Humidity:

```blocks
// Show the relative humidity (as a percentage) on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.humidity())

```

## Core functions: Atmospheric pressure:

```blocks
// Show the atmospheric pressure in Pascal on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.pressure(BME280_P.Pa))

// Show the atmospheric pressure in HectoPascals (Pascals / 100) on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.pressure(BME280_P.hPa))

```



## License

MIT

Copyright (c) 2019, XinaBox  

## Supported targets

* for PXT/microbit

