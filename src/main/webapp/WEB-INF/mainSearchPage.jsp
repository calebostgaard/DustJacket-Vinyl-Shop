		<div class="row min-vh-100 justify-content-center align-items-center" id="mainContent">
			<form action="/" method="post" id="searchForm">
				<h2 class="text-muted">Browse</h2>
				<div class="input-group">
					 
					 <div class="input-group-prepend">
					 	<select class="btn btn-outline-secondary dropdown-toggle" id="searchOption">
					 		<option value="tracks">by Song Title</option>
					 		<option value="artists">by Artist Name</option>
					 	</select>
<!-- 					    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button> -->
<!-- 					    <div class="dropdown-menu" id="searchOption"> -->
<!-- 					      <a class="dropdown-item">Songs</a> -->
<!-- 					      <a class="dropdown-item">Artists</a> -->
<!-- 					      <a class="dropdown-item" href="#">Another action</a> -->
<!-- 					      <a class="dropdown-item" href="#">Something else here</a> -->
<!-- 					      <div role="separator" class="dropdown-divider"></div> -->
<!-- 					      <a class="dropdown-item" href="#">Separated link</a> -->
<!-- 					    </div> -->
					 </div>
					  
					 
				 	<input type="text" class="form-control" aria-label="Text input with dropdown button" id="searchBar" placeholder="Nas, BTS, Katy Perry, the (one and only) Wiggles..." required>
				 	
				 	<div class="input-group-append">
					    <button class="input-group-text" id="searchButton">Search</button>
					 </div>
				</div>
			
<!-- 				  <div class="input-group-append">
				    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
				    <div class="dropdown-menu" id="searchOption">
				      <a class="dropdown-item">Songs</a>
				      <a class="dropdown-item">Artists</a>
				      <a class="dropdown-item" href="#">Another action</a>
				      <a class="dropdown-item" href="#">Something else here</a>
				      <div role="separator" class="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Separated link</a>
				    </div>
				  </div> -->
			</form>
			<div>
				<div id="gallery" style="display:block;">
				</div>
			</div>
		</div>