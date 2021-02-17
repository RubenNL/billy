package nl.rubend.billy.data;

import nl.rubend.billy.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringArticleRepository extends JpaRepository<Article, Integer> {}