package nl.rubend.javarolluptest.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Word {
    @Id private String value;
    private Integer length;

    public Word(String word) {
        this.value = word;
        this.length = word.length();
    }
}
