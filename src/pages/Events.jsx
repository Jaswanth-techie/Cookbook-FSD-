import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events = () => {
    const events = [
        {
            id: 1,
            title: "Summer Food Festival",
            date: "June 15-17, 2024",
            time: "10:00 AM - 10:00 PM",
            location: "Central Park, Foodie City",
            description: "Experience the best summer delicacies from top chefs around the world.",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Masterclass: Italian Cuisine",
            date: "July 5, 2024",
            time: "2:00 PM - 6:00 PM",
            location: "Culinary Institute",
            description: "Learn the secrets of authentic Italian pasta making with Chef Mario.",
            image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "Vegan Food Expo",
            date: "August 20, 2024",
            time: "9:00 AM - 8:00 PM",
            location: "Convention Center",
            description: "Discover the latest trends in plant-based cooking and sustainable eating.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Culinary Events
                </h1>
                <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Join us for exclusive food festivals, cooking workshops, and gastronomic gatherings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-primary shadow-sm">
                                Upcoming
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                {event.title}
                            </h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm">
                                    <Calendar size={16} className="text-primary" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm">
                                    <Clock size={16} className="text-primary" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm">
                                    <MapPin size={16} className="text-primary" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-slate-300 text-sm mb-6 line-clamp-2">
                                {event.description}
                            </p>

                            <button className="w-full py-2.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
