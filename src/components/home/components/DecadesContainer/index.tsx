import { useMemo, useState } from "react";
import { IImagesDecades } from "../../domain/Images";
import styles from './DecadesContainer.module.css';
import { useRouter } from "next/navigation";
import { Card } from "./Card";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: IImagesDecades[];
  isOpen: boolean;
  onClose: () => void;
};

export function DecadesContainer({ images, isOpen, onClose }: Props) {
  const [currentImage, setCurrentImage] = useState<IImagesDecades>(images[0]);
  const [className, setClassName] = useState<string>(styles['new-img']);
  const router = useRouter();

  const imagesCarousel = useMemo(() =>
    images
      .filter((image) => image.index !== currentImage.index)
      .sort((a, b) => a.index - b.index)
  , [images, currentImage]);

  const onClickLeft = () => {
    if (currentImage.index > 0) {
      setCurrentImage(images[currentImage.index - 1]);
      setClassName('');
      setTimeout(() => setClassName(styles['new-img']), 0);
    }
  };

  const onClickRight = () => {
    if (currentImage.index < images.length - 1) {
      setCurrentImage(images[currentImage.index + 1]);
      setClassName('');
      setTimeout(() => setClassName(styles['new-img']), 0);
    }
  };

  return (
    <main
      className={styles.container}
      style={{
        opacity: isOpen ? '1' : '0',
        zIndex: isOpen ? '1000' : '-1',
      }}
    >
      <img className={className} src={currentImage.path} alt={`Decada de ${currentImage.decade}`} loading="lazy" />
      <div className="flex gap-5 self-stretch items-end p-10 flex-1">
        <div className={`max-w-md ${styles.glass}`}>
          <h1 className="text-white text-4xl font-extrabold">{`Decada de ${currentImage.decade}`}</h1>
          <p className="text-white text-lg">{currentImage.description}</p>
          <div className="flex gap-3">
            <button className="bg-slate-900 text-white py-2 px-4 rounded-xl font-bold cursor-pointer" onClick={() => router.push(currentImage.url)}>Ver más...</button>
            <button className="text-red-600 py-2 px-4 rounded-xl font-bold bg-white cursor-pointer" onClick={onClose}>Regresar</button>
          </div>
        </div>
        <div className={styles.carousel}>
          <div className={styles.gallery}>
            {
              imagesCarousel.map((image) => (
                <Card
                  key={`card-${image.decade}`}
                  path={image.path}
                  decade={image.decade}
                  onClick={() => {
                    setCurrentImage(image);
                    setClassName('');
                    setTimeout(() => setClassName(styles['new-img']), 0);
                  }}
                />
              ))
            }
          </div>
          <div className="flex gap-2">
            <button className="bg-white rounded-full p-2 disabled:bg-slate-300" onClick={onClickLeft} disabled={currentImage.index === 0}>
              <ArrowLeft />
            </button>
            <button className="bg-white rounded-full p-2 disabled:bg-slate-300" onClick={onClickRight} disabled={currentImage.index === images.length - 1}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}