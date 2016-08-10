$(function(){
  $(".selfTyping").typed({
    //Por si quiero editar esto luego: https://github.com/mattboldt/typed.js/
    strings: [ 
      "Information Engineer", // ^1000: Escribir lo siguiente en 1 seg
      "FullStack Developer.",
      "Workaholic.",
      "In love with 5 of the 10 arts."
    ],
    typeSpeed: 0,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });
});