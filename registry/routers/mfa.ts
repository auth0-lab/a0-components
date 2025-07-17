import { ManagementClient } from "auth0";
import { NextRequest, NextResponse } from "next/server";

import { checkSession } from "./helpers/check-session";
/**
 * Make sure to install the withRateLimit from:
 *   - https://components.lab.auth0.com/docs/rate-limit#helpers
 */
import { withRateLimit } from "./helpers/rate-limit";

/**
 * This forces NextJS to build this route as a dynamic route.
 * This is required for the purpose of documentation but is likely not necessary in your own app.
 */
export const dynamic = "force-dynamic";

const client = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_DOMAIN ?? process.env.AUTH0_DOMAIN,
  clientId:
    process.env.AUTH0_MANAGEMENT_CLIENT_ID ?? process.env.AUTH0_CLIENT_ID,
  clientSecret:
    process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ??
    process.env.AUTH0_CLIENT_SECRET,
});

/**
 * @example export const GET = handleMFAFactorsList();
 */
export const handleMFAFactorsList = withRateLimit(
  async (_: NextRequest): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const availableFactors = [
        "push-notification",
        "sms",
        "voice",
        "otp",
        "webauthn-roaming",
        "webauthn-platform",
      ];
      const { data: factors } = await client.guardian.getFactors();
      const response = await client.users.getAuthenticationMethods({
        id: user_id,
      });
      const { data: enrollments } = response;

      return NextResponse.json(
        factors
          .filter((factor: any) => {
            let factorName: string = factor.name;

            return availableFactors.includes(factorName) && factor.enabled;
          })
          .map((factor: any) => {
            const enrollmentInfo = enrollments.find((enrollment: any) => {
              let factorName: string = factor.name;

              if (factor.name === "sms" || factor.name === "voice") {
                factorName = "phone";
              }

              return enrollment.type.includes(factorName);
            });

            return {
              ...factor,
              enrollmentId: enrollmentInfo?.id,
            };
          }),
        {
          status: response.status,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching MFA Enrollments" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const POST = handleMFAFactorEnrollment();
 */
export const handleMFAFactorEnrollment = withRateLimit(
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const { factor }: { factor: string } = await request.json();
      let factorName: string = factor;

      if (factor === "sms" || factor === "voice") {
        factorName = "phone";
      }

      const response = await client.guardian.createEnrollmentTicket({
        user_id,
        //@ts-ignore
        factor: factorName,
        allow_multiple_enrollments: true,
      });
      const { data } = response;

      return NextResponse.json(data, {
        status: response.status,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error creating MFA Enrollment" },
        { status: 500 }
      );
    }
  }
);

/**
 * @example export const DELETE = handleMFADeleteEnrollment();
 */
export const handleMFADeleteEnrollment = withRateLimit(
  async (
    _: Request,
    { params }: { params: { enrollmentId: string } }
  ): Promise<NextResponse> => {
    try {
      const { sub: user_id } = await checkSession();

      const { enrollmentId } = params;

      await client.users.deleteAuthenticationMethod({
        id: user_id,
        authentication_method_id: enrollmentId,
      });

      return NextResponse.json(
        { id: enrollmentId },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error deleting MFA Enrollment" },
        { status: 500 }
      );
    }
  }
);
