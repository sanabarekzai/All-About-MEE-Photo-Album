import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Photo = {
  src: string;
  title: string;
  description: string;
  alt: string;
};

type QuizQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

const photos: Photo[] = [
  {
    src: 'https://images.pexels.com/photos/30554306/pexels-photo-30554306.jpeg',
    title: 'Dubai',
    description: 'My favorite vocation place.',
    alt: 'Dubai',
  },
  {
    src: 'https://static.vecteezy.com/system/resources/thumbnails/041/448/144/small/ai-generated-beautiful-landscape-scenery-nature-professionalgraphy-photo.jpg',
    title: 'Dreamy place',
    description: 'A landscape picture that makes me feel calm.',
    alt: 'Dreamy place',
  },
  {
    src: 'https://images.pexels.com/photos/34304261/pexels-photo-34304261.jpeg',
    title: 'UCLA university',
    description: 'my favorite university that I am planning to attend.',
    alt: 'UCLA university',
  },
  {
    src: 'https://images.pexels.com/photos/27681035/pexels-photo-27681035.jpeg',
    title: 'Hiking',
    description: 'my dream hobbie is to go hiking.',
    alt: 'Hiking',
  },
  {
    src: 'https://images.pexels.com/photos/32705658/pexels-photo-32705658.jpeg',
    title: 'Mantu',
    description: 'My favorite food is Mantu.',
    alt: 'Mantu',
  },
  {
    src: 'https://images.pexels.com/photos/27857312/pexels-photo-27857312.jpeg',
    title: 'Basketball',
    description: 'my favorite sport is basketball.',
    alt: 'Basketball',
  },
  {
    src: 'https://images.pexels.com/photos/30943345/pexels-photo-30943345.jpeg',
    title: 'Pilot',
    description: 'Dream job: flying planes.',
    alt: 'Pilot',
  },
  {
    src: 'https://images.pexels.com/photos/36591054/pexels-photo-36591054.jpeg',
    title: 'Cadillac',
    description: 'My favorite car.',
    alt: 'Cadillac',
  },
  {
    src: 'https://images.pexels.com/photos/36594706/pexels-photo-36594706.jpeg',
    title: 'Cute cat',
    description: 'my dream cat I want to have.',
    alt: 'Cute cat',
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    prompt: 'What color makes Sana say, “this is so me”?',
    options: ['Pink', 'Sage green', 'Sunset orange', 'Electric blue'],
    correctIndex: 0,
  },
  {
    prompt: 'Which food would Sana happily order again and again?',
    options: ['Pizza', 'Mantu', 'Tacos', 'Sushi'],
    correctIndex: 1,
  },
  {
    prompt: 'Where is Sana’s dream escape?',
    options: ['Paris', 'Seoul', 'Dubai', 'New York'],
    correctIndex: 2,
  },
  {
    prompt: 'What does Sana famously forget?',
    options: ['Birthdays', 'Where she parked', 'Movie endings', 'Her sunglasses'],
    correctIndex: 0,
  },
  {
    prompt: 'Which sport already has a place in Sana’s album?',
    options: ['Tennis', 'Basketball', 'Volleyball', 'Badminton'],
    correctIndex: 1,
  },
  {
    prompt: 'What is Sana’s dream job?',
    options: ['Fashion designer', 'Chef', 'Pilot', 'Film director'],
    correctIndex: 2,
  },
  {
    prompt: 'Which car has Sana’s heart?',
    options: ['Vintage Beetle', 'Cadillac', 'Convertible Mini', 'White Jeep'],
    correctIndex: 1,
  },
  {
    prompt: 'Which university is part of Sana’s future plans?',
    options: ['UCLA', 'NYU', 'Stanford', 'USC'],
    correctIndex: 0,
  },
  {
    prompt: 'What is Sana’s dream hobby?',
    options: ['Pottery', 'Surfing', 'Hiking', 'Roller skating'],
    correctIndex: 2,
  },
  {
    prompt: 'What dream pet would Sana love to have?',
    options: ['A bunny', 'A cat', 'A tiny goat', 'A golden retriever'],
    correctIndex: 1,
  },
];

