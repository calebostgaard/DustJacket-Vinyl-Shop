package com.calebostgaard.dstjckt.controllers;

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

import com.calebostgaard.dstjckt.models.User;
import com.calebostgaard.dstjckt.models.Artist;
import com.calebostgaard.dstjckt.services.UserService;
import com.calebostgaard.dstjckt.services.ArtistService;

@Controller
public class ArtistController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ArtistService artistService;
	
	
	
	@GetMapping("/artists/new")
	public String newArtist(@ModelAttribute("users") User user, @ModelAttribute("artist") Artist artist, Model model, HttpSession session) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			model.addAttribute("users", userService.allUsers());
			model.addAttribute("user", session.getAttribute("userObject"));
			return "artist/newArtist.jsp";
		}
		return "redirect:/login";
	}

	@RequestMapping(value="/artists", method=RequestMethod.POST)
	public String createArtist(@ModelAttribute("users") User user,
								@Valid @ModelAttribute("artist") Artist artist,  
								BindingResult res, HttpSession session, 
								Model model) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			if (res.hasErrors()) {
				model.addAttribute("users", userService.allUsers());
				model.addAttribute("user", session.getAttribute("userObject"));
				return "artist/newArtist.jsp";
	        } else {
	        	artistService.createArtist(artist);
	            return "redirect:/artists/new";
	        }
		}
		return "redirect:/login";
	}

    @RequestMapping("/artists/{id}")
    public String showArtist(Model model, @PathVariable("id") Long id, HttpSession session) {
    	Artist artist = artistService.findArtist(id);
        model.addAttribute("artist", artist);
        return "artist/showArtist.jsp";
    }
    
    @RequestMapping(value="/artists/{id}", method=RequestMethod.DELETE)
    public String deleteArtist(@PathVariable("id") Long id, HttpSession session) {
    	artistService.deleteArtist(id);
        return "redirect:/home";
    }


}