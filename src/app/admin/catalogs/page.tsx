'use client';

import dynamic from "next/dynamic";

const CatalogList = dynamic(() => import('@/components/catalogs/catalog-list'));

export default function CatalogsPage() {
  return <CatalogList />;
}