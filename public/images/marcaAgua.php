<?php

/*
$marcadeagua="agua.png";
$origen="FILMOTECA/00001.jpg";
$destino="nuevaimagen.jpg";
$destino_temporal=tempnam("/temp","tmp");

if($destino_temporal){
  echo("Destino fallido");
}else{
  echo("correcto");
}

marcadeagua($origen, $marcadeagua, $destino_temporal, 100);

// guardamos la imagen
$fp=fopen($destino,"w");
fputs($fp,fread(fopen($destino_temporal,"r"),filesize($destino_temporal)));
fclose($fp);

// mostramos la imagen
echo "<img src='nuevaimagen.jpg'>";

function marcadeagua($img_original, $img_marcadeagua, $img_nueva, $calidad)
{
  // obtener datos de la fotografia
  $info_original = getimagesize($img_original);
  $anchura_original = $info_original[0];
  $altura_original = $info_original[1];
  // obtener datos de la "marca de agua"
  $info_marcadeagua = getimagesize($img_marcadeagua);
  $anchura_marcadeagua = $info_marcadeagua[0];
  $altura_marcadeagua = $info_marcadeagua[1];
  // calcular la posición donde debe copiarse la "marca de agua" en la fotografia
  $horizmargen = ($anchura_original - $anchura_marcadeagua)/2;
  $vertmargen = ($altura_original - $altura_marcadeagua)/2;
  // crear imagen desde el original
  $original = ImageCreateFromJPEG($img_original);
  ImageAlphaBlending($original, true);
  // crear nueva imagen desde la marca de agua
  $marcadeagua = ImageCreateFromPNG($img_marcadeagua);
  // copiar la "marca de agua" en la fotografia
  ImageCopy($original, $marcadeagua, $horizmargen, $vertmargen, 0, 0, $anchura_marcadeagua, $altura_marcadeagua);
  // guardar la nueva imagen
  ImageJPEG($original, $img_nueva, $calidad);
  // cerrar las imágenes
  ImageDestroy($original);
  ImageDestroy($marcadeagua);
}





*/


// Cargar la estampa y la foto para aplicarle la marca de agua
$estampa = imagecreatefrompng('agua.png');
$im = imagecreatefromjpeg('00001.JPG');

// Establecer los márgenes para la estampa y obtener el alto/ancho de la imagen de la estampa
$margen_dcho = 10;
$margen_inf = 10;
$sx = imagesx($estampa);
$sy = imagesy($estampa);

// Copiar la imagen de la estampa sobre nuestra foto usando los índices de márgen y el
// ancho de la foto para calcular la posición de la estampa.
imagecopymerge($im, $estampa, imagesx($im) - $sx - $margen_dcho, imagesy($im) - $sy - $margen_inf, 0, 0, imagesx($estampa), imagesy($estampa),100);

// Imprimir y liberar memoria
//header('Content-type: image/png');
if( chmod("", 0777) ) {
    // more code
    echo("Yeahhh!");
}
imagepng($im, 'nuevaimagen.jpg');

imagedestroy($im);
echo('finalizado');


?>
