import { useEffect, useState } from 'react'
import { ProductPrice } from '../commerce/ui'
import { useCommerce } from '../commerce/CommerceProvider'
import { Link } from 'react-router-dom'
import { useStore, type SalesPlacement } from '../store'
import { CATEGORIES, type Product } from '../data'
import { useT } from '../i18n'
import { getBrandName } from '../brands'
import LogoCarousel from '../components/LogoCarousel'

const NAVY = 'var(--nb-navy)'
const BLUE = 'var(--nb-primary)'
const BLUE_H = 'var(--nb-primary-deep)'
const GOLD = 'var(--nb-gold)'

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
)
const STATS = [
  { value: '12+', label: 'Years in Business' },
  { value: '500+', label: 'Products Supplied' },
  { value: '200+', label: 'Clients Served' },
  { value: '15+', label: 'Countries Sourced' },
]

const CAT_IMAGES: Record<string, string> = {
  'Electrical Equipment': '/site-images/c323e3f37dfd.jpg',
  'Industrial Machinery': '/site-images/e169c380d5ea.jpg',
  'Power & Energy': '/site-images/1444ffae0af2.jpg',
  'Tools & Equipment': '/site-images/f11d3f0cacb2.jpg',
  'Safety & Fire Protection': '/site-images/3595a0eb5f49.jpg',
  'Cables & Accessories': '/site-images/fe8658504d59.jpg',
}

const CAT_DESC: Record<string, string> = {
  'Electrical Equipment': 'Switchgear, transformers, circuit breakers, control panels',
  'Industrial Machinery': 'Pumps, compressors, conveyors, processing equipment',
  'Power & Energy': 'Generators, UPS, solar and energy storage solutions',
  'Tools & Equipment': 'Power tools, hand tools, measuring and testing gear',
  'Safety & Fire Protection': 'PPE, fire suppression, detection and emergency equipment',
  'Cables & Accessories': 'Power cables, control cables, conduits and management',
}

