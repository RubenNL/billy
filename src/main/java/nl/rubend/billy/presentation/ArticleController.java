package nl.rubend.billy.presentation;

import nl.rubend.billy.data.SpringArticleRepository;
import nl.rubend.billy.domain.Article;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/article")
public class ArticleController {
	private final SpringArticleRepository repository;

	public ArticleController(SpringArticleRepository repository) {
		this.repository = repository;
	}
	@GetMapping("{code}")
	@ResponseStatus(HttpStatus.OK)
	public Article get(@PathVariable Integer code) {
		return repository.findById(code).orElse(null);
	}
	@PostMapping
	public Article create(@RequestBody Article article) {
		article=repository.save(article);
		return repository.getOne(article.getId());
	}
}
