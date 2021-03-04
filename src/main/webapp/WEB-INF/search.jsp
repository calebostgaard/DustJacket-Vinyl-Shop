<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="/css/search.css">
<!--     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<!--     <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script> -->
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
  	<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="js/search.js"></script>
    <script>
      function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }
    </script>
    <title>DskJckt</title>
</head>
<body>
	<div class="container">
		<div class="row" id="mainContent">
			<form action="/" method="post" id="searchForm">
				<div class="form-group">
					<label for="searchBar">Search:</label>
					<input type="text" name="searchBar" id="searchBar">
					
<!-- 					<input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked> -->
<!-- 					<label class="btn btn-outline-success" for="success-outlined">Checked success radio</label> -->
					
<!-- 					<input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off"> -->
<!-- 					<label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label> -->
					
					<input type="radio" class="btn btn-check searchBarOption" name="options-outlined" id="searchSongs" autocomplete="off" value="tracks" checked>
					<label class="btn btn-outline-success" for="searchSongs">By Song</label>
					
					<input type="radio" class="btn btn-check searchBarOption" name="options-outlined" id="searchArtists" autocomplete="off" value="artists">					
					<label class="btn btn-outline-danger" for="searchArtists">By Artist</label>

					
					<button class="btn btn-primary">Submit</button>
				</div>
			</form>
			<div>
				<div id="gallery" style="display:block;">
				</div>
			</div>
		</div>
	</div>
</body>
</html><%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>