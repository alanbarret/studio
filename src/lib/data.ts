import { CreditCard, History, Home, LogOut, Settings, Wallet } from 'lucide-react';

export const subscriptionPlans = [
  {
    name: 'Essential Clean',
    price: 120,
    features: ['Weekly standard cleaning', 'Up to 2 rooms', 'Eco-friendly products', 'Dedicated cleaner'],
    isPopular: false,
  },
  {
    name: 'Premium Deep Clean',
    price: 180,
    features: ['Bi-weekly deep cleaning', 'Up to 4 rooms', 'Includes appliance cleaning', 'Priority scheduling'],
    isPopular: true,
  },
  {
    name: 'Luxe Home Care',
    price: 250,
    features: ['Weekly deep cleaning', 'Entire home coverage', 'Laundry & organization', 'Complimentary supplies'],
    isPopular: false,
  },
];

export const faqs = [
  {
    question: 'Can I cancel or pause my subscription?',
    answer: 'Yes, you can easily pause or cancel your subscription at any time through your customer dashboard. We believe in flexibility and putting you in control.',
  },
  {
    question: 'Are the cleaning products safe for pets and children?',
    answer: 'Absolutely. We exclusively use high-quality, eco-friendly, and non-toxic cleaning products that are safe for all members of your family, including pets and children.',
  },
  {
    question: 'How do I schedule my cleaning appointments?',
    answer: 'Once you subscribe, you can set your preferred cleaning schedule in your dashboard. You can also reschedule appointments with 24 hours notice.',
  },
  {
    question: 'What if I am not satisfied with the cleaning?',
    answer: 'Your satisfaction is our top priority. If for any reason you are not happy with our service, please contact us within 24 hours, and we will arrange a re-clean for the specific areas, free of charge.',
  },
];

export const benefits = [
  {
    icon: 'Sparkles',
    title: 'Consistently Clean Home',
    description: 'Enjoy the peace of mind that comes with a perpetually spotless home, without lifting a finger.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Trusted Professionals',
    description: 'Our cleaners are vetted, insured, and trained to provide a secure and high-quality service.',
  },
  {
    icon: 'Leaf',
    title: 'Eco-Friendly Products',
    description: 'We use sustainable and non-toxic products to protect your family and the environment.',
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
    planName: 'Premium Deep Clean',
    status: 'Active',
    nextBillingDate: 'August 15, 2024',
    price: 180,
  },
  {
    id: 'sub_2',
    planName: 'Essential Clean',
    status: 'Cancelled',
    cancellationDate: 'May 20, 2024',
    price: 120,
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
    service: 'Premium Deep Clean',
    status: 'Completed',
    amount: 180,
  },
  {
    id: 'booking_2',
    date: 'June 17, 2024',
    service: 'Premium Deep Clean',
    status: 'Completed',
    amount: 180,
  },
  {
    id: 'booking_3',
    date: 'June 3, 2024',
    service: 'Premium Deep Clean',
    status: 'Completed',
    amount: 180,
  },
  {
    id: 'booking_4',
    date: 'May 20, 2024',
    service: 'Essential Clean',
    status: 'Completed',
    amount: 120,
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
