package com.calebostgaard.dstjckt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.calebostgaard.dstjckt.models.Artist;
import com.calebostgaard.dstjckt.repositories.ArtistRepository;

@Service
public class ArtistService {

    // adding the artist repository as a dependency
    private final ArtistRepository artistRepository;
    
    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }
    // returns all the artists
    public List<Artist> allArtists() {
        return artistRepository.findAll();
    }
    // creates a artist
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }
    // retrieves a artist
    public Artist findArtist(Long id) {
        Optional<Artist> optionalArtist = artistRepository.findById(id);
        if(optionalArtist.isPresent()) {
            return optionalArtist.get();
        } else {
            return null;
        }
    }
    
    public Artist updateArtist(Artist s) {
    	return artistRepository.save(s);
    }
   
    
 // deletes a artist
    public void deleteArtist(Long id) {
    	artistRepository.deleteById(id);
    }
}
