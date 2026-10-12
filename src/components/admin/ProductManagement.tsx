import { ChangeEvent, FormEvent, useState } from 'react'
import { CATEGORIES, CATEGORY_SUBS, Product } from '../../data'
import { useStore } from '../../store'
import { getBrandName } from '../../brands'

const NAVY = 'var(--nb-navy)'
const BLUE = 'var(--nb-primary)'
const fieldClass = 'w-full font-ui text-[12px] px-3 py-2.5 outline-none bg-white'
const fieldStyle = { border: '1px solid var(--nb-border)', color: NAVY }

function newProduct(id: number): Product {
  return {
    id, name: '', sku: '', brandId: '', category: CATEGORIES[0],
    subcategory: CATEGORY_SUBS[CATEGORIES[0]][0], model: '', price: 0,
    priceDisplay: '$0', priceUnit: 'per unit', stock: 0, stockLabel: 'Out of Stock',
    img: '', images: [], shortDesc: '', description: '', spec: '', specs: [],
    applications: [], tags: [], featured: false, certifications: [],
  }
}

const readImages = (files: FileList) =>
  Promise.all(Array.from(files).map(file => new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith('image/') || file.size > 4 * 1024 * 1024) {
      reject(new Error('Use image files no larger than 4 MB.'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Unable to read image.'))
    reader.readAsDataURL(file)
  })))

