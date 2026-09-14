import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, MoveDown, X } from 'lucide-react';
import { Route, Switch, Router as WouterRouter } from 'wouter';

type Memory = {
  id: number;
  category: string;
  title: string;
  description: string;
  alt: string;
  image: string;
};

const memories: Memory[] = [
  {
    id: 1,
    category: '01 / places',
    title: 'The long way home',
    description: 'Somewhere between where I am and where I am going, there is usually a better view. I keep taking the scenic route.',
    alt: 'A quiet road winding through golden hills under a wide sky',
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 2,
    category: '02 / quiet things',
    title: 'Morning, unhurried',
    description: 'Light through the window, a half-finished book, and nowhere else I need to be just yet.',
    alt: 'Sunlight filtering through tall green trees',
    image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 3,
    category: '03 / small rituals',
    title: 'A table for one',
    description: 'The best conversations sometimes happen with a notebook, a warm drink, and a little room to think.',
    alt: 'A small table with coffee and a notebook beside a window',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 4,
    category: '04 / in motion',
    title: 'Go where it glows',
    description: 'I like cities best at the edges of the day — when the signs come on and everybody is headed somewhere.',
    alt: 'A glowing city street at dusk with lights reflected on wet pavement',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 5,
    category: '05 / outside',
    title: 'Blue hour',
    description: 'A reminder that the day does not have to be productive to be worth remembering.',
    alt: 'Deep blue ocean meeting a quiet shoreline at twilight',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 6,
    category: '06 / collected',
    title: 'Things I notice',
    description: 'Textures, shadows, the color of old doors. I am always bringing small evidence of the world back with me.',
    alt: 'A collection of textured natural objects arranged on a table',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 7,
    category: '07 / daydreams',
    title: 'Somewhere new',
    description: 'There are still so many mornings I have not woken up to. That feels like a very good thing.',
    alt: 'A warm landscape with layered mountains fading into the distance',
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 8,
    category: '08 / people',
    title: 'Good company',
    description: 'The people who make an ordinary afternoon feel like a story worth retelling.',
    alt: 'Two friends walking together near the water',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 9,
    category: '09 / next',
    title: 'Keep looking',
    description: 'A soft place to land, and an open invitation to keep collecting the beautiful parts.',
    alt: 'A bright horizon over calm water with a soft pastel sky',
    image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

function ImageWithState({
  memory,
  eager = false,
  className = '',
}: {
  memory: Memory;
  eager?: boolean;
  className?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {loading && !failed ? <span className="image-fallback" aria-label="Loading image">Loading image</span> : null}
      {failed ? (
        <span className="image-fallback" role="img" aria-label={`Image unavailable: ${memory.alt}`}>
          Image unavailable
        </span>
      ) : (
        <img
          className={className}
          src={memory.image}
          alt={memory.alt}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setFailed(true);
          }}
        />
      )}
    </>
  );
}

function PhotoCard({ memory, onOpen }: { memory: Memory; onOpen: (memory: Memory) => void }) {
  return (
    <button
      type="button"
      className="photo-card"
      data-testid={`button-open-memory-${memory.id}`}
      onClick={() => onOpen(memory)}
      aria-label={`Open memory: ${memory.title}`}
    >
      <div className="photo-image-wrap">
        <span className="photo-index">{String(memory.id).padStart(2, '0')}</span>
        <ImageWithState memory={memory} />
      </div>
      <div className="photo-meta">
        <span>{memory.category}</span>
        <h3>{memory.title}</h3>
        <p>{memory.description}</p>
      </div>
    </button>
  );
}

