$(document).ready(function(){
  	$(".container").toggle("explode");
 	$(window).unload(function(){
  		$(".container").toggle("explode");
  		console.log("explode");
 	});

	var data;
});