import { Car, CreditCard, History, Home, LogOut, Settings, Wallet } from 'lucide-react';

export const subscriptionPlans = [
  {
    name: 'Essential Wash',
    price: 40,
    features: ['Weekly exterior wash', 'Tire shine', 'Hand dry', 'Basic vacuum'],
    isPopular: false,
  },
  {
    name: 'Premium Detail',
    price: 80,
    features: ['Bi-weekly exterior & interior', 'Wax and polish', 'Leather conditioning', 'Priority scheduling'],
    isPopular: true,
  },
  {
    name: 'Luxe Auto Care',
    price: 150,
    features: ['Weekly full detail', 'Engine bay cleaning', 'Headlight restoration', 'Complimentary air freshener'],
    isPopular: false,
  },
];

export const faqs = [
  {
    question: 'Can I cancel or pause my subscription?',
    answer: 'Yes, you can easily pause or cancel your subscription at any time through your customer dashboard. We believe in flexibility and putting you in control.',
  },
  {
    question: 'What kind of products do you use?',
    answer: 'We use high-quality, professional-grade car cleaning products that are safe for your vehicle\'s paint and interior surfaces.',
  },
  {
    question: 'How do I schedule my car washes?',
    answer: 'Once you subscribe, you can set your preferred wash schedule in your dashboard. You can also reschedule appointments with 24 hours notice.',
  },
  {
    question: 'What if I am not satisfied with the wash?',
    answer: 'Your satisfaction is our top priority. If for any reason you are not happy with our service, please contact us within 24 hours, and we will arrange a re-wash, free of charge.',
  },
];

export const benefits = [
  {
    icon: 'Sparkles',
    title: 'Consistently Clean Car',
    description: 'Enjoy the pride of a perpetually spotless car, without the hassle of washing it yourself.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Trusted Professionals',
    description: 'Our detailers are vetted, insured, and trained to provide a secure and high-quality service.',
  },
  {
    icon: 'Car',
    title: 'High-Quality Products',
    description: 'We use premium products to protect your car\'s finish and keep it looking its best.',
  },
  {
    icon: 'CalendarClock',
    title: 'Flexible Scheduling',
    description: 'Manage your bookings easily through our dashboard to fit your busy lifestyle.',
  },
];


export const user = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const userSubscriptions = [
  {
    id: 'sub_1',
    planName: 'Premium Detail',
    status: 'Active',
    nextBillingDate: 'August 15, 2024',
    price: 80,
  },
  {
    id: 'sub_2',
    planName: 'Essential Wash',
    status: 'Cancelled',
    cancellationDate: 'May 20, 2024',
    price: 40,
  },
];

export const paymentMethods = [
  {
    id: 'pm_1',
    type: 'Visa',
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'Mastercard',
    last4: '5555',
    expiry: '08/25',
    isDefault: false,
  },
];

export const bookingHistory = [
  {
    id: 'booking_1',
    date: 'July 1, 2024',
    service: 'Premium Detail',
    status: 'Completed',
    amount: 80,
  },
  {
    id: 'booking_2',
    date: 'June 17, 2024',
    service: 'Premium Detail',
    status: 'Completed',
    amount: 80,
  },
  {
    id: 'booking_3',
    date: 'June 3, 2024',
    service: 'Premium Detail',
    status: 'Completed',
    amount: 80,
  },
  {
    id: 'booking_4',
    date: 'May 20, 2024',
    service: 'Essential Wash',
    status: 'Completed',
    amount: 40,
  },
];

export const dashboardNavItems = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/subscriptions', label: 'Subscriptions', icon: Wallet },
    { href: '/dashboard/payments', label: 'Payment Methods', icon: CreditCard },
    { href: '/dashboard/history', label: 'Booking History', icon: History },
    { href: '#', label: 'Settings', icon: Settings },
];

export const dashboardLogoutItem = {
    label: 'Log Out',
    icon: LogOut,
};
