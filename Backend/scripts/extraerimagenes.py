import fitz  # PyMuPDF
import os

# Ruta del archivo PDF
pdf_path = "CONTROL INTERNO DE BC pag 21 a 30.pdf"
output_folder = "imagenes_extraidas2"

# Crear carpeta de salida si no existe
os.makedirs(output_folder, exist_ok=True)

# Abrir el PDF
doc = fitz.open(pdf_path)

# Recorrer cada página
for page_index in range(len(doc)):
    page = doc[page_index]
    images = page.get_images(full=True)

    # Extraer cada imagen
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"pagina{page_index+1}_img{img_index+1}.{image_ext}"

        # Guardar imagen
        with open(os.path.join(output_folder, image_filename), "wb") as f:
            f.write(image_bytes)

print("Extracción completa.")
