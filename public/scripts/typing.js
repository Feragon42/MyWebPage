$(function(){
  $(".selfTyping").typed({
    //Por si quiero editar esto luego: https://github.com/mattboldt/typed.js/
    strings: ["Programador.", 
      "Escritor^1000... o intentando serlo.",
      "Ingeniero en Informacion^1000... muy pronto.", // ^1000: Escribir lo siguiente en 1 seg
      "Gamer empedernido.",
      "Geek sin remedio.",
      "Game Designer^1000... aspirante.",
      "Lector apacionado.",
      "Y, lo mas importante^1000 Web Developer.",
      "Habil en FrontEnd^1000... e intentandolo ser con BackEnd."],
    typeSpeed: 0,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });
});