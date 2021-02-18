package nl.rubend.billy.presentation.DTO;

import lombok.Data;
import nl.rubend.billy.domain.Category;

@Data public class CategorySmallDTO {
	Integer id;
	String name;
	public CategorySmallDTO(Category category) {
		if(category==null) return;
		this.id=category.getId();
		this.name=category.getName();
	}
}

