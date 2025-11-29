import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah L.",
        avatar: "https://i.pravatar.cc/150?img=5",
        title: "Busy Professional",
        quote: "CleanSweep is a lifesaver. My car has never looked better, and I don't have to waste my weekends at a car wash. The convenience is unbeatable."
    },
    {
        name: "Mike R.",
        avatar: "https://i.pravatar.cc/150?img=7",
        title: "Car Enthusiast",
        quote: "I'm picky about who touches my car. The professionals at CleanSweep are meticulous and use great products. It's worth every penny for the peace of mind."
    },
    {
        name: "Jessica P.",
        avatar: "https://i.pravatar.cc/150?img=8",
        title: "Mom of Three",
        quote: "With three kids, my car is a mess. The team does an incredible job making it look and feel brand new every single time. It's my favorite subscription!"
    }
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-16 sm:py-24 bg-secondary">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Customers Everywhere</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Don't just take our word for it. Here's what our subscribers are saying.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col">
                           <CardContent className="pt-6 flex-1">
                             <p className="text-muted-foreground">"{testimonial.quote}"</p>
                           </CardContent>
                           <CardHeader className="flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                </div>
                           </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
