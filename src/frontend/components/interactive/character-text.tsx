import type { ReactNode } from "react";

type CharacterTextProps = {
  children: string;
};

export function CharacterText({ children }: CharacterTextProps): ReactNode {
  return (
    <span className="character-reveal" aria-hidden="true">
      {children.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          {wordIndex > 0 && " "}
          <span className="character-reveal__word">
            {Array.from(word).map((character, characterIndex) => (
              <span className="character-reveal__character" key={characterIndex}>
                {character}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
