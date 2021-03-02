<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title><c:out value="${song.name}"/></title>
	<link rel="stylesheet" href="/webjars/bootstrap/4.5.0/css/bootstrap.min.css" />
    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="/webjars/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>
<body>
	<h1><c:out value="${song.name}"/></h1>
	<p>Artist: <a href="/artists/<c:out value="${song.artist.id}"/>"><c:out value="${song.artist.name}"/></a></p>
	<p>Album: <c:out value="${song.album}"/></p>
	<p>Genre: <a href="/genres/<c:out value="${song.genre.id}"/>"><c:out value="${song.genre.name}"/></a></p>
	<form action="/songs/${song.id}" method="post">
	    <input type="hidden" name="_method" value="delete">
	    <input type="submit" value="Delete">
	</form>
	<a href="/"><button>Go Home</button></a>
</body>
</html>