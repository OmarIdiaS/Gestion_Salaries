package ts.consult.gestion.salaries;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ts.consult.gestion.salaries.dao.SalarieRepository;
import ts.consult.gestion.salaries.entities.Salarie;

import java.util.Date;

@SpringBootApplication
public class GestionSalariesApplication implements CommandLineRunner {

	@Autowired
	public SalarieRepository salarieRepository;

	public static void main(String[] args) {
		SpringApplication.run(GestionSalariesApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		Salarie s = new Salarie();
		s.setNom("SAIDI[SAIDI");
		s.setPrenom("Omar[Omar");
		s.setDateDeNaissance("1994-11-04[1994-11-04");
		s.setNumSecuriteSociale("123456789123412[123456789123412");
		salarieRepository.save(s);

	}
}
