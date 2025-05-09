import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from './button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
    positionArrows?: 'above' | 'side';
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }

    return context;
}

const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = 'horizontal',
            opts,
            setApi,
            plugins,
            className,
            children,
            positionArrows = 'side',
            ...props
        },
        ref,
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === 'horizontal' ? 'x' : 'y',
            },
            plugins,
        );
        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) {
                return;
            }

            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext],
        );

        React.useEffect(() => {
            if (!api || !setApi) {
                return;
            }

            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) {
                return;
            }

            onSelect(api);
            api.on('reInit', onSelect);
            api.on('select', onSelect);

            return () => {
                api?.off('select', onSelect);
            };
        }, [api, onSelect]);

        const renderArrows = () => (
            <div
                className={`flex ${positionArrows === 'above' ? 'justify-end gap-2 mb-2 mr-6' : 'absolute'}`}
            >
                <CarouselPrevious />
                <CarouselNext />
            </div>
        );

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api,
                    opts,
                    orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    positionArrows,
                }}
            >
                {positionArrows === 'above' && renderArrows()}
                <div
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={cn('relative', className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    },
);

Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { carouselRef, orientation } = useCarousel();

        return (
            <div ref={carouselRef} className="overflow-hidden">
                <div
                    ref={ref}
                    className={cn(
                        'flex',
                        orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                        className,
                    )}
                    {...props}
                />
            </div>
        );
    },
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { orientation } = useCarousel();

        return (
            <div
                ref={ref}
                role="group"
                aria-roledescription="slide"
                className={cn(
                    'min-w-0 shrink-0 grow-0 basis-full',
                    orientation === 'horizontal' ? 'pl-4' : 'pt-4',
                    className,
                )}
                {...props}
            />
        );
    },
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
        const { orientation, scrollPrev, canScrollPrev, positionArrows } = useCarousel();

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'h-8 w-8 rounded-full',
                    positionArrows === 'side' &&
                        (orientation === 'horizontal'
                            ? 'absolute left-6 top-1/2 -translate-y-1/2'
                            : '-top-12 left-1/2 -translate-x-1/2 rotate-90'),
                    className,
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
                {...props}
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
            </Button>
        );
    },
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
        const { orientation, scrollNext, canScrollNext, positionArrows } = useCarousel();

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'h-8 w-8 rounded-full',
                    positionArrows === 'side' &&
                        (orientation === 'horizontal'
                            ? 'absolute right-6 top-1/2 -translate-y-1/2'
                            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90'),
                    className,
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
                {...props}
            >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
            </Button>
        );
    },
);
CarouselNext.displayName = 'CarouselNext';

const CarouselDots = () => {
    const { api } = useCarousel();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [slides, setSlides] = React.useState(0);

    const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

    React.useEffect(() => {
        if (!api) return;

        setSelectedIndex(api.selectedScrollSnap());
        setSlides(api.scrollSnapList().length);
        api.on('select', () => {
            setSelectedIndex(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="flex justify-center gap-1 py-4">
            {Array.from({ length: slides }).map((_, index) => (
                <button
                    key={index}
                    className={cn(
                        'h-2 w-2 rounded-full transition-colors duration-200',
                        selectedIndex === index ? 'bg-gray-900' : 'bg-gray-300',
                    )}
                    onClick={() => scrollTo(index)}
                    aria-label={`Scroll to slide ${index + 1}`}
                />
            ))}
        </div>
    );
};

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselDots,
};
