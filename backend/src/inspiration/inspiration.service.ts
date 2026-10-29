import { Injectable, Logger, NotFoundException } from '@nestjs/common';

export type InspirationPin = {
  id: string;
  title: string;
  image: string;
  aspect: number; // width / height
  styles: string[];
  occasion: string;
  palette: string[];
  pieces: string[];
  vibe: string;
};

const img = (id: string, w = 800, q = 85) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

const PINS: InspirationPin[] = [
  {
    id: 'p1', title: 'Minimal Monochrome', image: img('1516257984-b1b4d70a4128'), aspect: 0.75,
    styles: ['minimal', 'formal'], occasion: 'work', palette: ['charcoal', 'white'], pieces: ['shirt', 'trousers', 'loafers'], vibe: 'Sharp tailoring with a calm palette.',
  },
  {
    id: 'p2', title: 'Street Layers', image: img('1523398002811-999ca8dec238'), aspect: 0.8,
    styles: ['streetwear'], occasion: 'weekend', palette: ['stone', 'navy'], pieces: ['oversized tee', 'jacket', 'sneakers'], vibe: 'Easy layers for the city.',
  },
  {
    id: 'p3', title: 'Quiet Luxury Suit', image: img('1507003211169-0a1dd7228f2d'), aspect: 0.75,
    styles: ['formal'], occasion: 'event', palette: ['beige', 'cream'], pieces: ['suit', 'shirt', 'derbies'], vibe: 'Understated, expensive-looking.',
  },
  {
    id: 'p4', title: 'Soft Neutrals', image: img('1617137968427-85924c800a22'), aspect: 0.8,
    styles: ['minimal'], occasion: 'weekend', palette: ['sand', 'ivory'], pieces: ['knit', 'chinos', 'sneakers'], vibe: 'Warm neutrals, zero effort.',
  },
  {
    id: 'p5', title: 'Denim Casual', image: img('1520975954732-35dd22299614'), aspect: 0.8,
    styles: ['casual', 'streetwear'], occasion: 'college', palette: ['blue', 'white'], pieces: ['denim jacket', 'tee', 'jeans'], vibe: 'Classic denim done right.',
  },
  {
    id: 'p6', title: 'Athleisure Relax', image: img('1608234808654-2a887546a28a'), aspect: 0.8,
    styles: ['athleisure'], occasion: 'gym', palette: ['grey', 'black'], pieces: ['hoodie', 'joggers', 'trainers'], vibe: 'Gym-to-street comfort.',
  },
  {
    id: 'p7', title: 'Song Position', image: img('1591047139829-d91aecb6caea'), aspect: 0.75,
    styles: ['minimal'], occasion: 'date', palette: ['ivory', 'taupe'], pieces: ['shirt', 'slacks', 'loafers'], vibe: 'Golden-hour kind of clean.',
  },
  {
    id: 'p8', title: 'Event Sharp', image: img('1594938298603-c8148c4dae35'), aspect: 0.75,
    styles: ['formal'], occasion: 'event', palette: ['navy', 'white'], pieces: ['blazer', 'dress shirt', 'oxfords'], vibe: 'Dress shoes up, no questions.',
  },
  {
    id: 'p9', title: 'Spring Pastels', image: img('1610652492500-ded49ecb15ec'), aspect: 0.8,
    styles: ['casual', 'minimal'], occasion: 'weekend', palette: ['mint', 'off-white'], pieces: ['polo', 'linen pants'], vibe: 'Airy, sun-washed tones.',
  },
  {
    id: 'p10', title: 'Track Day Fit', image: img('1485231183945-fffde7cc051e'), aspect: 0.8,
    styles: ['athleisure', 'streetwear'], occasion: 'gym', palette: ['grey', 'olive'], pieces: ['track top', 'shorts', 'runners'], vibe: 'Sport-first, style-adjacent.',
  },
  {
    id: 'p11', title: 'Editorial Stripes', image: img('1487222477894-8943e31ef7b2'), aspect: 0.7,
    styles: ['minimal', 'formal'], occasion: 'work', palette: ['white', 'black'], pieces: ['striped shirt', 'wide trousers'], vibe: 'Magazine-level basics.',
  },
  {
    id: 'p12', title: 'Evening Trench', image: img('1483985988355-763728e1935b'), aspect: 0.7,
    styles: ['casual', 'streetwear'], occasion: 'date', palette: ['camel', 'black'], pieces: ['trench', 'tee', 'boots'], vibe: 'Night-out layering.',
  },
];

const STYLES = ['For You', 'Minimal', 'Streetwear', 'Formal', 'Casual', 'Athleisure'];

const STYLE_QUERIES: Record<string, string> = {
  'for you': 'fashion outfit aesthetic',
  minimal: 'minimal outfit aesthetic',
  streetwear: 'streetwear outfit aesthetic',
  formal: 'formal outfit aesthetic',
  casual: 'casual outfit aesthetic',
  athleisure: 'athleisure outfit aesthetic',
};

type PinterestImage = { url?: string; width?: number; height?: number };

@Injectable()
export class InspirationService {
  private readonly logger = new Logger(InspirationService.name);
  readonly styles = STYLES;

