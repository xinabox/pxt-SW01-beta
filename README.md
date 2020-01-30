[![GitHub Issues](https://img.shields.io/github/issues/xinabox/pxt-SW01.svg)](https://github.com/xinabox/pxt-SW01/issues) 
![GitHub Commit](https://img.shields.io/github/last-commit/xinabox/pxt-SW01) 
![Maintained](https://img.shields.io/maintenance/yes/2020) 
![Build status badge](https://github.com/xinabox/pxt-SW01/workflows/maker/badge.svg)
![Build status badge](https://github.com/xinabox/pxt-SW01/workflows/microbit/badge.svg)
# XinaBox SW01 MakeCode extension

This library provides functions to access environmental data from the [XinaBox SW01](https://xinabox.cc/products/sw01).

![](sw01.jpg)

[Read more about it or purchase one here](https://xinabox.cc/products/sw01)

The SW01 uses a Bosch BME280 to report:
* temperature 
* humidity 
* atmospheric pressure.

This library provides functions that give you access to these variables, as well some measures that can be derived from them:
* dewpoint
* pressure altitude
* density altitude
* cloud base

There are 3 other functions:
* power on/off
* set  address

## ~ hint

By default the SW01 power is On, and the address is set correctly (to Off).
You do NOT need to power on the SW01 or set the address to use it

## ~



## How-to guides:

A comprehensive set of How-to guides that show you how to use the blocks is available online:
[XinaBox How-to guides for the SW01 on BBC micro:bit using MakeCode](https://drive.google.com/open?id=1_oNXhgYeW0AHTLmRxomowxPdvNBCi0iS)


## Core functions: Temperature:

```blocks
// Show the temperature in Celcius on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.temperature(SW01.Temperature.Celcius))

// Show the temperature in Celcius on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.temperature(SW01.Temeperature.Celcius))

```


## Core functions: Humidity:

```blocks
// Show the relative humidity (as a percentage) on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.humidity())

```

## Core functions: Atmospheric pressure:

```blocks
// Show the atmospheric pressure in HectoPascals (Pascals / 100) on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.pressure(SW01.Pressure.HectoPascal))

// Show the atmospheric pressure in MilliBar (same as HectoPascal) on the micro:bit 5x5 LED matrix:
basic.showNumber(SW01.pressure(SW01.Pressure.MilliBar))

```

## Attribution:
The library is based on [BME280 Package from microbit/micropython Chinese community](https://github.com/makecode-extensions/BME280). 

Thanks also to Shaoziyang for all the heavy lifting :)
  


## License:

MIT

Copyright (c) 2019, XinaBox Limited

## Supported targets:

* PXT/microbit
* PXT/CC03
* PXT/CS11
* PXT/CW03


