'use client';

import { Card, CardHeader } from "@/components/ui/card";
import { GeneralTab } from "./tabs/general-tab";
import { DescriptionTab } from "./tabs/description-tab";
import { CharacteristicsTab } from "./tabs/characteristics-tab";
import { AccessibilityTab } from "./tabs/accessibility-tab";
import StepsBar from "../ui/StepsBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFilmeStore } from "@/store/FilmeStore";
import { validateAccesibilityTab, validateCharacteristicsTab, validateDescriptionTab, validateGeneralTab } from "@/validate/film";
import { toast } from "sonner";
import { useFilms } from "@/hooks/useFilms";
import { IFilm } from "@/domain/Filme";

export function FilmForm() {
  const [step, setStep] = useState(0);
  const { push } = useRouter();
  const { performPost, performPut } = useFilms();
  const [isLoading, setIsLoading] = useState(false);
  const general = useFilmeStore((state) => state.general);
  const description = useFilmeStore((state) => state.description);
  const characteristics = useFilmeStore((state) => state.characteristics);
  const accesibility = useFilmeStore((state) => state.accesibility);
  const filmeId = useFilmeStore((state) => state.filmeId);
  const onNextGeneralHandler = (value: number) => {
    if (!validateGeneralTab(general)) {
      toast.error('Por favor, llena todos los campos con *');
      return;
    }
    setStep(value);
  };

  const onNextDescriptionHandler = (value: number) => {
    if (!validateDescriptionTab(description)) {
      toast.error('Por favor, llena todos los campos con *');
      return;
    }
    setStep(value);
  };

  const onNextCharacteristicsHandler = (value: number) => {
    if (!validateCharacteristicsTab(characteristics)) {
      toast.error('Por favor, llena todos los campos con *');
      return;
    }
    setStep(value);
  };

  const onNextAccesibilityHandler = async () => {
    setIsLoading(true);
    if (!validateAccesibilityTab(accesibility)) {
      toast.error('Por favor, llena todos los campos con *');
      return;
    }

    toast.loading(filmeId ? 'Editando registro de filme...' : 'Creando registro de filme...')

    const data: IFilm = {
      general,
      description,
      characteristics,
      accesibility,
    };

    const { message, success } = filmeId ? await performPut(filmeId, data) : await performPost(data);
    toast.dismiss();

    if (success) {
      toast.success(message);
      setIsLoading(false);
      push('/admin/records');
      return;
    }
    setIsLoading(false);
    toast.error(message);
  };

  return (
    <Card className="flex-1 self-stretch">
      <CardHeader>
        <StepsBar
          steps={[
            {
              label: 'General',
              content: <GeneralTab />,
              onClickNext: onNextGeneralHandler,
              onClickPrev: (value: number) => {
                if (value === -1) {
                  push('/admin/records');
                  return;
                }
              },
            },
            {
              label: 'Descripción',
              content: <DescriptionTab />,
              onClickNext: onNextDescriptionHandler,
              onClickPrev: setStep,
            },
            {
              label: 'Características',
              content: <CharacteristicsTab />,
              onClickNext: onNextCharacteristicsHandler,
              onClickPrev: setStep,
            },
            {
              label: 'Accesibilidad',
              content: <AccessibilityTab />,
              onClickNext: isLoading ? undefined : onNextAccesibilityHandler,
              onClickPrev: setStep,
            }
          ]}
          title="Pasos para Crear Registro"
          prevLabel={step === 0 ? 'Regresar' : 'Atrás'}
          nextLabel={step === 3 ? 'Finalizar' : 'Continuar'}
          step={step}
        />
      </CardHeader>
    </Card>
  );
}
