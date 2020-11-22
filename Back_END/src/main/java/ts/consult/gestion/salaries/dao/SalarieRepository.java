package ts.consult.gestion.salaries.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ts.consult.gestion.salaries.entities.Salarie;

import java.util.List;
@CrossOrigin("*")
@RepositoryRestResource
public interface SalarieRepository  extends JpaRepository<Salarie, Long> {

}
