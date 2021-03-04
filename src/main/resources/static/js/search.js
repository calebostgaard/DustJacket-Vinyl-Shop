function previewTrack(external_link){
	window.open(external_link, '_blank');
}

$(document).ready(function(){
	var data; // this holds the spotify data and gets defned in the
			// form submission and ajax call
	
	
	$("#searchForm").submit(function(event){
		event.preventDefault();
		var t = $("#searchBar").val();
		var options = document.getElementsByClassName('searchBarOption');
		console.log(options);
		var option;
		for (var i = 0; i < options.length; i++){
			if (options[i].checked){
				option = options[i].value;
			}
		}
		
		$("#searchForm").toggle("explode");
		$.ajax({
			url: "/searchAPI8",
			data: {'searchBar': t},
			success: function(result){
				console.log("success");
				
				var temp = JSON.parse(result);
				data = temp;		
				console.log(temp);
				console.log(temp[option]['items'][0].name);
				$("#gallery").empty();
				if (option=="tracks"){
					var galleryHeader = "<div id='galleryHeader' class='row' style='display:none;'><h2 class='col'><span class='text-white bg-dark'>Song Title </span>& Related Artists <span class='text-muted'>& Related Album</span></h2><h2 class='col-3 text-right text-muted' id='searchHeader'>Search Again</h2></div>";
				} else{
					var galleryHeader = "<div id='galleryHeader' class='row' style='display:none;'><h2 class='col'><span class='text-white bg-dark'>Artist </span>& Related Genres</h2><h2 class='col-3 text-right text-muted' id='searchHeader'>Search Again</h2></div>";
				}
				$("#gallery").append(galleryHeader);
				$("#galleryHeader").fadeIn("slow");
//				$("#searchHeader").fadeIn("slow");
				
				for (var i = 0; i < temp[option]['items'].length; i++){

//				<h3 id="song1"></h3>
//				<img style="width: 40px; height: 40px" src="" id="album_img_1">					
					var section = `#section_${i}`;
					var sectionHTML = `<div class='searchData' style="display:none;" id=section_${i}></div>`
					var firstField = temp[option]['items'][i].name;
					var secondField = "";
					var thirdField = "";
					var external_link = "";
					if (option=='tracks'){
						var secondFieldList = temp[option]['items'][i]['artists'];
						for (var n = 0; n < secondFieldList.length; n++){
							secondField += secondFieldList[n].name + ", ";
						}
						
						secondField = secondField.substring(0, secondField.length - 2);
						
						var thirdField = temp[option]['items'][i]['album'].name;
						external_link = temp[option]['items'][i]['external_urls']['spotify'];
						
						var testHTML = `
							<ul class='options' style='display:none;' id="options_${i}">
								<li class='addToVinyl hover' id='addToVinyl_${i}'><h5>Add to A Vinyl</h5></li>
								<li class='saveToPlaylist hover' id='saveToPlaylist_${i}'><h5>Save to A Playlist</h5></li>
								<li class='preview hover' id='preview_${i}'>
									<h5 onclick="previewTrack('${external_link}')">preview in spotify</h5>
								</li>
							</ul>
						`
							
					} else{
						console.log("made it");
						var secondFieldList = temp[option]['items'][i]['genres'];
						for (var n = 0; n < secondFieldList.length; n++){
							secondField += secondFieldList[n] + ", ";
						}
						
						secondField = secondField.substring(0, secondField.length - 2);
//						
//						var thirdField = temp[option]['items'][i]['album'].name;
////						for (var n = 0; n < thirdFieldList.length; n++){
////							thirdField += thirdFieldList[n].name + ", ";
////						}
//						
////						thirdField = thirdField.substring(0, thirdField.length - 2);

						var testHTML = `
							<ul class='options' style='display:none;' id="options_${i}">
								<li class='albums hover' id='albums_${i}'><h5>Albums</h5></li>
								<li class='top_tracks hover' id='topTracks_${i}'><h5>Top tracks</h5></li>
								<li class='preview_artist hover' id='previewArtist_${i}'>
									<h5 onclick="previewTrack('${external_link}')">preview in spotify</h5>
								</li>
							</ul>
						`
					}
					
					
					var html = `
						<div class="expandable" id="expandable_${i}">
						<h4 class="expandable hover" id=artist_${i}>
						<span class="text-white bg-dark">${firstField}</span>
						<span class="expandable">${secondField}</span>
						<span class="text-muted expandable">${thirdField}</span>
						</h4>
						</div>`;
					
					var htmlID = `#expandable_${i}`
					
					$("#gallery").append(sectionHTML);
					$(section).append(html);
					$(htmlID).append(testHTML);

				}
				
				$(".searchData").each(function(){
						$(this).fadeIn("slow");
//						setTimeout(function(){$(this).fadeIn("slow");}, 500);
				});
				
			},
			error: function(result){
				console.log("failed");
				console.log(result);
			}
		})
	})

	// show search form
	$(document.body).on("click", "#searchHeader",function(){
		console.log("clicked #searchHeader");
		$("#searchForm").toggle("explode");
	});

	// show line item details
	$(document.body).on("click","h4",function(){
		var temp = $(this).prop("id").split("_");
		var temp = temp[1];
		var idString = "#options_"+ temp;
		$(idString).toggle("slide");
		return;
		
	});
	
	// opens up list of vinyl options
	$(document.body).on("click", ".addToVinyl",function(e){
		e.stopPropagation();
		console.log("clicked addToVinyl");
		var optionListId = "vinylList_" + $(this).prop("id").split("_")[1];
		var optionListSelector = "#" + optionListId;
		var optionList = `
			<ul style="display:none;" id=${optionListId}>
				<li class="vinyl item-hover"><h5>Option 1</h5></li>
				<li class="vinyl item-hover"><h5>Option 2</h5></li>
				<li class="vinyl item-hover"><h5>Option 3</h5></li>
			</ul>
		`
		$(this).append(optionList)
		$(optionListSelector).toggle("fade");
	});
	
	// submits song information to addToVinyl route and displays alert
	$(document.body).on("click", ".vinyl",function(e){
		e.stopPropagation();
		console.log("clicked vinyl");
		console.log("successfully added song to Vinyl");
		console.log($(this).prop("tagName"));
		var trackSelectedId = $(this).parent().parent().parent().prop("id").split("_")[1];
		var trackSelected = data['tracks']['items'][trackSelectedId];
		var trackArtists = trackSelected['artists'];
		var trackArtistsString = "";
		for (var i = 0; i < trackArtists.length; i++){
			trackArtistsString += trackArtists[i].id + ",";
		}
		var alert = "<p id='alert' style='display:none;' class='alert alert-success' role='alert'>Success!</p>";
		var temp = $(this).parent().parent().parent().prepend(alert);
		$.ajax({
			url: '/addSongToVinyl',
			data: {},
			success: function(){
				
				// add Vinyl route through some ajax call
				
				// get recommendation through another ajax call
				$.ajax({
					url:"/recommendation8",
					data:{
						'artistIds': trackArtistsString,
					},
					success: function(e){
						console.log("here is another recommmendation");
						var recommendationData = JSON.parse(e);
						console.log(recommendationData);
						var recommendedSong = recommendationData['tracks'][3].name;
						console.log(e['tracks']);
						console.log(recommendedSong);
						var successString = "Success! Have you heard the song \"" + recommendedSong + "\" as well?";
						$("#alert").text(successString);
					}, error: function(e){
						console.log("no recommendation retrieved");
					}
				})
				
				// alert user of success
				console.log("successfully added song to Vinyl");
				$("#alert").toggle("slide","slow",function(){
					setTimeout(function(){
						$("#alert").toggle("slide","slow")
						}, 4000);
					setTimeout(function(){
						$("#alert").remove();	
					}, 5000);
				});
			}, error: function(){
				console.log("did not add song to Vinyl");
				var alert = "<p id='alert' class='alert alert-danger' role='alert'>Uh oh!</p>";
				var temp = $("#mainContent").prepend(alert);
				setTimeout(function(){
					$("#alert").toggle("fade")}, 2000);
			}
		})
	});
	
	// opens up list of user playlist options
	$(document.body).on("click", ".saveToPlaylist",function(e){
		e.stopPropagation();
		console.log("clicked addToPlaylist");
		var optionListId = "playlistList_" + $(this).prop("id").split("_")[1];
		var optionListSelector = "#" + optionListId;
		var optionList = `
			<ul style="display:none;" id=${optionListId}>
				<li class="playlist item-hover"><h5>Option 1</h5></li>
				<li class="playlist item-hover"><h5>Option 2</h5></li>
				<li class="playlist item-hover"><h5>Option 3</h5></li>
			</ul>
		`
		$(this).append(optionList)
		$(optionListSelector).toggle("fade");
	});
	
	// submits song information to addToPlaylist route and displays alert
	$(document.body).on("click", ".playlist",function(e){
		e.stopPropagation();
		console.log("clicked playlist");
		console.log("successfully added song to Playlist");
		var alert = "<p id='alert' style='display:none;' class='alert alert-success' role='alert'>Success!</p>";
		var temp = $(this).parent().parent().parent().prepend(alert);
		$("#alert").toggle("slide","slow",function(){
			setTimeout(function(){
				$("#alert").toggle("slide","slow")
				}, 1000);
		});
	});
	
	// go to the albums page
	$(document.body).on("click", ".albums",function(e){
		e.stopPropagation();
		$(".container").toggle("explode");
		window.location.href = "/artist";
	});
	
	$(document).click(function(e){ console.log(e.target);});
})   