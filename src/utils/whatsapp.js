const defaultNumber = '918384821028';

export function buildWhatsAppMessage({ productName, quantity, address = '' }) {
  return `Hello HimShakti,

I want to order:

Product: ${productName}
Quantity: ${quantity}
Address: ${address}

Please share the next steps.`;
}

export function buildWhatsAppLink(orderDetails, phoneNumber = defaultNumber) {
  const message = buildWhatsAppMessage(orderDetails);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
