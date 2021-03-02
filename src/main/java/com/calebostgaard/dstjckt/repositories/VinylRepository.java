package com.calebostgaard.dstjckt.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.calebostgaard.dstjckt.models.Vinyl;

@Repository
public interface VinylRepository extends CrudRepository<Vinyl, Long> {
    List<Vinyl> findAll();
}