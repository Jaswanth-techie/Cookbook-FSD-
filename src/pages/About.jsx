import React from 'react';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';

import team1 from '../assets/team/team-1.jpg';
import team2 from '../assets/team/team-2.jpg';
import team3 from '../assets/team/team-3.jpg';
import team4 from '../assets/team/team-4.jpg';

const people = [
    {
        id: 1,
        name: "Jaswanth",
        designation: "Lead Developer",
        image: team1,
        objectPosition: 'object-top',
    },
    {
        id: 2,
        name: "Seshasai",
        designation: "Backend Architect",
        image: team2,
    },
    {
        id: 3,
        name: "Losish",
        designation: "UI/UX Designer",
        image: team3,
    },
    {
        id: 4,
        name: "Karthik",
        designation: "Product Manager",
        image: team4,
    },
];

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-surface border border-black/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-textMain mb-8 text-center">About CookBook</h1>

                <div className="space-y-6 text-lg text-textMain leading-relaxed">
                    <p>
                        Welcome to <span className="text-primary font-bold">CookBook</span>, your ultimate companion for culinary adventures.
                        We believe that cooking should be an enjoyable, creative, and accessible experience for everyone.
                    </p>

                    <div className="py-8">
                        <h3 className="text-2xl font-bold text-textMain mb-8 text-center">Meet the Team</h3>
                        <div className="flex flex-row items-center justify-center w-full mb-4">
                            <AnimatedTooltip items={people} />
                        </div>
                    </div>

                    <p>
                        Our mission is to provide a beautifully designed, easy-to-use platform where food lovers can discover new recipes,
                        organize their favorites, and share their own culinary creations with the world.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 py-8">
                        <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-black/5 text-center">
                            <div className="text-3xl mb-2">🍳</div>
                            <h3 className="text-textMain font-bold mb-2">Discover</h3>
                            <p className="text-sm text-textMuted">Explore a vast collection of mouth-watering recipes from around the globe.</p>
                        </div>
                        <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-black/5 text-center">
                            <div className="text-3xl mb-2">❤️</div>
                            <h3 className="text-textMain font-bold mb-2">Save</h3>
                            <p className="text-sm text-textMuted">Keep your favorite recipes organized and accessible at any time.</p>
                        </div>
                        <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-black/5 text-center">
                            <div className="text-3xl mb-2">✨</div>
                            <h3 className="text-textMain font-bold mb-2">Create</h3>
                            <p className="text-sm text-textMuted">Share your own masterpieces and inspire others in the community.</p>
                        </div>
                    </div>

                    <p>
                        Whether you're a seasoned chef or just starting your journey in the kitchen, CookBook is here to inspire you.
                        Happy cooking!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
