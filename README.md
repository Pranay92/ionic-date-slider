# ionic-date-slider

Beautiful date picker slider for ionic framework.

<img src="https://github.com/Pranay92/ionic-date-slider/blob/master/assets/ionic.gif" />

## Installation

1. Do a ````bower install ionic-date-slider````.

## Usage

1. Include file ````src/ionic-date-slider.js```` in your html.
2. Inject module ````dateSlider```` as a dependency in your angular app.

## HTML

````
<data-date-slider-picker on-select-date="setDate" total-days="90" date-select-var="day.today">
</data-date-slider-picker>
````

## Attributes

1. **on-select-date*** - Tells which function to call from the current controller when the user selects a date. As of now it passes an argument with a date string value ````Sat Jan 23 2016````

2. **date-select-var** - Tells the slider which value to watch for when the directive loads and automatically the specified date.

3. **total-days** - Tells slider how many days it needs to generate starting from current date.

## Heads up

The directive depends on ionic components so you have to make sure you are using an ionic project for this. Also, it does not have its own styling (as of now) so UI might look a different if you're using a different CSS than the default ionic.css

## Demo

1. Have **ionic** installed.
2. Clone this repository.
3. Go to demo/blank/
4. Type `ionic serve`  

## Todo/Limitations

1. It only supports dates starting from the current date, it will be nice to add support for past dates.
2. Total no of days supports static date generation, it will be nice to generate future dates as and when user slides through.
3. Add themes
