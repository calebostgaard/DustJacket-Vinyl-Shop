package com.calebostgaard.dstjckt.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.calebostgaard.dstjckt.models.Song;

@Repository
public interface SongRepository extends CrudRepository<Song, Long> {
    List<Song> findAll();
    // this method finds songs with artist containing the search string
    List<Song> findByArtistContaining(String search);
    // this method finds songs with genre containing the search string
    List<Song> findByGenreContaining(String search);
}
