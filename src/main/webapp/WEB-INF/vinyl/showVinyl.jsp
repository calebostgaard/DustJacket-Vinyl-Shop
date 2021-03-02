<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title><c:out value="${task.name}"/></title>
	<link rel="stylesheet" href="/webjars/bootstrap/4.5.0/css/bootstrap.min.css" />
    <script src="/webjars/jquery/3.5.1/jquery.min.js"></script>
    <script src="/webjars/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>
<body>
	<h1>Vinyl: <c:out value="${vinyl.name}"/></h1>
	<h3>Songs</h3>
	<ul>
		<c:forEach items="${vinyl.songs}" var="a">
       		<li>
       			<a href="/songs/<c:out value="${a.id}"/>"><c:out value="${a.name}"></c:out></a>
       		</li>
		</c:forEach>
	</ul>
	<form action="/vinyls/${vinyl.id}" method="post">
	    <input type="hidden" name="_method" value="delete">
	    <input type="submit" value="Delete">
	</form>
	<a href="/"><button>Go Home</button></a>
</body>
</html>