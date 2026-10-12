import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useT } from '../i18n'
import { getBrandName } from '../brands'
import { ProductPrice } from '../commerce/ui'
import { useCommerce } from '../commerce/CommerceProvider'
import { useCT } from '../commerce/text'

const NAVY = 'var(--nb-navy)'
const BLUE = 'var(--nb-primary)'
const BLUE_H = 'var(--nb-primary-deep)'
const GOLD = 'var(--nb-gold)'

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6z" />
  </svg>
)
const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-ui text-[12px] flex-wrap" style={{ color: '#8f9faf' }}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.to ? <Link to={item.to} className="hover:text-[var(--nb-primary)] transition-colors no-underline">{item.label}</Link>
            : <span style={{ color: NAVY }}>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, wishlist, addToRFQ, getBrandById, lang, products, customerService } = useStore()
  const t = useT()
  const ct = useCT()
  const { priceFor } = useCommerce()
  const TABS = [t.product.overview, t.product.specifications, t.product.applications, t.product.documents]
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [tabIdx, setTabIdx] = useState(0)
  const [added, setAdded] = useState(false)

  const product = products.find(p => p.id === Number(id))
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)
  const inWish = wishlist.includes(product?.id ?? 0)
  const productBrand = product ? getBrandById(product.brandId) : undefined
  const brandName = getBrandName(productBrand, lang)

  if (!product) return (
    <div className="py-24 text-center">
      <h2 className="font-display font-700 text-[28px] mb-4" style={{ color: NAVY }}>Product Not Found</h2>
      <Link to="/products" className="font-ui text-[13px] font-600 px-6 py-3 text-white no-underline" style={{ background: BLUE }}>Browse Products</Link>
    </div>
  )

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, sku: product.sku, price: product.price, img: product.img, category: product.category, brand: brandName, stock: product.stock }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ background: 'var(--nb-bg)', overflowX: 'hidden' }}>
      {/* Breadcrumb */}
      <div className="bg-white" style={{ borderBottom: '1px solid var(--nb-border)' }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: product.category, to: `/products?category=${encodeURIComponent(product.category)}` }, { label: product.name }]} />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        {/* Main product block */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 mb-10">
          {/* Gallery */}
          <div>
            <div className="bg-white overflow-hidden mb-3 h-[200px] sm:h-[300px] lg:h-[420px]" style={{ border: '1px solid var(--nb-border)' }}>
              <img src={product.images[activeImg] || product.img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className="overflow-hidden transition-all" style={{ width: 72, height: 54, border: `2px solid ${i === activeImg ? BLUE : 'var(--nb-border)'}` }}>
                    <img src={img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="bg-white p-7" style={{ border: '1px solid var(--nb-border)', alignSelf: 'start' }}>
            {/* Brand + certifications */}
            <div className="flex items-center gap-2 mb-3">
              {productBrand?.logo && <img src={productBrand.logo} alt="" className="w-auto object-contain" style={{ maxHeight: 22, maxWidth: 90 }} />}
              <span className="font-display font-700 text-[13px] tracking-wide" style={{ color: BLUE }}>{brandName}</span>
              {product.certifications.map(c => (
                <span key={c} className="font-ui text-[9px] px-2 py-0.5 tracking-wide" style={{ background: '#F0F4F8', color: '#607080' }}>{c}</span>
              ))}
            </div>

            <h1 className="font-display font-800 leading-tight mb-2" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: NAVY }}>{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="font-ui text-[12px]" style={{ color: '#8f9faf' }}>Model: <strong style={{ color: '#475569' }}>{product.model}</strong></span>
              <span className="font-ui text-[12px]" style={{ color: '#8f9faf' }}>SKU: <strong style={{ color: '#475569' }}>{product.sku}</strong></span>
            </div>

            <div className="mb-5 pb-5" style={{ borderBottom: '1px solid var(--nb-bg)' }}>
              <p className="font-ui text-[14px] leading-[1.75]" style={{ color: '#4a5568' }}>{product.shortDesc}</p>
            </div>

            {/* Price + stock */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <ProductPrice product={product} size="lg" note />
                <div className="font-ui text-[11px] mt-1" style={{ color: '#8f9faf' }}>{ct.approx_excl}</div>
              </div>
              <div className="text-right">
                <span className="font-ui text-[12px] font-600 px-3 py-1" style={{ background: product.stock > 5 ? '#ecfdf5' : '#fef9ec', color: product.stock > 5 ? '#16a34a' : '#d97706' }}>
                  {product.stockLabel}
                </span>
                <div className="font-ui text-[11px] mt-1" style={{ color: '#8f9faf' }}>{product.stock} units available</div>
              </div>
            </div>

            {/* Qty selector */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center" style={{ border: '1px solid var(--nb-border)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 transition-colors hover:bg-slate-50"><MinusIcon /></button>
                <span className="font-ui text-[14px] font-600 px-4" style={{ color: NAVY }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2.5 transition-colors hover:bg-slate-50"><PlusIcon /></button>
              </div>
              <span className="font-ui text-[12px]" style={{ color: '#8f9faf' }}>Max: {product.stock} units</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 mb-5">
              <button onClick={handleAddToCart} disabled={!priceFor(product).ok || product.stock <= 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-ui text-[13px] font-600 py-3.5 text-white w-full transition-all"
                style={{ background: added ? '#16a34a' : BLUE }}>
                <CartIcon />
                {added ? t.product.added_cart : t.product.add_to_cart}
              </button>
              <button onClick={() => { addToRFQ({ id: product.id, name: product.name, sku: product.sku, img: product.img, category: product.category }, qty); navigate('/rfq') }}
                className="font-ui text-[13px] font-600 py-3.5 w-full transition-all"
                style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
                {t.product.add_to_rfq}
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex gap-4 pb-5" style={{ borderBottom: '1px solid var(--nb-bg)' }}>
              <button onClick={() => toggleWishlist(product.id)} className="flex items-center gap-1.5 font-ui text-[12px] transition-colors"
                style={{ color: inWish ? '#ef4444' : 'var(--nb-text-secondary)' }}>
                <HeartIcon filled={inWish} /> {inWish ? 'Saved' : 'Save to Wishlist'}
              </button>
              <a href={`tel:${customerService.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 font-ui text-[12px] no-underline" style={{ color: 'var(--nb-text-secondary)' }}>
                <PhoneIcon /> Contact Sales
              </a>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {['ISO-Certified Products', 'Technical Support', 'After-Sales Service', 'Competitive Pricing'].map(label => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                  <span className="font-ui text-[11px]" style={{ color: 'var(--nb-text-secondary)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail tabs */}
        <div className="bg-white" style={{ border: '1px solid var(--nb-border)' }}>
          <div className="flex overflow-x-auto" style={{ borderBottom: '1px solid var(--nb-border)', scrollbarWidth: 'none' }}>
            {TABS.map((label, i) => (
              <button key={i} onClick={() => setTabIdx(i)}
                className="font-ui text-[12px] sm:text-[13px] font-600 px-4 sm:px-7 py-3.5 sm:py-4 transition-colors whitespace-nowrap shrink-0"
                style={{ color: tabIdx === i ? BLUE : '#475569', borderBottom: tabIdx === i ? `2px solid ${BLUE}` : '2px solid transparent' }}>
                {label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {tabIdx === 0 && (
              <div className="max-w-3xl">
                <h3 className="font-display font-700 text-[20px] mb-4" style={{ color: NAVY }}>{t.product.overview}</h3>
                <p className="font-ui text-[14.5px] leading-[1.8]" style={{ color: '#4a5568' }}>{product.description}</p>
              </div>
            )}

            {tabIdx === 1 && (
              <div className="max-w-2xl overflow-x-auto">
                <h3 className="font-display font-700 text-[18px] sm:text-[20px] mb-4 sm:mb-6" style={{ color: NAVY }}>{t.product.specifications}</h3>
                <div className="flex flex-col min-w-0">
                  {product.specs.map((s, i) => (
                    <div key={s.label} className="flex py-2.5"
                      style={{ borderBottom: '1px solid var(--nb-bg)', background: i % 2 === 0 ? 'var(--nb-surface)' : '#fff' }}>
                      <span className="font-ui text-[12px] sm:text-[13px] font-600 px-3 sm:px-4 w-[45%] shrink-0" style={{ color: '#374151' }}>{s.label}</span>
                      <span className="font-ui text-[12px] sm:text-[13px] px-3 sm:px-4 flex-1 min-w-0" style={{ color: 'var(--nb-text-secondary)' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabIdx === 2 && (
              <div className="max-w-2xl">
                <h3 className="font-display font-700 text-[20px] mb-6" style={{ color: NAVY }}>Applications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map(app => (
                    <div key={app} className="flex items-center gap-3 p-4" style={{ background: 'var(--nb-bg)', border: '1px solid var(--nb-border)' }}>
                      <div className="w-2 h-2 shrink-0" style={{ background: GOLD }} />
                      <span className="font-ui text-[13px]" style={{ color: '#374151' }}>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabIdx === 3 && (
              <div>
                <h3 className="font-display font-700 text-[18px] sm:text-[20px] mb-4 sm:mb-6" style={{ color: NAVY }}>{t.product.documents}</h3>
                {['Product Datasheet', 'Installation Manual', 'Compliance Certificate', 'Wiring Diagram'].map(doc => (
                  <div key={doc} className="flex items-center justify-between gap-3 py-3 sm:py-4" style={{ borderBottom: '1px solid var(--nb-bg)' }}>
                    <div className="min-w-0">
                      <div className="font-ui text-[12px] sm:text-[13px] font-600" style={{ color: NAVY }}>{doc}</div>
                      <div className="font-ui text-[10px] sm:text-[11px]" style={{ color: '#8f9faf' }}>PDF · Available on request</div>
                    </div>
                    <button className="flex items-center gap-1 sm:gap-1.5 font-ui text-[11px] sm:text-[12px] font-600 px-3 sm:px-4 py-2 transition-colors shrink-0" style={{ border: '1px solid var(--nb-border)', color: '#475569' }}>
                      <DownloadIcon /> Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display font-700 text-[22px] mb-5" style={{ color: NAVY }}>{t.product.related}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="no-underline bg-white flex gap-4 p-4 transition-colors hover:bg-[var(--nb-surface)]" style={{ border: '1px solid var(--nb-border)' }}>
                  <div className="overflow-hidden shrink-0" style={{ width: 80, height: 60, background: 'var(--nb-bg)' }}>
                    <img src={p.img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-700 text-[14px] leading-snug mb-1" style={{ color: NAVY }}>{p.name}</div>
                    <ProductPrice product={p} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
