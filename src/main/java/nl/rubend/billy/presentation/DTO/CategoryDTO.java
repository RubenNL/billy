package nl.rubend.billy.presentation.DTO;

import lombok.Data;
import nl.rubend.billy.domain.Category;

import java.util.List;
import java.util.stream.Collectors;

@Data public class CategoryDTO {
	Integer id;
	String name;
	List<SmallArticleDTO> articles;
	CategorySmallDTO categoryAbove;
	List<CategorySmallDTO> categoriesBelow;
	public CategoryDTO(Category category) {
		this.id=category.getId();
		this.name=category.getName();
		this.articles=category.getArticles().stream().map(SmallArticleDTO::new).collect(Collectors.toList());
		this.categoriesBelow=category.getLayerBelow().stream().map(CategorySmallDTO::new).collect(Collectors.toList());
		Category layerAbove=category.getLayerAbove();
		if(layerAbove!=null) this.categoryAbove=new CategorySmallDTO(layerAbove);
	}
}
