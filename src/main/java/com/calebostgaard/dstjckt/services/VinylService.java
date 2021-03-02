package com.calebostgaard.dstjckt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.calebostgaard.dstjckt.models.Vinyl;
import com.calebostgaard.dstjckt.repositories.VinylRepository;

@Service
public class VinylService {
    // adding the vinyl repository as a dependency
    private final VinylRepository vinylRepository;
    
    public VinylService(VinylRepository vinylRepository) {
        this.vinylRepository = vinylRepository;
    }
    // returns all the vinyls
    public List<Vinyl> allVinyls() {
        return vinylRepository.findAll();
    }
    // creates a vinyl
    public Vinyl createVinyl(Vinyl vinyl) {
        return vinylRepository.save(vinyl);
    }
    // retrieves a vinyl
    public Vinyl findVinyl(Long id) {
        Optional<Vinyl> optionalVinyl = vinylRepository.findById(id);
        if(optionalVinyl.isPresent()) {
            return optionalVinyl.get();
        } else {
            return null;
        }
    }
    
    public Vinyl updateVinyl(Vinyl s) {
    	return vinylRepository.save(s);
    }

    
 // deletes a vinyl
    public void deleteVinyl(Long id) {
    	vinylRepository.deleteById(id);
    }
}
