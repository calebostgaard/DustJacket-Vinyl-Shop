<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
   
 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Create Song</title>
</head>
<body>
	<h1>Create a New Song</h1>
	<form:form action="/songs" method="post" modelAttribute="song">
	    <p>
	        <form:label path="name">Name</form:label>
	        <form:errors path="name"/>
	        <form:input path="name"/>
	    </p>
	    <p>
	        <form:label path="album">Album</form:label>
	        <form:errors path="album"/>
	        <form:input path="album"/>
	    </p>
		<p>
	        <form:label path="artist">Artist</form:label>
	        <form:errors path="artist"/>
	        <form:select path="artist">
	        	<c:forEach items="${artists}" var="a">
	        		<form:option value="${a}">
	        			<c:out value="${a.name}"></c:out>
	        		</form:option>
				</c:forEach>
	        </form:select>
	    </p>
		<p>
	        <form:label path="genre">Genre</form:label>
	        <form:errors path="genre"/>
	        <form:select path="genre">
	        	<c:forEach items="${genres}" var="g">
	        		<form:option value="${g}">
	        			<c:out value="${g.name}"></c:out>
	        		</form:option>
				</c:forEach>
	        </form:select>
	    </p>
	    <input type="submit" value="Create"/>
	</form:form> 
	<br><br>
	<a href="/"><button>Go Home</button></a>
</body>
</html>