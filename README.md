# fourier-series
An application of the [Fourier series](https://en.wikipedia.org/wiki/Fourier_series) to recreate a drawing with rotating circles. See [this video](https://www.youtube.com/watch?v=r6sGWTCMz2k) for an explanation of the math (requires calculus).

An old project, supposed to be for application into AP Computer Science A.

## Origin
I've always loved to watch [3blue1brown](https://www.youtube.com/c/3blue1brown). One day two years ago, during my freshman year (of high school), I watched [a certain video](https://www.youtube.com/watch?v=r6sGWTCMz2k) of his (probably for at least the second time) and felt inspired enough to try to recreate the circle drawings shown in the video.

This project brought me back to [a Coding Train video](https://www.youtube.com/watch?v=MY4luNgGfms) (or perhaps [two](https://www.youtube.com/watch?v=Mm2eYfj0SgA)) I had seen a year or so prior to that, back in seventh or eighth grade when I was very interested in both computer science and math, but I stress that I *did not* rewatch these videos while writing the code for this website; unlike some other projects (I'm looking at [you](https://www.youtube.com/watch?v=flxOkx0yLrY)), the code for this one was entirely my own.

I was drawn back to this topic because of the beauty of the central mathematical idea in it, this one elegant integral:
$$c_n=\int _0^1 e^{-2\pi i n t} f(t) \ dt$$
Now, I'll leave the explanation of what this integral is doing to [3blue1brown](https://www.youtube.com/watch?v=r6sGWTCMz2k&t=982s), but let me say right here that this is beautiful. It's amazing that such a simple formula can give such a complicated idea as representing a drawn path with infinite circles. I think if anything in math represents its beauty to me, it would be this (or [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula)). Even [its origins](https://en.wikipedia.org/wiki/Heat_equation#Solving_the_heat_equation_using_Fourier_series) in [the heat equation](https://en.wikipedia.org/wiki/Heat_equation) show well the connections to be found everywhere in mathematics.


## Function
This app allows the user to input a continuous path by drawing on a canvas. Any disconnected segments will be joined together in the path, but because of the lack of data, it is recommended that the user draw continuously rather than inputting discrete points.

After a path is completed, the user should press the "begin drawing" button or hit the ENTER key. The app will [calculate numerically](https://en.wikipedia.org/wiki/Numerical_integration) the integral found above to find constants $c_n$, represented in the code as the array `vectors`, though with different indices, and use these to determine the starting angles and magnitudes of the radii in each circle. The radii will start rotating at a constant rate determined by their index, and their sum will trace out the inputted drawing path, or at least an approximation of it.

To change the accuracy of the approximation, the user may adjust the slider found under the canvas, which will update in real time the number of circles used to trace out the path. By default this value is set to 200, but the user may update it to be anywhere between 4 and 300. More circles may lag slower devices (I tried this site on my phone and anything above around 40 tended to lag, but my computer can get to 300 without lagging at all).


## Clarifications
1. Admittedly, this site is not very pretty. The point was however to show the beauty of the math itself rather than the drawing app necessarily. I didn't intend this to be much more than just a casual project I could spend a bit of time thinking about while bored in my Algebra II class (while I probably did not think about this much in that class, I *was* still bored and led into learning a bit of calculus, which this is, so it's still somewhat accurate), and so as a result the design and execution are not as well done as they could be. I was pleased, however, to find upon revisiting this now (early junior year) that I did do a nice job of commenting up my code (thanks, past self!).

2. For this project, I did use a library called [p5.js](https://p5js.org/), which is itself based on the [Processing](https://processing.org/) Java environment. This allowed me to focus more on the math and less on the setup or retrieval of inputs from the canvas, as I would not find those as interesting to deal with (and I code only as a hobby). I got used to p5.js when I first learned how to code in third grade on [Khan Academy](https://www.khanacademy.org/computing/computer-programming) (which uses the p5.js library as a base), and it's been a helpful tool since.

3. This repository contains a lot of files, but most of them do not contain much content. [Heroku](https://www.heroku.com/) is the way I learned to host websites, and it's helpful for hosting a server. However, this project doesn't specifically need a dynamic server, so most of the files are just formalities. I set up baseline NodeJS and HTML files so that I could focus on making the single page interactive with JavaScript. The real app content — all of my dealing with inputs, calculations, and displays — can be found in [main.js](public/main.js), as at the time I did not care much to split this into multiple files.
