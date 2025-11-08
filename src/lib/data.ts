
export type Benefit = {
  title: string;
  logo: string;
  _id: string;
};

export type SubscriptionPlan = {
  _id: string;
  name: string;
  serviceName: string;
  type: string;
  carType: string;
  price: number;
  active: boolean;
  frequencyPerWeek: number;
  subscriptionDurationInMonths: number;
  benefits: Benefit[];
  deletedAt: string | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
  isPopular?: boolean; // Keep for UI hint
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type UserSubscription = {
  id: string;
  planName: string;
  status: 'Active' | 'Cancelled';
  nextBillingDate: string;
  price: number;
};

export type PaymentMethod = {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
};

export type Booking = {
  id: string;
  date: string;
  service: string;
  status: 'Completed' | 'Upcoming';
  amount: number;
};

export const getSubscriptionPlans = async (filters: { [key: string]: string | boolean } = {}): Promise<SubscriptionPlan[]> => {
  try {
    const url = new URL('https://maison-saner-roni.ngrok-free.dev/products');
    
    // Set default filters that should always be present
    url.searchParams.set('serviceName', 'car-wash');
    url.searchParams.set('type', 'subscribe');
    url.searchParams.set('active', 'true');

    // Add any additional filters passed to the function
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
      headers: new Headers({
        'ngrok-skip-browser-warning': '69420',
      }),
    });

    if (!response.ok) {
      console.error('Failed to fetch products', response.statusText);
      return [];
    }
    const products: SubscriptionPlan[] = await response.json();
    
    // basic logic to mark one as popular for UI
    if (products.length > 1) {
        products[1].isPopular = true;
    } else if (products.length === 1) {
        products[0].isPopular = true;
    }

    return products;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
}


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
