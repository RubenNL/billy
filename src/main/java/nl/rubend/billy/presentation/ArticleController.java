package nl.rubend.billy.presentation;

import nl.rubend.billy.data.SpringArticleRepository;
import nl.rubend.billy.domain.Article;
import nl.rubend.billy.presentation.DTO.ArticleDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/article")
public class ArticleController {
	private final SpringArticleRepository repository;

	public ArticleController(SpringArticleRepository repository) {
		this.repository = repository;
	}
	@GetMapping("{code}")
	public ArticleDTO get(@PathVariable Integer code) {
		return new ArticleDTO(repository.findById(code).orElse(null));
	}
	@PostMapping
	public Article create(@RequestBody Article article) {
		article=repository.save(article);
		return repository.getOne(article.getId());
	}
}
