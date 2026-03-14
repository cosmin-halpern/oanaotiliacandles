import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { items, customer } = body;

  if (!items?.length) {
    return NextResponse.json({ error: "Coșul este gol" }, { status: 400 });
  }

  // Validate stock and build line items
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const candle = await prisma.candle.findUnique({ where: { id: item.candleId } });
    if (!candle || candle.stock < item.quantity) {
      return NextResponse.json(
        { error: `Stoc insuficient pentru ${item.name}` },
        { status: 400 }
      );
    }
    lineItems.push({
      price_data: {
        currency: "ron",
        product_data: {
          name: candle.name,
          images: candle.images.length ? [candle.images[0]] : [],
        },
        unit_amount: Math.round(candle.price * 100),
      },
      quantity: item.quantity,
    });
  }

  // Shipping
  const subtotal = items.reduce((s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity, 0);
  if (subtotal < 200) {
    lineItems.push({
      price_data: {
        currency: "ron",
        product_data: { name: "Livrare" },
        unit_amount: 2000,
      },
      quantity: 1,
    });
  }

  // Create pending order
  const orderNumber = generateOrderNumber();
  const total = subtotal < 200 ? subtotal + 20 : subtotal;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      total,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone || null,
      shippingAddress: customer.address,
      shippingCity: customer.city,
      shippingCounty: customer.county || null,
      shippingZip: customer.zip,
      items: {
        create: items.map((i: { candleId: string; price: number; quantity: number }) => ({
          candleId: i.candleId,
          price: i.price,
          quantity: i.quantity,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: customer.email,
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXTAUTH_URL}/order-success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    payment_method_types: ["card"],
    locale: "ro",
  });

  return NextResponse.json({ url: session.url });
}