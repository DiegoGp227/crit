"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PHOTOS = [
    { src: "/photos/DSC06094.jpg", alt: "Carrera CritVirgilium" },
    { src: "/photos/DSC06198.jpg", alt: "Carrera CritVirgilium" },
    { src: "/photos/DSC06457.jpg", alt: "Carrera CritVirgilium" },
    { src: "/photos/DSC06577.jpg", alt: "Carrera CritVirgilium" },
];

const INTERVAL_MS = 5000;

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % PHOTOS.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-0">
            {PHOTOS.map((photo, index) => (
                <div
                    key={photo.src}
                    className={
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out " +
                        (index === current ? "opacity-100" : "opacity-0")
                    }
                >
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
}