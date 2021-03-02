<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to DstJckt</title>
</head>
<body>
	<h1>Welcome to DstJckt, <c:out value="${user.firstName}"/></h1>
	<a href="/songs/new">New Song</a> | <a href="/artists/new">New Artist</a> | <a href="/genres/new">New Genre</a> | <a href="/vinyls/new">New Vinyl</a> | <a href="/logout">Logout</a>
	<table>
	    <thead>
	        <tr>
	            <th>Song Name</th>
	            <th>Artist</th>
	            <th>Album</th>
	            <th>Genre</th>
	        </tr>
	    </thead>
	    <tbody>
	        <c:forEach items="${song}" var="i">
	        <tr>
	            <td><a href="/songs/${i.id}/"><c:out value="${i.name}"/></a></td>
	            <td><a href="/artists/${i.artist.id}/"><c:out value="${i.artist.name}"/></a></td>
	            <td><c:out value="${i.album}"/></td>
	            <td><a href="/genres/${i.genre.id}/"><c:out value="${i.genre.name}"/></a></td>
	            <td>
	           		<form action="/vinyls/addsong/${i.id}" method="post">
				        <select name="vinyls">
				        	<c:forEach items="${vinyls}" var="v">
				        		<option value="${v.id}">
				        			<c:out value="${v.name}"></c:out>
				        		</option>
							</c:forEach>
				        </select>
					    <input type="submit" value="Add to Vinyl"/>
					</form> 
	            </td>
	        </tr>
	        </c:forEach>
	    </tbody>
	</table>
</body>
</html>