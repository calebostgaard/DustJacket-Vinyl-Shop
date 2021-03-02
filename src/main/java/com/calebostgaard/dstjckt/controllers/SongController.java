package com.calebostgaard.dstjckt.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.calebostgaard.dstjckt.models.Song;
import com.calebostgaard.dstjckt.models.User;
import com.calebostgaard.dstjckt.models.Vinyl;
import com.calebostgaard.dstjckt.services.ArtistService;
import com.calebostgaard.dstjckt.services.GenreService;
import com.calebostgaard.dstjckt.services.SongService;
import com.calebostgaard.dstjckt.services.UserService;
import com.calebostgaard.dstjckt.services.VinylService;


@Controller
public class SongController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SongService songService;
	
	@Autowired
	private GenreService genreService;
	
	@Autowired
	private ArtistService artistService;
	
	@Autowired
	private VinylService vinylService;
	
	@RequestMapping("/")
    public String home() {
		return "redirect:/home";
    }
	
	@GetMapping("/home")
	public String index(HttpSession session, Model model) {
		// pulling an ID out of session
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			model.addAttribute("user", session.getAttribute("userObject"));
			List<Song> song = songService.allSongs();
	        model.addAttribute("song", song);
			model.addAttribute("vinyls", vinylService.allVinyls());

			return "index.jsp";
		}
		return "redirect:/login";
	}
	
	
	@RequestMapping(value="/vinyls/addsongs/{id}", method=RequestMethod.POST)
	public String addSongsToVinyl(@PathVariable("id")Long SongID,
										@RequestParam("vinyls") Long VinylID,
										HttpSession session) {
		Long loginId = (Long) session.getAttribute("userId");
		System.out.println("This is the login in");
		System.out.println(loginId);
		if (loginId != null) {
			Song thisSong = songService.findSong(SongID);
			Vinyl thisVinyl = vinylService.findVinyl(VinylID);
			thisVinyl.getSongs().add(thisSong);
			vinylService.createVinyl(thisVinyl);
			return "redirect:/vinyls/"+ VinylID;
		}
		return "redirect:/login";
	}
	
	@GetMapping("/songs/new")
	public String newSong(@ModelAttribute("users") User user, @ModelAttribute("song") Song song, Model model, HttpSession session) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			model.addAttribute("users", userService.allUsers());
			model.addAttribute("genres", genreService.allGenres());
			model.addAttribute("artists", artistService.allArtists());
			model.addAttribute("vinyls", vinylService.allVinyls());
			return "song/newSong.jsp";
		}
		return "redirect:/login";
	}

//	@PostMapping("/songs")
	@RequestMapping(value="/songs", method=RequestMethod.POST)
	public String createSong(@ModelAttribute("users") User user,
								@Valid @ModelAttribute("song") Song song,  
								BindingResult res, HttpSession session, 
								Model model) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			if (res.hasErrors()) {
				model.addAttribute("users", userService.allUsers());
				model.addAttribute("user", session.getAttribute("userObject"));
				return "song/newSong.jsp";
	        } else {
	        	songService.createSong(song);
	            return "redirect:/songs/new";
	        }
		}
		return "redirect:/login";
	}

    @RequestMapping("/songs/{id}")
    public String showSong(Model model, @PathVariable("id") Long id, HttpSession session) {
    	Song song = songService.findSong(id);
        model.addAttribute("song", song);
        return "song/showSong.jsp";
    }
    
    @RequestMapping(value="/songs/{id}", method=RequestMethod.DELETE)
    public String deleteSong(@PathVariable("id") Long id, HttpSession session) {
    	songService.deleteSong(id);
        return "redirect:/home";
    }


}