const starPositions = [
  [7, 5, 3, 15, 0.42],
  [16, 18, 2, 19, 0.3],
  [25, 4, 4, 22, 0.52],
  [34, 27, 2, 17, 0.34],
  [43, 11, 3, 24, 0.45],
  [52, 34, 2, 20, 0.28],
  [61, 8, 4, 18, 0.5],
  [70, 24, 2, 21, 0.36],
  [79, 2, 3, 23, 0.42],
  [88, 31, 2, 17, 0.3],
  [95, 13, 4, 25, 0.48],
  [12, 47, 2, 20, 0.35],
  [29, 62, 3, 18, 0.45],
  [47, 52, 2, 23, 0.29],
  [67, 66, 4, 21, 0.4],
  [84, 54, 2, 19, 0.32],
  [4, 78, 3, 24, 0.46],
  [21, 88, 2, 16, 0.31],
  [39, 76, 4, 22, 0.44],
  [58, 91, 2, 18, 0.3],
  [76, 82, 3, 20, 0.4],
  [92, 72, 2, 24, 0.28],
];

function PhotoImage({
  photo,
  eager = false,
  className = '',
}: {
  photo: Photo;
  eager?: boolean;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`image-state ${className}`} role="img" aria-label={`${photo.alt} image unavailable`}>
        Image unavailable
      </div>
    );
  }

  return (
    <>
      {isLoading ? <div className={`image-state ${className}`} aria-hidden="true">Loading image</div> : null}
      <img
        className={`${className}${isLoading ? ' image-loading' : ''}`}
        src={photo.src}
        alt={photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </>
  );
}

