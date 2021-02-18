package nl.rubend.billy.presentation;

import nl.rubend.billy.data.SpringCategoryRepository;
import nl.rubend.billy.presentation.DTO.CategoryDTO;
import nl.rubend.billy.presentation.DTO.CategorySmallDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/category")
public class CategoryController {
	private final SpringCategoryRepository repository;

	public CategoryController(SpringCategoryRepository repository) {
		this.repository = repository;
	}
	@GetMapping("{code}")
	private CategoryDTO getCategory(@PathVariable Integer code) {
		return new CategoryDTO(repository.findById(code).orElse(null));
	}
	@GetMapping("/top")
	private List<CategorySmallDTO> getTop() {
		return repository.getTop().stream().map(CategorySmallDTO::new).collect(Collectors.toList());
	}
	@GetMapping("/all")
	private List<CategorySmallDTO> getAll() {
		return repository.findAll().stream().map(CategorySmallDTO::new).collect(Collectors.toList());
	}
}
