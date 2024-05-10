//creating road on canvas
const canvas = document.getElementById('startingCanvas');
canvas.height=window.innerHeight;
canvas.width=200;

//creating car on canvas
const ctx = canvas.getContext("2d");
const car=new Car(100,100,25,45);
car.draw(ctx);