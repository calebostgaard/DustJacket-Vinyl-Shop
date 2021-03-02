package com.calebostgaard.dstjckt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.calebostgaard.dstjckt.models.Song;
import com.calebostgaard.dstjckt.repositories.SongRepository;



@Service
public class SongService {
    // adding the song repository as a dependency
    private final SongRepository songRepository;
    
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }
    // returns all the songs
    public List<Song> allSongs() {
        return songRepository.findAll();
    }
    // creates a song
    public Song createSong(Song song) {
        return songRepository.save(song);
    }
    // retrieves a song
    public Song findSong(Long id) {
        Optional<Song> optionalSong = songRepository.findById(id);
        if(optionalSong.isPresent()) {
            return optionalSong.get();
        } else {
            return null;
        }
    }
    
    public Song updateSong(Song s) {
    	return songRepository.save(s);
    }
    
//    public Song updateSong(Long id, String name, String album, Vinyl vinyl, Artist artist, Genre genre) {
//    	Optional <Song> temp = songRepository.findById(id);
//    	if(temp != null) {
//    		temp.get().setName(name);
//    		temp.get().setAlbum(album);
//    		temp.get().setAddedToVinyl(vinyl);
//    		temp.get().setArtist(artist);
//    		temp.get().setGenre(genre);
//
//    		return temp.get();
//    	}
//    	return null;        
//    }
    
 // deletes a song
    public void deleteSong(Long id) {
    	songRepository.deleteById(id);
    }
    
    //search by artist
    public List<Song> findByArtist(String search) {
    	return songRepository.findByArtistContaining(search);
    }
    
    //search by genre
    public List<Song> findByGenre(String search) {
    	return songRepository.findByGenreContaining(search);
    }
    

}