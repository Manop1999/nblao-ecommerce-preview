import { Link } from 'react-router-dom'
import { useStore } from '../store'

const NAVY = 'var(--nb-navy)'
const BLUE = 'var(--nb-primary)'
const GOLD = 'var(--nb-gold)'

const INDUSTRIES = [
  {
    name: 'Power & Energy',
    nameLo: 'ໄຟຟ້າ ແລະ ພະລັງງານ',
    image: import.meta.env.BASE_URL + 'site-images/df0bbd67f314.jpg',
    description: 'High-voltage equipment, transformers, and grid infrastructure.',
    descriptionLo: 'ອຸປະກອນແຮງດັນສູງ, ໝໍ້ແປງໄຟ ແລະ ລະບົບສາຍສົ່ງໄຟຟ້າ.',
    category: 'Power & Energy',
  },
  {
    name: 'Oil & Gas',
    nameLo: 'ນ້ຳມັນ ແລະ ອາຍແກັສ',
    image: import.meta.env.BASE_URL + 'site-images/b4cdb1afbd7f.jpg',
    description: 'Pumps, valves, and pressure-rated industrial components.',
    descriptionLo: 'ປ້ຳ, ວາວ ແລະ ອຸປະກອນອຸດສາຫະກຳທີ່ຮອງຮັບແຮງດັນ.',
    category: 'Industrial Machinery',
  },
  {
    name: 'Construction',
    nameLo: 'ການກໍ່ສ້າງ',
    image: import.meta.env.BASE_URL + 'site-images/cf40f0fd1621.jpg',
    description: 'Heavy machinery, lifting equipment, and site safety solutions.',
    descriptionLo: 'ເຄື່ອງຈັກໜັກ, ອຸປະກອນຍົກ ແລະ ອຸປະກອນຄວາມປອດໄພໃນໜ້າງານ.',
    category: 'Tools & Equipment',
  },
  {
    name: 'Manufacturing',
    nameLo: 'ການຜະລິດ',
    image: import.meta.env.BASE_URL + 'site-images/e1506822243e.jpg',
    description: 'Automation, conveyors, and precision engineering tools.',
    descriptionLo: 'ລະບົບອັດຕະໂນມັດ, ສາຍພານລຳລຽງ ແລະ ເຄື່ອງມືວິສະວະກຳຄວາມແມ່ນຍຳສູງ.',
    category: 'Industrial Machinery',
  },
  {
    name: 'Mining',
    nameLo: 'ບໍ່ແຮ່',
    image: import.meta.env.BASE_URL + 'site-images/faccb7973b7e.jpg',
    description: 'Extraction equipment, safety systems, and site infrastructure.',
    descriptionLo: 'ອຸປະກອນຂຸດຄົ້ນ, ລະບົບຄວາມປອດໄພ ແລະ ໂຄງສ້າງພື້ນຖານໃນໜ້າງານ.',
    category: 'Safety & Fire Protection',
  },
  {
    name: 'Water & Utilities',
    nameLo: 'ນ້ຳ ແລະ ສາທາລະນູປະໂພກ',
    image: import.meta.env.BASE_URL + 'site-images/64446e0c5122.jpg',
    description: 'Pumping stations, flow control, and treatment equipment.',
    descriptionLo: 'ສະຖານີສູບນ້ຳ, ລະບົບຄວບຄຸມການໄຫຼ ແລະ ອຸປະກອນບຳບັດນ້ຳ.',
    category: 'Industrial Machinery',
  },
]

export default function Industries() {
  const { lang } = useStore()
  const isLao = lang === 'lo'

  return (
    <div style={{ background: 'var(--nb-bg)' }}>
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <img
          src={`${import.meta.env.BASE_URL}site-images/578c95d1df8b.jpg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ background: GOLD }} />
            <span
              className="font-ui text-[11px] tracking-[0.22em] uppercase font-600"
              style={{ color: GOLD }}
            >
              {isLao ? 'ອຸດສາຫະກຳ' : 'Industries'}
            </span>
          </div>

          <h1 className="font-display font-800 text-[36px] lg:text-[48px] leading-[1.08] text-white mb-4">
            {isLao ? 'ອຸດສາຫະກຳທີ່ເຮົາໃຫ້ບໍລິການ' : 'Industries We Serve'}
          </h1>

          <p
            className="font-ui text-[15px] leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {isLao
              ? 'ສະໜັບສະໜູນດ້ານອຸປະກອນ ແລະ ການຈັດຫາສິນຄ້າສຳລັບຂະແໜງອຸດສາຫະກຳຕ່າງໆຂອງ NB LAO.'
              : "Equipment and supply support for the industrial sectors represented across NB LAO's product range."}
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.name}
              className="bg-white flex flex-col overflow-hidden"
              style={{ border: '1px solid var(--nb-border)' }}
            >
              <img
                src={industry.image}
                alt={isLao ? industry.nameLo : industry.name}
                loading="lazy"
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-display font-700 text-[20px] mb-2" style={{ color: NAVY }}>
                  {isLao ? industry.nameLo : industry.name}
                </h2>

                <p
                  className="font-ui text-[13px] leading-relaxed mb-5 flex-1"
                  style={{ color: 'var(--nb-text-secondary)' }}
                >
                  {isLao ? industry.descriptionLo : industry.description}
                </p>



<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
  <Link
    to={`/products?category=${encodeURIComponent(industry.category)}`}
    className="inline-flex items-center gap-1 font-ui text-[12px] font-600 no-underline"
    style={{ color: BLUE }}
  >
    <span data-i18n-skip>
      {isLao
        ? 'ເບິ່ງສິນຄ້າທີ່ກ່ຽວຂ້ອງ'
        : 'Related products'}
    </span>
    <span aria-hidden="true">→</span>
  </Link>

  <Link
    to="/services"
    className="inline-flex items-center gap-1 font-ui text-[12px] font-600 no-underline"
    style={{ color: NAVY }}
  >
    <span data-i18n-skip>
      {isLao
        ? 'ບໍລິການຂອງເຮົາ'
        : 'Our services'}
    </span>
    <span aria-hidden="true">→</span>
  </Link>
</div>




              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
