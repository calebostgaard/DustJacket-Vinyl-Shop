package com.calebostgaard.dstjckt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.calebostgaard.dstjckt.models.Genre;
import com.calebostgaard.dstjckt.repositories.GenreRepository;

@Service
public class GenreService {

    // adding the genre repository as a dependency
    private final GenreRepository genreRepository;
    
    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }
    // returns all the genres
    public List<Genre> allGenres() {
        return genreRepository.findAll();
    }
    // creates a genre
    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }
    // retrieves a genre
    public Genre findGenre(Long id) {
        Optional<Genre> optionalGenre = genreRepository.findById(id);
        if(optionalGenre.isPresent()) {
            return optionalGenre.get();
        } else {
            return null;
        }
    }
    
    public Genre updateGenre(Genre s) {
    	return genreRepository.save(s);
    }
   
    
 // deletes a genre
    public void deleteGenre(Long id) {
    	genreRepository.deleteById(id);
    }
}