  async list(filters: { style?: string; occasion?: string; search?: string; page?: string; bookmarks?: string; gender?: string }) {
    const style = filters.style?.toLowerCase() ?? 'for you';
    const search = filters.search?.toLowerCase().trim();
    const page = Math.max(1, parseInt(filters.page ?? '1', 10) || 1);
    const bookmarks = filters.bookmarks || undefined;
    const gender = filters.gender?.toLowerCase();
    const genderTerm = gender === 'male' ? 'men' : gender === 'female' ? 'women' : '';
    const baseQuery = search ?? STYLE_QUERIES[style] ?? STYLE_QUERIES['for you'];
    const query = genderTerm ? `${genderTerm} ${baseQuery}` : baseQuery;

    const live = await this.pinterestSearch(query, page, bookmarks);
    if (live.pins.length > 0) {
      const hasMore = Boolean(live.nextBookmark) && live.nextBookmark !== '-end-';
      return {
        source: 'pinterest' as const,
        pins: live.pins,
        page,
        hasMore,
        nextBookmark: hasMore ? live.nextBookmark : null,
      };
    }

    // Fallback to curated catalog
    const occasion = filters.occasion?.toLowerCase();
    const filtered = PINS.filter((pin) => {
      if (occasion && pin.occasion !== occasion) return false;
      if (style !== 'for you' && !pin.styles.includes(style)) return false;
      if (search && !`${pin.title} ${pin.vibe}`.toLowerCase().includes(search)) return false;
      return true;
    });
    const start = (page - 1) * 10;
    const pins = filtered.slice(start, start + 10);
    return {
      source: 'curated' as const,
      pins,
      page,
      hasMore: start + 10 < filtered.length,
      nextBookmark: null,
      total: filtered.length,
    };
  }

  /** Build a Pinterest session (csrf + cookies) by loading the search page HTML. */
  private async pinterestSession(query: string): Promise<{ cookieHeader: string; csrf: string; appVersion: string } | null> {
    try {
      const first = await fetch(
        `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          },
          signal: AbortSignal.timeout(5_000),
        },
      );
      if (!first.ok) return null;
      const cookies = (first.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]);
      const csrf = cookies.find((c) => c.startsWith('csrftoken='))?.split('=')[1] ?? '';
      const appVersion = (await first.text()).match(/"appVersion":"([^"]*)"/)?.[1] ?? '';
      return { cookieHeader: cookies.join('; '), csrf, appVersion };
    } catch {
      return null;
    }
  }

  /** Unofficial Pinterest search. Best-effort: returns [] on any failure. */
  private async pinterestSearch(
    query: string,
    page: number,
    bookmarks?: string,
  ): Promise<{ pins: InspirationPin[]; nextBookmark: string | null }> {
    try {
      const session = await this.pinterestSession(query);
      if (!session) return { pins: [], nextBookmark: null };

      const options: Record<string, unknown> = { query, page, page_size: 25 };
      if (bookmarks) options.bookmarks = [bookmarks];
      const data = encodeURIComponent(JSON.stringify({ options, context: {} }));
      const res = await fetch(
        `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=${data}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
            Accept: 'application/json, text/javascript, */*, q=0.01',
            Referer: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`,
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': session.csrf,
            'X-Pinterest-AppState': 'active',
            'X-Pinterest-PWS-Handler': 'www/search/pins.js',
            'X-Pinterest-Source-Url': `/search/pins/?q=${encodeURIComponent(query)}`,
            'X-App-Version': session.appVersion,
            Cookie: session.cookieHeader,
          },
          signal: AbortSignal.timeout(5_000),
        },
      );
      if (!res.ok) {
        this.logger.warn(`Pinterest search failed ${res.status}`);
        return { pins: [], nextBookmark: null };
      }
      const json = (await res.json()) as {
        resource_response?: {
          data?: {
            results?: Array<{
              id?: string;
              grid_title?: string;
              description?: string;
              images?: Record<string, PinterestImage>;
            }>;
          };
        };
        resource?: { options?: { bookmarks?: string[] } };
      };
      const results = json.resource_response?.data?.results ?? [];
      const nextBookmark = json.resource?.options?.bookmarks?.[0] ?? null;
      const pins: InspirationPin[] = [];
      for (const r of results) {
        const images = r.images ?? {};
        const best =
          images.orig ??
          images['736x'] ??
          images['564x'] ??
          images['474x'] ??
          images['236x'];
        const image = best?.url;
        if (!image || !r.id) continue;
        const aspect =
          best?.width && best?.height ? best.width / best.height : 0.75;
        const title = (r.grid_title || r.description?.split(/[.,]/)[0] || 'Untitled')
          .slice(0, 60);
        pins.push({
          id: `pin_${r.id}`,
          title,
          image,
          aspect: Math.min(Math.max(aspect, 0.6), 1.2),
          styles: [],
          occasion: '',
          palette: [],
          pieces: [],
          vibe: (r.description ?? '').slice(0, 160),
        });
      }
      return { pins, nextBookmark };
    } catch (err) {
      this.logger.warn(`Pinterest search error: ${(err as Error).message}`);
      return { pins: [], nextBookmark: null };
    }
  }

  get(id: string) {
    const pin = PINS.find((p) => p.id === id);
    if (!pin) throw new NotFoundException(`Pin ${id} not found`);
    return pin;
  }
}
