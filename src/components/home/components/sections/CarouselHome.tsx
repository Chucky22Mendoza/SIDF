import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { IImagesCarousel } from "../../domain/Images";

type Props = {
  images: IImagesCarousel[];
  orientation: 'left' | 'right';
};

export function CarouselHome({ images, orientation }: Props) {
  if (images.length === 1) {
    return (
      <div
        className="max-w-[594px]"
        style={{
          float: orientation,
          margin: `0 ${orientation === 'right' ? '20px' : '0'} 0 ${orientation === 'left' ? '20px' : '0'}`
        }}
      >
        <figure>
          <Image className="block w-full" src={images[0].path} alt={images[0].title} width={594} height={581} style={{ objectFit: 'cover' }} loading="lazy" />
          <figcaption className="text-center mt-2">
            <h5>{images[0].title}</h5>
            <p>{images[0].author}</p>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <Carousel
      className="max-w-[594px]"
      style={{
        float: orientation,
        margin: `0 ${orientation === 'right' ? '0' : '20px'} 0 ${orientation === 'left' ? '0' : '20px'}`
      }}
    >
      <CarouselContent>
        {
          images.map(({ path, title, author }, index) => (
            <CarouselItem key={`${title}-${index}`}>
              <figure>
                <Image className="block w-full" src={path} alt={title} width={594} height={581} style={{ objectFit: 'cover' }} loading="lazy" />
                <figcaption className="text-center mt-2">
                  <h5>{title}</h5>
                  <p>{author}</p>
                </figcaption>
              </figure>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className="absolute left-3 top-1/2 bg-white text-3xl" />
      <CarouselNext className="absolute right-3 top-1/2 bg-white text-3xl" />
    </Carousel>
  );
}
