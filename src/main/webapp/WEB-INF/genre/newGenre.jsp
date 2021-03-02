<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
   
 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Create Genre</title>
</head>
<body>
	<h1>Create a New Genre</h1>
	<form:form action="/genres" method="post" modelAttribute="genre">
	    <p>
	        <form:label path="name">Genre Name:</form:label>
	        <form:errors path="name"/>
	        <form:input path="name"/>
	    </p>
	    <input type="submit" value="Create"/>
	</form:form> 
	<br><br>
	<a href="/"><button>Go Home</button></a>
</body>
</html>