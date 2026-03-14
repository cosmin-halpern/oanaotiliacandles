import { Resend } from "resend";
import type { OrderWithItems } from "@/types";
import { formatPrice } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Oana Otilia Candles <comenzi@oanaotiliacandles.ro>";

export async function sendOrderConfirmation(order: OrderWithItems) {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #F2EDE4;color:#2C1810;">${item.candle.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F2EDE4;text-align:center;color:#8B7355;">x${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #F2EDE4;text-align:right;color:#2C1810;font-weight:600;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #F2EDE4;">
    <!-- Header -->
    <div style="background:#2C1810;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#FAF7F2;font-size:24px;letter-spacing:1px;">Oana Otilia Candles</h1>
      <p style="margin:8px 0 0;color:#C17D3C;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Confirmare comandă</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="color:#2C1810;font-size:16px;margin:0 0 8px;">Bună, <strong>${order.customerName}</strong>! 🕯️</p>
      <p style="color:#8B7355;font-size:14px;margin:0 0 24px;">Mulțumim pentru comandă! Am primit-o și o pregătim cu dragoste.</p>

      <div style="background:#FAF7F2;border-radius:12px;padding:16px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:12px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;">Număr comandă</p>
        <p style="margin:0;font-size:18px;font-weight:700;color:#C17D3C;">${order.orderNumber}</p>
      </div>

      <!-- Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr>
            <th style="text-align:left;font-size:11px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #F2EDE4;">Produs</th>
            <th style="text-align:center;font-size:11px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #F2EDE4;">Cant.</th>
            <th style="text-align:right;font-size:11px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #F2EDE4;">Preț</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div style="text-align:right;padding:12px 0;border-top:2px solid #2C1810;">
        <span style="font-size:16px;font-weight:700;color:#2C1810;">Total: ${formatPrice(order.total)}</span>
      </div>

      <!-- Shipping -->
      <div style="margin-top:24px;padding:16px;border:1px solid #F2EDE4;border-radius:12px;">
        <p style="margin:0 0 8px;font-size:12px;color:#8B7355;text-transform:uppercase;letter-spacing:1px;">Adresă de livrare</p>
        <p style="margin:0;color:#2C1810;font-size:14px;line-height:1.6;">
          ${order.customerName}<br>
          ${order.shippingAddress}<br>
          ${order.shippingCity}${order.shippingCounty ? `, ${order.shippingCounty}` : ""}, ${order.shippingZip}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#FAF7F2;padding:24px 32px;text-align:center;border-top:1px solid #F2EDE4;">
      <p style="margin:0;font-size:12px;color:#8B7355;">Ai întrebări? Scrie-ne la <a href="mailto:contact@oanaotiliacandles.ro" style="color:#C17D3C;">contact@oanaotiliacandles.ro</a></p>
      <p style="margin:8px 0 0;font-size:11px;color:#8B7355;opacity:0.7;">© ${new Date().getFullYear()} Oana Otilia Candles</p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: order.customerEmail,
    subject: `Confirmare comandă ${order.orderNumber} — Oana Otilia Candles`,
    html,
  });
}

export async function sendNewOrderNotification(order: OrderWithItems) {
  await resend.emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL!,
    subject: `🕯️ Comandă nouă: ${order.orderNumber} — ${formatPrice(order.total)}`,
    html: `
      <p>Comandă nouă primită!</p>
      <ul>
        <li><strong>Nr:</strong> ${order.orderNumber}</li>
        <li><strong>Client:</strong> ${order.customerName} (${order.customerEmail})</li>
        <li><strong>Total:</strong> ${formatPrice(order.total)}</li>
        <li><strong>Produse:</strong> ${order.items.length}</li>
      </ul>
      <p><a href="${process.env.NEXTAUTH_URL}/admin/orders">Vezi comenzile →</a></p>
    `,
  });
}