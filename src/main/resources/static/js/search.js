$(document).ready(function(){
	
	var data; // this holds the spotify data and gets defned in the
			// form submission and ajax call
	var previousData;
	var artistDetailData;
	var artistTopTrackData;
	var previousPageHTML; // for when you move to the artist page
	
	$(document.body).on("submit", "#searchForm", function(event){
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
		
		option= $("#searchOption").val();
		
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
				var galleryHeader;
				if (option=="tracks"){
					galleryHeader = "<div id='galleryHeader' style='display:none;' class='row'><h2 class='col'><span class='text-white bg-dark'>Song Title </span>& Related Artists <span class='text-muted'>& Related Album</span></h2><h2 class='col-3 text-right text-muted' id='searchHeader'>Search Again</h2></div>";
				} else{
					galleryHeader = "<div id='galleryHeader' style='display:none;' class='row'><h2 class='col'><span class='text-white bg-dark'>Artist </span>& Related Genres</h2><h2 class='col-3 text-right text-muted' id='searchHeader'>Search Again</h2></div>";
				}
				$("#gallery").append(galleryHeader);
				$("#galleryHeader").fadeIn("slow");
				
				for (var i = 0; i < temp[option]['items'].length; i++){

//				<h3 id="song1"></h3>
//				<img style="width: 40px; height: 40px" src="" id="album_img_1">					
					var section = `#section_${i}`;
					var sectionHTML = `<div class='searchData hide-start' id=section_${i}></div>`
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
				
						external_link = temp[option]['items'][i].preview_url;
						if (external_link == null){
							external_link = temp[option]['items'][i]['external_urls']['spotify'];
						}
						
						var testHTML = `
							<ul class='options no-bullets hide-start' id="options_${i}">
								<li class='addToVinyl item-hover' id='addToVinyl_${i}'><h5>Add to A Vinyl</h5></li>
								<li class='saveToPlaylist item-hover' id='saveToPlaylist_${i}'><h5>Save to A Playlist</h5></li>
								<li class='preview item-hover' id='preview_${i}'>
									<h5 onclick="previewTrack('${external_link}')">preview song</h5>
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
						external_link = temp[option]['items'][i]['external_urls']['spotify'];
						var testHTML = `
							<ul class="options no-bullets hide-start" id="options_${i}">
								<li class='albums item-hover' id='albums_${i}'><h5>More Details</h5></li>
								<li class='preview_artist item-hover' id='previewArtist_${i}'>
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
			<ul class="hide-start no-bullets" id=${optionListId}>
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
		var alert = "<p id='alert' class='hide-start alert alert-success' role='alert'>Success!</p>";
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
			<ul class="hide-start no-bullets" id=${optionListId}>
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
		var alert = "<p id='alert' class='hide-start alert alert-success' role='alert'>Success!</p>";
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
		var artistIndex = $(this).parent().parent().parent().prop("id").split("_")[1];
		var artistSelectedId = data['artists']['items'][artistIndex].id;
		console.log(artistSelectedId);
		$.ajax({
			url: "/artistTopTracks8",
			data: {
				'artist_id': artistSelectedId
			},
			success:function(e){
				previousData = data;
				artistTopTrackData = JSON.parse(e);
				console.log(artistTopTrackData);
			}, error: function(e){
				console.log("not redirected");
			}, complete: function(){
				$.ajax({
					url: "/artistDetails8",
					data: {
						'artist_id': artistSelectedId
					},
					success:function(e){
						previousData = data;
						artistDetailData = JSON.parse(e);
						console.log(artistDetailData);
					}, error: function(e){
						console.log("not redirected");
					}, complete: function(){
						$.ajax({
							url: "/getPageContent",
							data: {
								'title': 'artistPage',	
							}, success: function(e){
								console.log("rendering new page");
								$(".container").toggle("fade", "slow");
								setTimeout(function(){
									previousPageHTML =$(".container").html; 
									$(".container").empty();
									$(".container").append(e);
									populateArtistPage(artistDetailData, artistTopTrackData);	
								}, 1000)
								console.log("appended");
							}, error: function(e){
								console.log("couldn't grab the html");
							}, complete: function(){
								// populate the values
								
								setTimeout(function(){
									$("#container").toggle("fade", "slow");
				
									
									
								}, 1000);
		//						$(".container").toggle("fade", "slow");
								console.log("second fade");
							}	
						})
					}
				})
			}
		});
	});
	
	$(document).on("click", ".track", function(e){
		e.stopPropagation();
		$(this).parent().children("ul").first().toggle("fold");	
	});
	
	$(document).on("click", ".topTrack_addToVinyl", function(e){
		e.stopPropagation();
		$(this).children("ul").first().toggle("fold");	
	});
	
	// show what is clicked on the page and print to console. Test stuff
	$(document).click(function(e){ console.log(e.target);});
	

})

function previewTrack(external_link){
	window.open(external_link, '_blank');
}

function mainSearchPage(){
	$.ajax({
		url:"/getPageContent",
		data: {
			'title': 'mainSearchPage'
		}, success: function(e){
			$(".container").toggle("explode");
			setTimeout(function(){
				$(".container").empty();
				$(".container").append(e);	
			}, 1000);
		}, error: function(e){
			console.log("couldn't grab the html");
		}, complete: function(){
			
			setTimeout(function(){
				$(".container").toggle("slide", "slow");	
				
			}, 1000);
			
		}	
	})
}

function populateArtistPage(artistDetailData, artistTopTrackData){
	$("#artistPicture").attr("src", artistDetailData['images'][0]['url']);
	$("#artistPicture").css("height", artistDetailData['images'][0]['height'] + "px");
	$("#artistPicture").css("width", artistDetailData['images'][0]['width'] + "px");
	
	$("#artistHeader").text(artistDetailData['name']);
	$("#artistHeader").append("<h6 class='text-muted'>" + artistDetailData['followers']['total'] + " people following on Spotify</h6>");
	
	
	for (var i=0; i < artistTopTrackData['tracks'].length; i++){
		var trackName = artistTopTrackData['tracks'][i].name;
		var previewLink = artistTopTrackData['tracks'][i].preview_url;
		if (previewLink == null){
			previewLink = artistTopTrackData['tracks'][i]['external_urls'].spotify;
		}
		var artistsOnTheTrack = artistTopTrackData['tracks'][i]['artists'];
		var album = artistTopTrackData['tracks'][i]['album']['name'];
		var htmlString = `
			<li class='hover'">
				<h3 class="track" id='topTrack_${i}'>
					${trackName}
					<span class="track text-muted" id="topTrack_${i}_album">${album}</span>
					<span class="track text-muted" id="topTrack_${i}_artists"></span>
				</h3>
				<ul class="no-bullets hide-start">	
					<li class='item-hover' onclick="previewTrack('${previewLink}')">preview song<li>
					<li class='topTrack_addToVinyl item-hover'>
						Add to Vinyl
						<ul class='vinyl_list hide-start no-bullets'>
							<li class='item-hover'>Option 1</li>
							<li class='item-hover'>Option 2</li>
						</ul>
					</li>
				</ul>
			</li>
		`
		$("#accordion").append(htmlString);
	}
}