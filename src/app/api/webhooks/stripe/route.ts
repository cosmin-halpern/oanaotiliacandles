import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation, sendNewOrderNotification } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Mark order as paid
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paymentId: session.payment_intent as string,
          paymentProvider: "stripe",
        },
        include: { items: true },
      });

      // Decrement stock
      for (const item of order.items) {
        await prisma.candle.update({
          where: { id: item.candleId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Send emails (non-blocking)
      const fullOrder = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { candle: true } } },
      });
      if (fullOrder) {
        await Promise.allSettled([
          sendOrderConfirmation(fullOrder),
          sendNewOrderNotification(fullOrder),
        ]);
      }
    }
  }

  return NextResponse.json({ received: true });
}