const INDUSTRIES = [
  { id: 1, name: 'Power Plants', desc: 'Hydroelectric, thermal, and solar generation facilities', icon: '⚡', stat: '15+ Projects' },
  { id: 2, name: 'Manufacturing', desc: 'Automotive, food processing, and heavy manufacturing plants', icon: '🏭', stat: '40+ Clients' },
  { id: 3, name: 'Construction', desc: 'Large-scale civil, infrastructure, and building projects', icon: '🏗', stat: '60+ Projects' },
  { id: 4, name: 'Industrial Facilities', desc: 'Refineries, chemical plants, and processing facilities', icon: '🔧', stat: '25+ Facilities' },
]

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-5 h-px" style={{ background: GOLD }} />
      <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: light ? '#7dbfff' : BLUE }}>
        {children}
      </span>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useT()
  return (
    <section className="relative flex items-center overflow-hidden min-h-[460px] lg:min-h-[560px]" style={{ background: 'var(--nb-navy)' }}>
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <img
          src="/site-images/73dcaba7ec9f.jpg"
          alt="High-voltage electrical substation"
          className="w-full h-full object-cover"
          style={{ opacity: 0.9 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,33,61,0.86) 0%, rgba(8,46,97,0.6) 38%, rgba(8,46,97,0.15) 70%, rgba(8,46,97,0) 100%)', pointerEvents: 'none' }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: GOLD, pointerEvents: 'none' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-14 lg:py-20" style={{ zIndex: 1 }}>
        <div className="max-w-[600px]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.25em] uppercase font-600" style={{ color: GOLD }}>
              Industrial Supply Solutions — Laos PDR
            </span>
          </div>
          <h1 className="uhero-title font-display font-800 text-white leading-[0.95] mb-4" style={{ fontSize: 'clamp(38px, 5vw, 68px)', letterSpacing: '-0.01em' }}>
            Power. Machinery.<br />
            <span style={{ color: '#5bc5ff' }}>Built to Perform.</span>
          </h1>
          <p className="uhero-description font-ui text-[14px] leading-[1.7] mb-7 max-w-[480px]" style={{ color: 'rgba(255,255,255,0.62)' }}>
            NB Lao Sole Co., Ltd. supplies certified industrial equipment, electrical systems, and safety solutions to power plants, factories, and construction projects across Southeast Asia.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/products" className="flex items-center gap-2 font-ui text-[13px] font-600 px-7 py-3 no-underline" style={{ background: BLUE, color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = BLUE_H)} onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
              {t.products.title} <ArrowRightIcon />
            </Link>
            <Link to="/rfq" className="font-ui text-[13px] font-500 px-7 py-3 no-underline" style={{ border: '1px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.85)' }}>
              {t.common.request_quote}
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-800 leading-none" style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', color: GOLD }}>{s.value}</div>
                <div className="font-ui text-[10px] mt-1 tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Advertisements() {
  const { activeAdvertisements, lang } = useStore()
  const t = useT()
  const [slideIndex, setSlideIndex] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const mainAdvertisements = activeAdvertisements.filter(advertisement => (advertisement.placement || 'main') === 'main')
  const sideAdvertisements = activeAdvertisements.filter(advertisement => advertisement.placement === 'side')
  const slides = mainAdvertisements.length > 1
    ? [mainAdvertisements[mainAdvertisements.length - 1], ...mainAdvertisements, mainAdvertisements[0]]
    : mainAdvertisements

  useEffect(() => {
    let frame = 0
    setSlideIndex(mainAdvertisements.length > 1 ? 1 : 0)
    setTransitionEnabled(false)
    // Place the cloned track at its initial real slide before enabling motion,
    // preventing a blank entry transition while the homepage first renders.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setTransitionEnabled(true))
    })
    if (mainAdvertisements.length < 2) return
    const timer = window.setInterval(() => {
      setTransitionEnabled(true)
      setSlideIndex(current => current >= mainAdvertisements.length ? mainAdvertisements.length + 1 : current + 1)
    }, 5500)
    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(timer)
    }
  }, [mainAdvertisements.length])

  const normalizeLoop = () => {
    if (mainAdvertisements.length < 2) return
    if (slideIndex === 0 || slideIndex === mainAdvertisements.length + 1) {
      setTransitionEnabled(false)
      setSlideIndex(slideIndex === 0 ? mainAdvertisements.length : 1)
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
    }
  }

  if (mainAdvertisements.length === 0 && sideAdvertisements.length === 0) return null

  const showPrevious = () => {
    setTransitionEnabled(true)
    setSlideIndex(current => current <= 1 ? 0 : current - 1)
  }
  const showNext = () => {
    setTransitionEnabled(true)
    setSlideIndex(current => current >= mainAdvertisements.length ? mainAdvertisements.length + 1 : current + 1)
  }
  const showSlide = (index: number) => {
    setTransitionEnabled(true)
    setSlideIndex(index + 1)
  }

  const sideContent = (sideAdvertisement: typeof sideAdvertisements[number]) => {
    const sideTitle = lang === 'lo' && sideAdvertisement.titleLo ? sideAdvertisement.titleLo : sideAdvertisement.titleEn
    const sideCta = lang === 'lo' && sideAdvertisement.ctaLo ? sideAdvertisement.ctaLo : sideAdvertisement.ctaEn
    return (
    <div className="relative h-full min-h-40 overflow-hidden">
      <img src={sideAdvertisement.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(8,46,97,0.96), rgba(8,46,97,0.28))' }} />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <div className="font-ui text-[9px] tracking-[0.2em] uppercase font-700 mb-1.5" style={{ color: GOLD }}>FEATURED CAMPAIGN</div>
        <h2 className="font-display font-800 text-white text-[18px] leading-tight line-clamp-2">{sideTitle}</h2>
        {sideCta && <span className="inline-flex items-center gap-1.5 font-ui text-[10px] font-700 mt-2 text-white">{sideCta} <ArrowRightIcon /></span>}
      </div>
    </div>
    )
  }

  const renderSideAdvertisement = (advertisement: typeof sideAdvertisements[number]) =>
    advertisement.destinationUrl.startsWith('/')
      ? <Link key={advertisement.id} to={advertisement.destinationUrl} className="hidden lg:block no-underline">{sideContent(advertisement)}</Link>
      : <a key={advertisement.id} href={advertisement.destinationUrl} target="_blank" rel="noreferrer" className="hidden lg:block no-underline">{sideContent(advertisement)}</a>

  return (
    <section className="py-3 sm:py-4" style={{ background: 'var(--nb-light-blue)' }} aria-label={t.home.promotions}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`grid gap-3 ${sideAdvertisements.length > 1 ? 'lg:grid-cols-[minmax(200px,1fr)_minmax(0,3fr)_minmax(200px,1fr)]' : sideAdvertisements.length ? 'lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)]' : ''}`}>
        {sideAdvertisements.length > 1 && renderSideAdvertisement(sideAdvertisements[0])}
        {mainAdvertisements.length > 0 && <div className="advertisement-slider relative">
          <div
            className="advertisement-track"
            onTransitionEnd={event => {
              if (event.target === event.currentTarget) normalizeLoop()
            }}
            style={{
              transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
              transition: transitionEnabled ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          >
        {slides.map((advertisement, index) => {
          const title = lang === 'lo' && advertisement.titleLo ? advertisement.titleLo : advertisement.titleEn
          const description = lang === 'lo' && advertisement.descriptionLo ? advertisement.descriptionLo : advertisement.descriptionEn
          const cta = lang === 'lo' && advertisement.ctaLo ? advertisement.ctaLo : advertisement.ctaEn
          const content = (
            <div className="relative flex items-end sm:items-center min-h-[300px] sm:min-h-[340px] lg:min-h-[400px] xl:min-h-[440px]">
              <img src={advertisement.image} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0 sm:hidden" style={{ background: 'linear-gradient(0deg, rgba(8,46,97,0.86) 0%, rgba(8,46,97,0.5) 38%, rgba(8,46,97,0) 68%)' }} />
              <div className="absolute inset-0 hidden sm:block" style={{ background: 'linear-gradient(90deg, rgba(8,46,97,0.82) 0%, rgba(8,46,97,0.5) 34%, rgba(8,46,97,0) 62%)' }} />
              <div className="relative z-10 max-w-2xl w-full px-5 py-6 sm:px-10 sm:py-10 lg:px-12" style={{ textShadow: '0 1px 8px rgba(5,25,50,0.45)' }}>
                <div className="font-ui text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-700 mb-2" style={{ color: GOLD }}>NB LAO INDUSTRIAL CAMPAIGN</div>
                <h2 className="font-display font-800 text-white text-[24px] sm:text-[32px] lg:text-[38px] leading-tight">{title}</h2>
                <p className="font-ui text-[12px] sm:text-[14px] leading-relaxed mt-2 mb-4 max-w-xl text-white/90 line-clamp-2">{description}</p>
                {cta && <span className="inline-flex items-center gap-2 font-ui text-[12px] font-700 px-5 py-2.5 text-white" style={{ background: BLUE, textShadow: 'none' }}>{cta} <ArrowRightIcon /></span>}
              </div>
            </div>
          )
          return advertisement.destinationUrl.startsWith('/')
            ? <Link key={`${advertisement.id}-${index}`} to={advertisement.destinationUrl} className="advertisement-slide no-underline">{content}</Link>
            : <a key={`${advertisement.id}-${index}`} href={advertisement.destinationUrl} target="_blank" rel="noreferrer" className="advertisement-slide no-underline">{content}</a>
        })}
          </div>
          {mainAdvertisements.length > 1 && (
            <>
              <button type="button" onClick={showPrevious} aria-label={t.products.previous}
                className="advertisement-slider__control absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white">
                <ChevronIcon direction="left" />
              </button>
              <button type="button" onClick={showNext} aria-label={t.products.next}
                className="advertisement-slider__control absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white">
                <ChevronIcon direction="right" />
              </button>
              <div className="absolute right-4 bottom-3 z-20 flex gap-1.5">
                {mainAdvertisements.map((advertisement, index) => (
                  <button
                    key={advertisement.id}
                    type="button"
                    onClick={() => showSlide(index)}
                    className="h-1.5 transition-all"
                    style={{
                      width: index === (slideIndex - 1 + mainAdvertisements.length) % mainAdvertisements.length ? 24 : 8,
                      background: index === (slideIndex - 1 + mainAdvertisements.length) % mainAdvertisements.length ? GOLD : 'rgba(255,255,255,0.55)',
                    }}
                    aria-label={`Show promotion ${index + 1}`}
                    aria-current={index === (slideIndex - 1 + mainAdvertisements.length) % mainAdvertisements.length}
                  />
                ))}
              </div>
            </>
          )}
        </div>}
        {sideAdvertisements.length === 1 && renderSideAdvertisement(sideAdvertisements[0])}
        {sideAdvertisements.length > 1 && sideAdvertisements.slice(1).map(renderSideAdvertisement)}
        </div>
      </div>
    </section>
  )
}

