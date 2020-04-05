const renderImage = (buffer, type) => {

  const binary = Buffer.from(buffer).toString('base64'); // Convert Buffer data to Binary
  const base64Flag = `data:${type};base64,`; // Set to the right format: data:[data-type];base64,[binary]
  return base64Flag + binary

}

const imagePlaceholder = "https://mweb-cdn.karousell.com/build/select-photo-a2ee9a0f15cf6a64ff3119c599e31a8d.svg";


export {renderImage, imagePlaceholder};
