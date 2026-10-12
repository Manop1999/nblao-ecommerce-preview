export interface Advertisement {
  id: string
  placement: 'main' | 'side'
  titleEn: string
  titleLo: string
  descriptionEn: string
  descriptionLo: string
  ctaEn: string
  ctaLo: string
  image: string
  destinationUrl: string
  active: boolean
  displayOrder: number
  startDate: string
  endDate: string
}

export interface CustomerServiceSettings {
  addressEn: string
  addressLo: string
  mapUrl: string
  phone: string
  email: string
  whatsapp: string
  line: string
  facebook: string
  wechat: string
  tiktok: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  brandId?: string
  url: string
  active: boolean
  displayOrder: number
}

export type LeadershipSection = 'owner' | 'management' | 'expertise' | 'team'

export interface LeadershipItem {
  id: string
  section: LeadershipSection
  image: string
  nameEn: string
  nameLo: string
  positionEn: string
  positionLo: string
  titleEn: string
  titleLo: string
  descriptionEn: string
  descriptionLo: string
  messageEn: string
  messageLo: string
  active: boolean
  displayOrder: number
}

export const DEFAULT_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 'ad-power-solutions',
    placement: 'main',
    titleEn: 'Engineered Power Solutions for Industry',
    titleLo: 'ໂຊລູຊັນພະລັງງານສຳລັບອຸດສາຫະກຳ',
    descriptionEn: 'Certified transformers, switchgear, and power distribution equipment for demanding projects.',
    descriptionLo: 'ໝໍ້ແປງໄຟ, ສະວິດເກຍ ແລະ ອຸປະກອນຈ່າຍໄຟທີ່ໄດ້ມາດຕະຖານສຳລັບໂຄງການ.',
    ctaEn: 'Explore Power Solutions',
    ctaLo: 'ເບິ່ງໂຊລູຊັນພະລັງງານ',
    image: '/advertisements/power-solutions.jpg',
    destinationUrl: '/products?category=Power%20%26%20Energy',
    active: true,
    displayOrder: 1,
    startDate: '',
    endDate: '',
  },
]

export const DEFAULT_CUSTOMER_SERVICE: CustomerServiceSettings = {
  addressEn: '123 Industrial Zone, Saysettha, Vientiane, Laos PDR',
  addressLo: '123 ເຂດອຸດສາຫະກຳ, ໄຊເສດຖາ, ວຽງຈັນ, ສປປ ລາວ',
  mapUrl: '',
  phone: '+856 20 5555 6789',
  email: 'info@nblaosolelao.com',
  whatsapp: '',
  line: '',
  facebook: '',
  wechat: '',
  tiktok: '',
}

export const DEFAULT_PARTNERS: Partner[] = [
  { id: 'partner-siemens', name: 'Siemens', logo: '', brandId: 'brand-siemens', url: '', active: true, displayOrder: 1 },
  { id: 'partner-abb', name: 'ABB', logo: '', brandId: 'brand-abb', url: '', active: true, displayOrder: 2 },
  { id: 'partner-schneider', name: 'Schneider Electric', logo: '', brandId: 'brand-schneider-electric', url: '', active: true, displayOrder: 3 },
  { id: 'partner-eaton', name: 'Eaton', logo: '', brandId: 'brand-eaton', url: '', active: true, displayOrder: 4 },
  { id: 'partner-legrand', name: 'Legrand', logo: '', brandId: 'brand-legrand', url: '', active: true, displayOrder: 5 },
  { id: 'partner-mitsubishi', name: 'Mitsubishi Electric', logo: '', brandId: 'brand-mitsubishi-electric', url: '', active: true, displayOrder: 6 },
]

export const DEFAULT_LEADERSHIP: LeadershipItem[] = [
  {
    id: 'leader-bounkhong',
    section: 'team',
    image: '/site-images/345e73efccf1.jpg',
    nameEn: 'Mr. Bounkhong Phommasack',
    nameLo: '',
    positionEn: 'Chief Executive Officer',
    positionLo: '',
    titleEn: '',
    titleLo: '',
    descriptionEn: '',
    descriptionLo: '',
    messageEn: '',
    messageLo: '',
    active: true,
    displayOrder: 1,
  },
  {
    id: 'leader-khamla',
    section: 'team',
    image: '/site-images/649924e68bdf.jpg',
    nameEn: 'Ms. Khamla Sysouphanh',
    nameLo: '',
    positionEn: 'Head of Sales & Partnerships',
    positionLo: '',
    titleEn: '',
    titleLo: '',
    descriptionEn: '',
    descriptionLo: '',
    messageEn: '',
    messageLo: '',
    active: true,
    displayOrder: 2,
  },
  {
    id: 'leader-somphong',
    section: 'team',
    image: '/site-images/20c1d8176894.jpg',
    nameEn: 'Mr. Somphong Viravong',
    nameLo: '',
    positionEn: 'Technical Director',
    positionLo: '',
    titleEn: '',
    titleLo: '',
    descriptionEn: '',
    descriptionLo: '',
    messageEn: '',
    messageLo: '',
    active: true,
    displayOrder: 3,
  },
  {
    id: 'leader-naly',
    section: 'team',
    image: '/site-images/a635d4424526.jpg',
    nameEn: 'Ms. Naly Keovongsa',
    nameLo: '',
    positionEn: 'Operations Manager',
    positionLo: '',
    titleEn: '',
    titleLo: '',
    descriptionEn: '',
    descriptionLo: '',
    messageEn: '',
    messageLo: '',
    active: true,
    displayOrder: 4,
  },
]

export const getActiveAdvertisements = (advertisements: Advertisement[], now = new Date()) =>
  [...advertisements]
    .filter((ad) => {
      if (!ad.active) return false
      const starts = !ad.startDate || new Date(`${ad.startDate}T00:00:00`) <= now
      const ends = !ad.endDate || new Date(`${ad.endDate}T23:59:59`) >= now
      return starts && ends
    })
    .sort((a, b) => a.displayOrder - b.displayOrder)

export const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, '')

export const getWhatsAppUrl = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const number = normalizePhone(trimmed)
  return number ? `https://wa.me/${number}` : ''
}