function PhotoModal({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && index > 0) onChange(index - 1);
      if (event.key === 'ArrowRight' && index < photos.length - 1) onChange(index + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [index, onChange, onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button
          type="button"
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close photo"
        >
          <X size={22} strokeWidth={2} />
        </button>

        <div className="modal-title">
          <span className="modal-count">{String(index + 1).padStart(2, '0')} / 09</span>
          <h2 id="modal-title">{photo.title}</h2>
        </div>

        <div className="modal-image-wrap">
          <PhotoImage photo={photo} eager className="modal-image" />
        </div>

        <div className="modal-description">
          <p>{photo.description}</p>
          <div className="modal-navigation" aria-label="Photo navigation">
            <button
              type="button"
              onClick={() => onChange(index - 1)}
              disabled={index === 0}
              aria-label="Previous photo"
            >
              <ChevronLeft size={21} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => onChange(index + 1)}
              disabled={index === photos.length - 1}
              aria-label="Next photo"
            >
              <span>Next</span>
              <ChevronRight size={21} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SanaQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const isComplete = questionIndex >= quizQuestions.length;
  const question = quizQuestions[questionIndex];
  const progress = isComplete ? 100 : ((questionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    if (answerIndex === question.correctIndex) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const handleNext = () => {
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  return (
    <section className="quiz-section" aria-labelledby="quiz-title">
      <div className="quiz-header">
        <span className="quiz-kicker">A tiny pop quiz</span>
        <h2 id="quiz-title">Do you know Sana?</h2>
        <p>Only the real ones get a perfect score. No pressure… probably.</p>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress-row">
          <span>{isComplete ? 'Quiz complete' : `Question ${questionIndex + 1} of ${quizQuestions.length}`}</span>
          <span className="quiz-score">Score: {score}</span>
        </div>
        <div className="quiz-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        {isComplete ? (
          <div className="quiz-result" aria-live="polite">
            <span className="quiz-result-badge">{score === quizQuestions.length ? 'Sana certified' : 'Quiz complete'}</span>
            <strong>
              {score} / {quizQuestions.length}
            </strong>
            <p>
              {score === quizQuestions.length
                ? 'Perfect score. Sana would definitely remember your birthday.'
                : score >= 4
                  ? 'You know Sana pretty well. Just a few more album visits and you’ll be unstoppable.'
                  : 'You may need a quick tour through the album before the next round.'}
            </p>
            <button type="button" className="quiz-restart" onClick={handleRestart}>
              Try again
            </button>
          </div>
        ) : (
          <div className="quiz-question">
            <h3>{question.prompt}</h3>
            <div className="quiz-options" role="group" aria-label="Answer choices">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = optionIndex === question.correctIndex;
                const answerState =
                  selectedAnswer === null
                    ? ''
                    : isCorrect
                      ? ' is-correct'
                      : isSelected
                        ? ' is-wrong'
                        : '';

                return (
                  <button
                    type="button"
                    className={`quiz-option${isSelected ? ' is-selected' : ''}${answerState}`}
                    key={option}
                    onClick={() => handleAnswer(optionIndex)}
                    disabled={selectedAnswer !== null}
                    aria-pressed={isSelected}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
            <div className="quiz-actions" aria-live="polite">
              {selectedAnswer !== null ? (
                <>
                  <span className="quiz-feedback">
                    {selectedAnswer === question.correctIndex ? 'That’s right!' : `The answer is ${question.options[question.correctIndex]}.`}
                  </span>
                  <button type="button" className="quiz-next" onClick={handleNext}>
                    {questionIndex === quizQuestions.length - 1 ? 'See my score' : 'Next question'}
                  </button>
                </>
              ) : (
                <span className="quiz-hint">Pick the answer that feels most Sana.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <main className="album-page">
      <div className="starfield" aria-hidden="true">
        {starPositions.map(([left, top, size, duration, opacity], index) => (
          <span
            className={`falling-star${size > 3 ? ' falling-star-large' : ''}`}
            key={`${left}-${top}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${index * -1.6}s`,
              animationDuration: `${Math.max(6, duration / 2)}s`,
              opacity,
            }}
          />
        ))}
        <span className="shooting-star shooting-star-one" />
        <span className="shooting-star shooting-star-two" />
        <span className="shooting-star shooting-star-three" />
        <span className="ambient-sparkle ambient-sparkle-one" />
        <span className="ambient-sparkle ambient-sparkle-two" />
        <span className="ambient-sparkle ambient-sparkle-three" />
        <span className="ambient-sparkle ambient-sparkle-four" />
        <span className="ambient-sparkle ambient-sparkle-five" />
        <span className="decorative-planet decorative-planet-one" />
        <span className="decorative-planet decorative-planet-two" />
        <span className="constellation-line constellation-line-one" />
        <span className="constellation-line constellation-line-two" />
        <span className="decorative-flower decorative-flower-one" />
        <span className="decorative-flower decorative-flower-two" />
        <span className="decorative-flower decorative-flower-three" />
        <div className="butterfly-swarm" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <span className="butterfly" key={index} />
          ))}
        </div>
      </div>
      <header className="site-header">
        <div className="site-heading">
          <span className="eyebrow">All about MEE</span>
          <h1>Sana Barekzai&apos;s Album</h1>
        </div>
        <p className="header-note">Click a photo to see more</p>
      </header>

      <section className="grid" aria-label="Photo album">
        {photos.map((photo, index) => (
          <button
            type="button"
            className="photo-card"
            key={photo.title}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open ${photo.title}`}
          >
            <div className="photo-image-wrap">
              <PhotoImage photo={photo} eager={index < 3} />
              <span className="photo-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <span className="photo-title">{photo.title}</span>
          </button>
        ))}
      </section>

      <SanaQuiz />

      <footer className="site-footer">
        <span>All about MEE</span>
        <span>09 photos</span>
      </footer>

      {selectedIndex !== null ? (
        <PhotoModal
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onChange={setSelectedIndex}
        />
      ) : null}
    </main>
  );
}

export default Home;