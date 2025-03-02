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
>(({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
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

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
            data-oid="2zbvpa9"
        >
            <div
                ref={ref}
                onKeyDownCapture={handleKeyDown}
                className={cn('relative', className)}
                role="region"
                aria-roledescription="carousel"
                {...props}
                data-oid="3gvzcx4"
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
});
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { carouselRef, orientation } = useCarousel();

        return (
            <div ref={carouselRef} className="overflow-hidden" data-oid="okpqy8s">
                <div
                    ref={ref}
                    className={cn(
                        'flex',
                        orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                        className,
                    )}
                    {...props}
                    data-oid="q4i4tq."
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
                data-oid="-nt15--"
            />
        );
    },
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
        const { orientation, scrollPrev, canScrollPrev } = useCarousel();

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'absolute  h-8 w-8 rounded-full',
                    orientation === 'horizontal'
                        ? 'left-4 top-1/2 -translate-y-1/2'
                        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
                    className,
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
                {...props}
                data-oid="ywppiyd"
            >
                <ArrowLeft className="h-4 w-4" data-oid="e:.qb_m" />
                <span className="sr-only" data-oid="0axq7lb">
                    Previous slide
                </span>
            </Button>
        );
    },
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
        const { orientation, scrollNext, canScrollNext } = useCarousel();

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'absolute h-8 w-8 rounded-full',
                    orientation === 'horizontal'
                        ? 'right-4 top-1/2 -translate-y-1/2'
                        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
                    className,
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
                {...props}
                data-oid="c59kyu6"
            >
                <ArrowRight className="h-4 w-4" data-oid="y3_trt4" />
                <span className="sr-only" data-oid="o4o5_7x">
                    Next slide
                </span>
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
        <div className="flex justify-center gap-1 py-4" data-oid="kw:ef3m">
            {Array.from({ length: slides }).map((_, index) => (
                <button
                    key={index}
                    className={cn(
                        'h-2 w-2 rounded-full transition-colors duration-200',
                        selectedIndex === index ? 'bg-gray-900' : 'bg-gray-300',
                    )}
                    onClick={() => scrollTo(index)}
                    aria-label={`Scroll to slide ${index + 1}`}
                    data-oid="bxx6wk3"
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
