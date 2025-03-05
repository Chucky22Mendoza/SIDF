import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex gap-10 py-10 px-20">
      <Image src="/images/cultura_colima.png" width={200} height={98} className="object-contain" alt="" />
      <div className="flex flex-col items-center justify-center">
        <Image src="/images/secretaria_de_cultura.jpg" width={200} height={107} className="object-contain" alt="" />
        <Link href="/login" className="btn btn-log text-black" style={{ textDecorationLine: 'underline' }} target="_blank">Administración Fototeca</Link>
      </div>
      <div className="text-gray-500">
        <div className="text-left">Juárez y Díaz Mirón s/n Colima,</div>
        <div className="text-left mb-2">MX CP 28000. Colonia Centro</div>

        <div className="text-left mb-2">(312) 313 9993</div>

        <div className="text-left mb-2">fototecadeahec@gmail.com</div>

        <div className="text-left" style={{ fontStyle: "italic" }}>© 2018 Secretaría de Cultura</div>
        <div className="text-left" style={{ fontStyle: "italic" }}>Gobierno del Estado de Colima</div>
      </div>
    </footer>
  );
}