function isActiveSalesPlacement(placement: SalesPlacement, product: Product) {
  const today = new Date().toISOString().slice(0, 10)
  return placement.active &&
    (!placement.startDate || placement.startDate <= today) &&
    (!placement.endDate || placement.endDate >= today) &&
    (placement.type === 'recommended' ||
      (placement.promotionalPrice !== undefined &&
        placement.promotionalPrice > 0 &&
        placement.promotionalPrice < product.price))
}

// ─── Sales & Promotions ───────────────────────────────────────────────────────
function SalesPromotions() {
  const [hovered, setHovered] = useState<number | null>(null)
  const { addToCart, addToRFQ, getBrandById, lang, products, salesPlacements, toggleWishlist, wishlist } = useStore()
  const { priceFor } = useCommerce()
  const selections = salesPlacements
    .map(placement => ({ placement, product: products.find(product => product.id === placement.productId) }))
    .filter((item): item is { placement: SalesPlacement; product: Product } =>
      item.product !== undefined && isActiveSalesPlacement(item.placement, item.product))
    .sort((a, b) => a.placement.displayOrder - b.placement.displayOrder)
    .slice(0, 8)

  if (!selections.length) return null

  return (
    <section className="py-8 lg:py-11" style={{ background: 'var(--nb-light-blue)' }} aria-labelledby="sales-promotions-heading">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between gap-4 mb-5 lg:mb-6">
          <div className="max-w-xl">
            <SectionLabel>NB LAO Selection</SectionLabel>
            <h2 id="sales-promotions-heading" className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', color: NAVY }}>Sales &amp; Promotions</h2>
            <p className="font-ui text-[12px] sm:text-[13px] leading-relaxed mt-2" style={{ color: 'var(--nb-text-secondary)' }}>Company-selected industrial products, current offers, and priority equipment for your next project.</p>
          </div>
          <div className="hidden sm:block shrink-0">
            <Link to="/sales" className="flex items-center gap-1.5 font-ui text-[12px] font-600 no-underline" style={{ color: BLUE }}>View All <ArrowRightIcon /></Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5" aria-label="Sales and promotions">
          {selections.map(({ placement, product }) => {
            const isHov = hovered === product.id
            const inWish = wishlist.includes(product.id)
            const promotionalPrice = placement.type === 'promotion' ? placement.promotionalPrice : undefined
            const discount = promotionalPrice ? Math.round((1 - promotionalPrice / product.price) * 100) : null
            const brand = getBrandName(getBrandById(product.brandId), lang)
            return (
              <article key={placement.id} className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--nb-border)' }} onMouseEnter={() => setHovered(product.id)} onMouseLeave={() => setHovered(null)}>
                <div className="relative overflow-hidden bg-slate-100 h-[132px] sm:h-36 lg:h-40">
                  <Link to={`/products/${product.id}`} className="block w-full h-full"><img src={product.img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt={product.name} className="w-full h-full object-contain transition-transform duration-500" style={{ transform: isHov ? 'scale(1.05)' : 'scale(1)' }} /></Link>
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 font-ui text-[8px] font-700 tracking-[0.12em] text-white" style={{ background: placement.type === 'promotion' ? GOLD : BLUE }}>{placement.type === 'promotion' ? 'SALE' : 'SELECTED'}</span>
                  <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={inWish ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 hover:bg-white" style={{ color: inWish ? '#ef4444' : '#94a3b8' }}><HeartIcon filled={inWish} /></button>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300" style={{ background: GOLD, opacity: isHov ? 1 : 0 }} />
                </div>
                <div className="flex flex-col flex-1 p-3">
                  <span className="font-ui text-[9px] font-700 tracking-[0.14em] uppercase truncate mb-1" style={{ color: BLUE }}>{brand}</span>
                  <Link to={`/products/${product.id}`} className="no-underline"><h3 className="font-display font-700 text-[13px] leading-snug min-h-9 line-clamp-2" style={{ color: NAVY }}>{product.name}</h3></Link>
                  <p className="font-ui text-[10px] truncate mt-1" style={{ color: 'var(--nb-text-secondary)' }}>{product.model} · {product.category}</p>
                  <div className="flex items-center justify-between gap-2 mt-auto pt-3">
                    <div className="flex items-baseline gap-1 min-w-0"><ProductPrice product={product} size="sm" />{discount && <><span className="font-ui text-[9px] font-700 whitespace-nowrap" style={{ color: GOLD }}>−{discount}%</span></>}</div>
                    <span className="font-ui text-[9px] px-1.5 py-0.5 whitespace-nowrap" style={{ background: product.stock > 5 ? '#ecfdf5' : '#fef9ec', color: product.stock > 5 ? '#16a34a' : '#d97706' }}>{product.stockLabel}</span>
                  </div>
                  <div className="product-card-actions flex gap-1.5 h-8 mt-2">
                    <button type="button" disabled={product.stock <= 0 || !priceFor(product).ok} onClick={() => addToCart({ id: product.id, name: product.name, sku: product.sku, price: promotionalPrice ?? product.price, img: product.img, category: product.category, brand, stock: product.stock, priceUnit: product.priceUnit })} className="flex-1 min-w-0 font-ui text-[10px] font-600 px-1 text-white whitespace-nowrap disabled:opacity-50" style={{ background: isHov ? BLUE_H : BLUE }}>Add to Cart</button>
                    <button type="button" onClick={() => addToRFQ({ id: product.id, name: product.name, sku: product.sku, img: product.img, category: product.category })} className="shrink-0 font-ui text-[10px] font-600 px-2" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>RFQ</button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <Link to="/sales" className="sm:hidden inline-flex items-center gap-1.5 mt-4 font-ui text-[12px] font-600 no-underline" style={{ color: BLUE }}>View All <ArrowRightIcon /></Link>
      </div>
    </section>
  )
}

// ─── Product Categories ────────────────────────────────────────────────────────
function ProductCategories() {
  const t = useT()
  const { products } = useStore()
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <section className="py-8 lg:py-14" style={{ background: 'var(--nb-bg)' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid var(--nb-border)' }}>
          <div>
            <SectionLabel>Product Range</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: NAVY }}>Browse by Category</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-ui text-[12px] font-500 no-underline" style={{ color: BLUE }}>
            {t.common.view_all} <ArrowRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => {
            const isHov = hovered === cat
            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="no-underline flex flex-col overflow-hidden"
                style={{ border: '1px solid var(--nb-border)' }}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative overflow-hidden bg-slate-200" style={{ height: 90 }}>
                  <img src={CAT_IMAGES[cat]} alt={cat} className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isHov ? 'scale(1.06)' : 'scale(1)', opacity: isHov ? 0.85 : 0.72 }} />
                  <div className="absolute inset-0 transition-colors duration-300" style={{ background: isHov ? 'rgba(8,46,97,0.18)' : 'rgba(8,46,97,0.42)' }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ background: GOLD, opacity: isHov ? 1 : 0 }} />
                </div>
                <div className="p-2.5 lg:p-3 transition-colors duration-200" style={{ background: isHov ? 'var(--nb-surface)' : '#fff' }}>
                  <h3 className="font-display font-700 text-[11px] lg:text-[12px] leading-snug mb-0.5" style={{ color: NAVY }}>{cat}</h3>
                  <p className="font-ui text-[10px] leading-snug line-clamp-2 hidden lg:block" style={{ color: '#7a8ea6' }}>{CAT_DESC[cat]}</p>
                  <span className="font-ui text-[9px] font-600 tracking-wide" style={{ color: BLUE }}>
                    {products.filter(p => p.category === cat).length}+ SKUs
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Products ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const t = useT()
  const [hovered, setHovered] = useState<number | null>(null)
  const { addToCart, toggleWishlist, wishlist, addToRFQ, getBrandById, lang, products } = useStore()
  const { priceFor } = useCommerce()
  const featured = products.filter(p => p.featured).slice(0, 8)

  return (
    <section className="py-8 lg:py-14" style={{ background: '#fff' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-5 lg:mb-8">
          <div>
            <SectionLabel>Product Catalogue</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: NAVY }}>Featured Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-ui text-[12px] font-500 no-underline" style={{ color: BLUE }}>
            {t.header.view_all} <ArrowRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {featured.map((p) => {
            const isHov = hovered === p.id
            const inWish = wishlist.includes(p.id)
            return (
              <div key={p.id} className="flex flex-col" style={{ background: isHov ? 'var(--nb-surface)' : '#fff', border: '1px solid var(--nb-border)' }}
                onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div className="relative overflow-hidden bg-slate-100" style={{ height: 140 }}>
                  <Link to={`/products/${p.id}`}>
                    <img src={p.img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt={p.name} className="w-full h-full object-contain transition-transform duration-500"
                      style={{ transform: isHov ? 'scale(1.05)' : 'scale(1)' }} />
                  </Link>
                  <button onClick={() => toggleWishlist(p.id)}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 hover:bg-white"
                    style={{ color: inWish ? '#ef4444' : '#94a3b8' }}>
                    <HeartIcon filled={inWish} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ background: GOLD, opacity: isHov ? 1 : 0 }} />
                </div>
                  <div className="p-3 flex flex-col flex-1">
                  <span className="font-ui text-[9px] font-700 tracking-[0.14em] uppercase mb-1" style={{ color: BLUE }}>{p.category}</span>
                  <Link to={`/products/${p.id}`} className="no-underline">
                    <h3 className="font-display font-700 text-[13px] leading-snug mb-1 hover:text-[var(--nb-primary)] transition-colors line-clamp-2" style={{ color: NAVY }}>{p.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between mb-2 mt-auto pt-1">
                    <ProductPrice product={p} size="sm" />
                    <span className="font-ui text-[10px] px-1.5 py-0.5" style={{ background: p.stock > 5 ? '#ecfdf5' : '#fef9ec', color: p.stock > 5 ? '#16a34a' : '#d97706' }}>
                      {p.stockLabel}
                    </span>
                  </div>
                  <div className="product-card-actions flex gap-1.5 h-8">
                    <button disabled={!priceFor(p).ok} onClick={() => addToCart({ id: p.id, name: p.name, sku: p.sku, price: p.price, img: p.img, category: p.category, brand: getBrandName(getBrandById(p.brandId), lang), stock: p.stock })}
                      className="flex-1 min-w-0 font-ui text-[10px] font-600 px-2 text-white whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: isHov ? BLUE_H : BLUE }}>
                      {t.common.add_to_cart}
                    </button>
                    <button onClick={() => addToRFQ({ id: p.id, name: p.name, sku: p.sku, img: p.img, category: p.category })}
                      className="shrink-0 font-ui text-[10px] font-600 px-2.5"
                      style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
                      {t.products.rfq_short}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Industries ────────────────────────────────────────────────────────────────
function IndustriesSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="py-8 lg:py-14" style={{ background: NAVY }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <SectionLabel light>Sectors Served</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05] mb-3" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: '#fff' }}>Industries We Serve</h2>
            <p className="font-ui text-[13px] leading-[1.7] mb-6" style={{ color: 'rgba(255,255,255,0.48)' }}>
              From hydroelectric power infrastructure to precision manufacturing lines, we source and deliver the right technical equipment for demanding industrial environments.
            </p>
            <div className="flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {INDUSTRIES.map((ind, i) => (
                <button key={ind.id} onClick={() => setActive(i)}
                  className="text-left flex items-center justify-between px-4 py-3.5 transition-all duration-150"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', borderLeft: `2px solid ${active === i ? GOLD : 'transparent'}`, background: active === i ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] opacity-80">{ind.icon}</span>
                    <div>
                      <div className="font-display font-700 text-[14px]" style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.6)' }}>{ind.name}</div>
                      {active === i && <div className="font-ui text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{ind.desc}</div>}
                    </div>
                  </div>
                  <span className="font-ui text-[11px] font-600 shrink-0 ml-4" style={{ color: active === i ? GOLD : 'rgba(255,255,255,0.3)' }}>{ind.stat}</span>
                </button>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/industries" className="font-ui text-[12px] no-underline flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                View all industries <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden" style={{ height: 380, background: 'var(--nb-navy)' }}>
              <img src="/site-images/3ea03ff0d86f.jpg"
                alt="Industrial facility" className="w-full h-full object-cover" style={{ opacity: 0.55 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,46,97,0.92) 0%, rgba(8,46,97,0.2) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-px" style={{ background: GOLD }} />
                  <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Currently Viewing</span>
                </div>
                <div className="font-display font-800 text-white text-[26px] leading-none mb-1">{INDUSTRIES[active].name}</div>
                <div className="font-ui text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{INDUSTRIES[active].desc}</div>
              </div>
              <div className="absolute top-0 right-0 w-10 h-10" style={{ borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Brands ────────────────────────────────────────────────────────────────────
function BrandsSection() {
  const { activeBrands, lang } = useStore()
  const t = useT()
  const items = activeBrands.map(brand => ({
    id: brand.id,
    name: getBrandName(brand, lang),
    logo: brand.logo,
    url: brand.websiteUrl,
  }))

  return (
    <section className="py-6 lg:py-14" style={{ background: 'var(--nb-bg)', borderTop: '1px solid var(--nb-border)', borderBottom: '1px solid var(--nb-border)' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between gap-5 mb-4 lg:mb-8">
          <div>
            <SectionLabel>Our Partners</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: NAVY }}>
              Authorised Brand Partners
            </h2>
          </div>
          <Link to="/partners#brand-partners" className="flex items-center gap-1.5 font-ui text-[11px] no-underline" style={{ color: BLUE }}>
            {t.common.view_all} <ArrowRightIcon />
          </Link>
        </div>
        <LogoCarousel ariaLabel="Authorised brand partners" items={items} />
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  const t = useT()
  return (
    <section className="relative overflow-hidden py-10 lg:py-16" style={{ background: 'var(--nb-navy)' }}>
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <img src="/site-images/5ebe4e342d35.jpg"
          alt="Industrial factory" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(7,33,61,0.55)', pointerEvents: 'none' }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: GOLD, pointerEvents: 'none' }} />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 text-center" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
          <span className="font-ui text-[10px] tracking-[0.24em] uppercase font-600" style={{ color: GOLD }}>Get in Touch</span>
          <div className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
        </div>
        <h2 className="font-display font-800 text-white mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
          Need Industrial Equipment?
        </h2>
        <p className="font-ui text-[13.5px] leading-[1.7] max-w-md mx-auto mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Tell us what you need. Our technical team will provide specifications, availability, and competitive pricing within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/rfq" className="flex items-center gap-2 font-ui text-[13px] font-600 px-8 py-3 no-underline" style={{ background: BLUE, color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.background = BLUE_H)} onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
            {t.common.request_quote} <ArrowRightIcon />
          </Link>
          <Link to="/contact" className="font-ui text-[13px] font-500 px-8 py-3 no-underline" style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)' }}>
            {t.common.contact_us}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Advertisements />
      <Hero />
      <ProductCategories />
      <SalesPromotions />
      <FeaturedProducts />
      <IndustriesSection />
      <BrandsSection />
      <CTASection />
    </>
  )
}
