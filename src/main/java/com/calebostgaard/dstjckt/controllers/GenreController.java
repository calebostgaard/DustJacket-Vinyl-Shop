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
import com.calebostgaard.dstjckt.models.Genre;
import com.calebostgaard.dstjckt.services.UserService;
import com.calebostgaard.dstjckt.services.GenreService;

@Controller
public class GenreController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GenreService genreService;
	
	
	
	@GetMapping("/genres/new")
	public String newGenre(@ModelAttribute("users") User user, @ModelAttribute("genre") Genre genre, Model model, HttpSession session) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			model.addAttribute("users", userService.allUsers());
			model.addAttribute("user", session.getAttribute("userObject"));
			return "genre/newGenre.jsp";
		}
		return "redirect:/login";
	}

	@RequestMapping(value="/genres", method=RequestMethod.POST)
	public String createGenre(@ModelAttribute("users") User user,
								@Valid @ModelAttribute("genre") Genre genre,  
								BindingResult res, HttpSession session, 
								Model model) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			if (res.hasErrors()) {
				model.addAttribute("users", userService.allUsers());
				model.addAttribute("user", session.getAttribute("userObject"));
				return "genre/newGenre.jsp";
	        } else {
	        	genreService.createGenre(genre);
	            return "redirect:/genres/new";
	        }
		}
		return "redirect:/login";
	}

    @RequestMapping("/genres/{id}")
    public String showGenre(Model model, @PathVariable("id") Long id, HttpSession session) {
    	Genre genre = genreService.findGenre(id);
        model.addAttribute("genre", genre);
        return "genre/showGenre.jsp";
    }
    
    @RequestMapping(value="/genres/{id}", method=RequestMethod.DELETE)
    public String deleteGenre(@PathVariable("id") Long id, HttpSession session) {
    	genreService.deleteGenre(id);
        return "redirect:/home";
    }


}