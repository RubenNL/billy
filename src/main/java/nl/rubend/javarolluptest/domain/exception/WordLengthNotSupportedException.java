package nl.rubend.javarolluptest.domain.exception;

public class WordLengthNotSupportedException extends RuntimeException {
    public WordLengthNotSupportedException(Integer length) {
        super("Could not find word of length " + length);
    }
}
