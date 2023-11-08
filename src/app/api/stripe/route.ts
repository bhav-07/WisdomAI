import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const settingsUrl = process.env.NEXTAUTH_URL + '/settings';

export async function GET() {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // const userSubscription = await prisma.userSubscription.findUnique({
        //     where: {
        //         userId: session.user.id
        //     }
        // })
        // // If the user has a subscription, create a Stripe portal session
        // if (userSubscription && userSubscription.stripeCustomerId) {
        //     const stripeSession = await stripe.billingPortal.sessions.create({
        //         customer: userSubscription.stripeCustomerId,
        //         return_url: settingsUrl
        //     })
        //     return NextResponse.json({ url: stripeSession.url })
        // }

        // If the user does not have a subscription, redirect to the settings page
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: session.user.email ?? '',
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: 'WisdomAI Pro Subscription',
                            description: 'Unlimited course generation and more!'
                        },
                        unit_amount: 1000,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: session.user.id
            },
        });
        return NextResponse.json({ url: stripeSession.url })
    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}