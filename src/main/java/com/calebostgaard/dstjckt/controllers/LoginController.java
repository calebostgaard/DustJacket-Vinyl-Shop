package com.calebostgaard.dstjckt.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.calebostgaard.dstjckt.models.User;
import com.calebostgaard.dstjckt.services.UserService;
import com.calebostgaard.dstjckt.validators.UserValidator;

@Controller
public class LoginController {
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private UserValidator userValidator;
    
    @RequestMapping("/registration")
    public String registerForm(@ModelAttribute("user") User user) {
        return "user/registrationPage.jsp";
    }
    @RequestMapping("/login")
    public String login() {
        return "user/loginPage.jsp";
    }
    
    @RequestMapping(value="/registration", method=RequestMethod.POST)
    public String registerUser(@Valid @ModelAttribute("user") User user, BindingResult result, HttpSession session) {
        userValidator.validate(user, result);
        if(result.hasErrors()) {
            return "user/registrationPage.jsp";
        }
        User u = userService.registerUser(user);
        session.setAttribute("userId", u.getId());
        session.setAttribute("userObject", u);
        return "redirect:/";
    }
    
    @RequestMapping(value="/login", method=RequestMethod.POST)
    public String loginUser(@RequestParam("email") String email, 
    						@RequestParam("password") String password, 
    						Model model, HttpSession session,
    						RedirectAttributes flash) {
    	if (userService.authenticateUser(email, password)) {
    		User thisUser = userService.findByEmail(email);
    		session.setAttribute("userId", thisUser.getId());
            session.setAttribute("userObject", thisUser);
    		return "redirect:/";
    	} 
    	flash.addFlashAttribute("error", "Failed to login");
        return "redirect:/login";
    }
    
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
    	session.invalidate();
    	return "redirect:/login";

    }
}