function MemoryModal({
  memory,
  onClose,
  onChange,
}: {
  memory: Memory;
  onClose: () => void;
  onChange: (direction: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = memories.findIndex((item) => item.id === memory.id);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange(-1);
      if (event.key === 'ArrowRight') onChange(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChange, onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      data-testid="modal-memory-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="memory-modal-title">
        <button
          type="button"
          ref={closeRef}
          className="modal-close"
          data-testid="button-close-memory"
          onClick={onClose}
          aria-label="Close photo detail"
        >
          <X size={19} strokeWidth={1.5} />
        </button>
        <div className="modal-visual">
          <ImageWithState memory={memory} eager className="modal-image" />
        </div>
        <div className="modal-copy">
          <span className="modal-number">{memory.category}</span>
          <h2 id="memory-modal-title" className="display">{memory.title}</h2>
          <p>{memory.description}</p>
          <div className="modal-nav" aria-label="Photo navigation">
            <button
              type="button"
              data-testid="button-previous-memory"
              onClick={() => onChange(-1)}
              disabled={index === 0}
              aria-label="Previous photo"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              data-testid="button-next-memory"
              onClick={() => onChange(1)}
              disabled={index === memories.length - 1}
              aria-label="Next photo"
            >
              <ArrowRight size={17} />
            </button>
            <span className="sr-only">Use left and right arrow keys to navigate photos.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Home() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const moveMemory = (direction: number) => {
    if (!selectedMemory) return;
    const currentIndex = memories.findIndex((memory) => memory.id === selectedMemory.id);
    const nextMemory = memories[currentIndex + direction];
    if (nextMemory) setSelectedMemory(nextMemory);
  };

  return (
    <main className="mee-page">
      <header className="mee-shell topbar">
        <a className="wordmark" href="#top" data-testid="link-home">
          ALL ABOUT <em>MEE</em>
        </a>
        <nav className="topbar-nav" aria-label="Primary navigation">
          <a href="#memories" data-testid="link-memories">Memories</a>
          <a href="#about" data-testid="link-about">A little note</a>
          <span className="year-mark mono-label"><span className="year-dot" /> 2024—now</span>
        </nav>
      </header>

      <section className="mee-shell hero" id="top" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="hero-kicker mono-label">a visual diary, in progress</div>
          <h1 id="page-title" className="display">All about<span>me.</span></h1>
          <p className="hero-intro">
            A few places, tiny rituals, and big feelings I want to remember. Consider this an open notebook.
          </p>
          <div className="hero-number"><strong>09</strong> little windows into my world</div>
        </div>
        <div className="hero-art" aria-label="Featured memory">
          <div className="hero-image-frame">
            <ImageWithState memory={memories[0]} eager />
          </div>
          <div className="hero-caption">
            <small>currently thinking about</small>
            <p>the long way home</p>
          </div>
          <span className="scribble">stay curious</span>
        </div>
      </section>

      <section className="intro-band" id="about" aria-labelledby="intro-title">
        <div className="mee-shell band-grid">
          <div>
            <span className="mono-label">a little note</span>
            <p className="band-note">Not a complete picture. Just the parts that caught the light.</p>
          </div>
          <p id="intro-title" className="band-quote display">
            “I am collecting proof that an ordinary life can be <em>extraordinary</em> when you look closely.”
          </p>
        </div>
      </section>

      <section className="mee-shell gallery-section" id="memories" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <span className="mono-label">the good stuff / 01—09</span>
            <h2 id="gallery-title" className="display">Bits &amp; <em>pieces.</em></h2>
          </div>
          <p className="section-note">Tap any frame<br />to look closer</p>
        </div>
        <div className="gallery">
          {memories.map((memory) => (
            <PhotoCard key={memory.id} memory={memory} onOpen={setSelectedMemory} />
          ))}
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="mee-shell closing-grid">
          <h2 id="closing-title" className="display">More to<br /><em>come.</em></h2>
          <div className="closing-copy">
            <p>There is always another corner to turn, another thing to notice.</p>
            <small>Until then, keep looking around.</small>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="mee-shell footer-inner">
          <p>Made from memories, with care.</p>
          <a href="#top" data-testid="link-back-to-top" aria-label="Back to the top"><MoveDown size={15} style={{ transform: 'rotate(180deg)' }} /></a>
        </div>
      </footer>

      {selectedMemory ? (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onChange={moveMemory}
        />
      ) : null}
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;