export default function ProductManagement() {
  const { products, brands, lang, saveProduct, deleteProduct } = useStore()
  const [editing, setEditing] = useState<Product | null>(null)
  const [error, setError] = useState('')

  const setField = <K extends keyof Product>(key: K, value: Product[K]) =>
    setEditing(current => current ? { ...current, [key]: value } : current)

  const handleImages = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !editing) return
    try {
      const uploaded = await readImages(event.target.files)
      const images = [...editing.images, ...uploaded]
      setEditing({ ...editing, images, img: editing.img || images[0] || '' })
      setError('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to upload images.')
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!editing) return
    const images = editing.images.filter(Boolean)
    if (!editing.name.trim() || !editing.sku.trim() || !editing.brandId || !editing.category || (!editing.img && images.length === 0)) {
      setError('Name, SKU, brand, category, and a product image are required.')
      return
    }
    saveProduct({
      ...editing,
      name: editing.name.trim(),
      sku: editing.sku.trim(),
      priceDisplay: `$${editing.price.toLocaleString()}`,
      stockLabel: editing.stock <= 0 ? 'Out of Stock' : editing.stock <= 3 ? 'Low Stock' : 'In Stock',
      images,
      img: editing.img || images[0] || '',
    })
    setEditing(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display font-700 text-[22px]" style={{ color: NAVY }}>Product Management</h2>
          <p className="font-ui text-[12px] mt-1 text-slate-500">Product images here are used across the storefront, comparison, and related products.</p>
        </div>
        <button onClick={() => setEditing(newProduct(Math.max(0, ...products.map(product => product.id)) + 1))} className="font-ui text-[12px] font-600 px-4 py-2.5 text-white" style={{ background: BLUE }}>+ Add Product</button>
      </div>

      <div className="bg-white overflow-x-auto" style={{ border: '1px solid var(--nb-border)' }}>
        <table className="w-full min-w-[760px]">
          <thead><tr className="bg-slate-50 border-b border-slate-200">
            {['Product', 'SKU', 'Brand', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(label => <th key={label} className="px-4 py-3 text-left font-ui text-[10px] font-700 uppercase tracking-wider text-slate-500">{label}</th>)}
          </tr></thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-slate-100">
                <td className="px-4 py-3"><div className="flex items-center gap-3">
                  <img src={product.img || '/product-placeholder.svg'} onError={event => { event.currentTarget.src = '/product-placeholder.svg' }} alt="" className="w-12 h-10 object-contain bg-slate-50" />
                  <span className="font-ui text-[12px] font-600 max-w-52 line-clamp-2" style={{ color: NAVY }}>{product.name}</span>
                </div></td>
                <td className="px-4 py-3 font-ui text-[11px] text-slate-500">{product.sku}</td>
                <td className="px-4 py-3 font-ui text-[12px] text-slate-600">{getBrandName(brands.find(brand => brand.id === product.brandId), lang)}</td>
                <td className="px-4 py-3 font-ui text-[11px] text-slate-600">{product.category}</td>
                <td className="px-4 py-3 font-display font-700 text-[13px]" style={{ color: NAVY }}>{product.priceDisplay}</td>
                <td className="px-4 py-3 font-ui text-[12px]">{product.stock}</td>
                <td className="px-4 py-3 font-ui text-[11px]">{product.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3"><div className="flex gap-2">
                  <button onClick={() => { setEditing({ ...product, images: [...product.images] }); setError('') }} className="font-ui text-[11px] px-2.5 py-1 border border-slate-300 text-slate-600">Edit</button>
                  <button onClick={() => window.confirm('Delete this product?') && deleteProduct(product.id)} className="font-ui text-[11px] px-2.5 py-1 border border-red-200 text-red-600">Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form onSubmit={submit} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-700 text-[20px]" style={{ color: NAVY }}>{products.some(product => product.id === editing.id) ? 'Edit Product' : 'Add Product'}</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-slate-500">Close</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="font-ui text-[11px] text-slate-600">Product name<input value={editing.name} onChange={event => setField('name', event.target.value)} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="font-ui text-[11px] text-slate-600">SKU<input value={editing.sku} onChange={event => setField('sku', event.target.value)} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="font-ui text-[11px] text-slate-600">Brand<select value={editing.brandId} onChange={event => setField('brandId', event.target.value)} className={`${fieldClass} mt-1`} style={fieldStyle}><option value="">Select brand</option>{brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></label>
              <label className="font-ui text-[11px] text-slate-600">Category<select value={editing.category} onChange={event => { const category = event.target.value; setEditing(current => current ? { ...current, category, subcategory: CATEGORY_SUBS[category]?.[0] || '' } : current) }} className={`${fieldClass} mt-1`} style={fieldStyle}>{CATEGORIES.map(category => <option key={category}>{category}</option>)}</select></label>
              <label className="font-ui text-[11px] text-slate-600">Subcategory<select value={editing.subcategory} onChange={event => setField('subcategory', event.target.value)} className={`${fieldClass} mt-1`} style={fieldStyle}>{(CATEGORY_SUBS[editing.category] || []).map(subcategory => <option key={subcategory}>{subcategory}</option>)}</select></label>
              <label className="font-ui text-[11px] text-slate-600">Model<input value={editing.model} onChange={event => setField('model', event.target.value)} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="font-ui text-[11px] text-slate-600">Price (USD)<input type="number" min="0" value={editing.price} onChange={event => setField('price', Number(event.target.value))} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="font-ui text-[11px] text-slate-600">Stock<input type="number" min="0" value={editing.stock} onChange={event => setField('stock', Number(event.target.value))} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="sm:col-span-2 font-ui text-[11px] text-slate-600">Short description<textarea value={editing.shortDesc} onChange={event => setField('shortDesc', event.target.value)} className={`${fieldClass} mt-1 min-h-20`} style={fieldStyle} /></label>
              <label className="sm:col-span-2 font-ui text-[11px] text-slate-600">Full description<textarea value={editing.description} onChange={event => setField('description', event.target.value)} className={`${fieldClass} mt-1 min-h-24`} style={fieldStyle} /></label>
              <label className="font-ui text-[11px] text-slate-600">Product images<input type="file" accept="image/*" multiple onChange={handleImages} className={`${fieldClass} mt-1`} style={fieldStyle} /></label>
              <label className="flex items-center gap-2 self-end pb-2 font-ui text-[12px]" style={{ color: NAVY }}><input type="checkbox" checked={editing.featured} onChange={event => setField('featured', event.target.checked)} /> Featured product</label>
            </div>
            {editing.images.length > 0 && <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">{editing.images.map((image, index) => <div key={`${image.slice(0, 30)}-${index}`} className="relative border p-1" style={{ borderColor: editing.img === image ? BLUE : 'var(--nb-border)' }}><button type="button" onClick={() => setField('img', image)} className="block w-full"><img src={image} alt="" className="w-full h-16 object-contain" /></button><button type="button" onClick={() => { const images = editing.images.filter((_, imageIndex) => imageIndex !== index); setEditing({ ...editing, images, img: editing.img === image ? images[0] || '' : editing.img }) }} className="absolute top-0 right-0 bg-white text-red-600 px-1">×</button><span className="block text-center font-ui text-[9px] text-slate-500">{editing.img === image ? 'Primary' : 'Set primary'}</span></div>)}</div>}
            {error && <p className="font-ui text-[12px] text-red-600 mt-4">{error}</p>}
            <div className="flex justify-end gap-2 mt-6"><button type="button" onClick={() => setEditing(null)} className="font-ui text-[12px] px-4 py-2 border border-slate-300">Cancel</button><button className="font-ui text-[12px] font-600 px-5 py-2 text-white" style={{ background: BLUE }}>Save Product</button></div>
          </form>
        </div>
      )}
    </div>
  )
}
