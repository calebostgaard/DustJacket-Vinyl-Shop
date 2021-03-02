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

import com.calebostgaard.dstjckt.models.Vinyl;
import com.calebostgaard.dstjckt.models.User;
import com.calebostgaard.dstjckt.services.VinylService;
import com.calebostgaard.dstjckt.services.UserService;

@Controller
public class VinylController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private VinylService vinylService;
	
	
	
	@GetMapping("/vinyls/new")
	public String newVinyl(@ModelAttribute("users") User user, @ModelAttribute("vinyl") Vinyl vinyl, Model model, HttpSession session) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			model.addAttribute("users", userService.allUsers());
			model.addAttribute("user", session.getAttribute("userObject"));
			return "vinyl/newVinyl.jsp";
		}
		return "redirect:/login";
	}

	@RequestMapping(value="/vinyls", method=RequestMethod.POST)
	public String createVinyl(@ModelAttribute("users") User user,
								@Valid @ModelAttribute("vinyl") Vinyl vinyl,  
								BindingResult res, HttpSession session, 
								Model model) {
		Long loginId = (Long) session.getAttribute("userId");
		if (loginId != null) {
			if (res.hasErrors()) {
				model.addAttribute("users", userService.allUsers());
				model.addAttribute("user", session.getAttribute("userObject"));
				return "vinyl/newVinyl.jsp";
	        } else {
	        	vinylService.createVinyl(vinyl);
	            return "redirect:/vinyls/new";
	        }
		}
		return "redirect:/login";
	}
	

    @RequestMapping("/vinyls/{id}")
    public String showVinyl(Model model, @PathVariable("id") Long id, HttpSession session) {
    	Vinyl vinyl = vinylService.findVinyl(id);
        model.addAttribute("vinyl", vinyl);
        return "vinyl/showVinyl.jsp";
    }
    
    @RequestMapping(value="/vinyls/{id}", method=RequestMethod.DELETE)
    public String deleteVinyl(@PathVariable("id") Long id, HttpSession session) {
    	vinylService.deleteVinyl(id);
        return "redirect:/vinyls/new";
    }


}
