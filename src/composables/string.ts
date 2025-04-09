import { ref } from 'vue';

interface TypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number;
}

export function useTypewriter(texts: string[], options: TypewriterOptions = {}) {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    startDelay = 500
  } = options;

  const typedText = ref("");
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let currentSpeed = typingSpeed;

  const type = () => {
    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      // Delete text
      typedText.value = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      currentSpeed = deletingSpeed;
    } else {
      // Type text
      typedText.value = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      currentSpeed = typingSpeed;
    }

    if (!isDeleting && currentCharIndex === currentText.length) {
      // Pause at end of text
      currentSpeed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next text
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      currentSpeed = startDelay;
    }

    setTimeout(type, currentSpeed);
  };

  // Start the typewriter effect
  setTimeout(type, startDelay);

  return {
    typedText
  };
}
