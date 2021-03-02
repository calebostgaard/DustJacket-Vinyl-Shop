<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>    
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>  
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Edit Task</title>
</head>
<body>
	<h1>Edit Task</h1>
	<form:form action="/tasks/${task.id}" method="post" modelAttribute="task">
	    <input type="hidden" name="_method" value="put">
	    <p>
	        <form:label path="name">Task</form:label>
	        <form:errors path="name"/>
	        <form:input path="name"/>
	    </p>
		<p>
	        <form:label path="priority">Priority</form:label>
	        <form:errors path="priority"/>
	        <form:select path="priority">
        		<form:option value="High">High</form:option>
        		<form:option value="Medium">Medium</form:option>
        		<form:option value="Low">Low</form:option>
	        </form:select>
	    </p>
		<p>
	        <form:label path="assignee">Assignee</form:label>
	        <form:errors path="assignee"/>
	        <form:select path="assignee">
	        	<c:forEach items="${users}" var="u">
	        		<form:option value="${u}">
	        			<c:out value="${u.name}"></c:out>
	        		</form:option>
				</c:forEach>
	        </form:select>
	    </p>
	    <form:hidden path="creator" value="${task.creator.id}"/>
	    <input type="submit" value="Submit"/>
	</form:form>
	<a href="/"><button>Go Home</button></a>
</body>
</html>