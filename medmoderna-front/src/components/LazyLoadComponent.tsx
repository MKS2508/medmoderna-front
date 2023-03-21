import React, { useEffect, useRef } from "react";

interface LazyLoadComponentProps {
    children: React.ReactNode;
    onVisible?: () => void;
}

const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({ children, onVisible }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onVisible?.();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [onVisible]);

    return <div ref={elementRef}>{children}</div>;
};

export default LazyLoadComponent;
